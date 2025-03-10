import cors from "cors";
import express from "express";
import { prismaClient } from "db/client";
import axios from "axios";
import { systemPrompt } from "./systemPrompt";
import { ArtifactProcessor } from "./parser";
import { onFileUpdate, onPromptEnd, onPromptStart, onShellCommand } from "./os";

// Load environment variables from .env file
import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Set up the Gemini API URL
const GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent";

// Use the GEMINI_API_KEY from the environment variables
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

if (!GEMINI_API_KEY) {
  throw new Error("API key not found. Please set the GEMINI_API_KEY environment variable.");
}

app.post("/prompt", async (req, res) => {
  const { prompt, projectId } = req.body;

  const project = await prismaClient.project.findUnique({
    where: {
      id: projectId,
    },
  });

  if (!project) {
    res.status(404).json({ error: "Project not found" });
    return;
  }

  const promptDb = await prismaClient.prompt.create({
    data: {
      content: prompt,
      projectId,
      type: "USER",
    },
  });

  const allPrompts = await prismaClient.prompt.findMany({
    where: {
      projectId,
    },
    orderBy: {
      createdAt: "asc",
    },
  });

  let artifactProcessor = new ArtifactProcessor("", (filePath, fileContent) => onFileUpdate(filePath, fileContent, projectId, promptDb.id, project.type), (shellCommand) => onShellCommand(shellCommand, projectId, promptDb.id));
  let artifact = "";

  onPromptStart(promptDb.id);

  try {
    // Make the POST request to the Gemini API
    const response = await axios.post(
      `${GEMINI_API_URL}?key=${GEMINI_API_KEY}`,
      {
        contents: [
          {
            parts: [
              {
                text: prompt, // Using the user's prompt directly
              },
            ],
          },
        ],
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    // Assuming Gemini API returns the result in a field named 'generatedText'
    const geminiResponseText = response.data.generatedContent[0].parts[0].text;
    
    artifactProcessor.append(geminiResponseText);
    artifactProcessor.parse();
    artifact += geminiResponseText;

    await prismaClient.prompt.create({
      data: {
        content: artifact,
        projectId,
        type: "SYSTEM",
      },
    });

    await prismaClient.action.create({
      data: {
        content: "Done!",
        projectId,
        promptId: promptDb.id,
      },
    });
    onPromptEnd(promptDb.id);

    res.json({ response: geminiResponseText });
  } catch (error) {
    console.error("Gemini API error:", error);
    res.status(500).json({ error: "Failed to communicate with Gemini API" });
  }
});

app.listen(9091, () => {
  console.log("Server is running on port 9091");
});
