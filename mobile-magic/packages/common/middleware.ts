import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

const JWT_PUBLIC_KEY = process.env.JWT_PUBLIC_KEY ?? `-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAvanf6m76yK7WzoOwWncL
7AULDcKWD4y+/IfShGCjJAbNBbaoSRaYS0zzciU7Cr/fWHZsvTBheRQpK3a0fYjo
9TIhr5o0dSIqm4Kd4jS4DoDDDmZbk7cMfbz7+7XN5GxXyvj6+7dKYCOl++bIDDIp
4crJmzYIXK20xAF/mgVZKGLWXWgRTZYL9kVecv2pzzaRo0yaHoSyqKEcK1xC6MEO
rUCjbxPZkiiX37UEUM5V3X+2T2gC1MxyckbVsFIjcqxYw2166QCHE7XTwv9w27AQ
9irq/9EsB5Qn38ZEQWwWnu5Y5TXiUbmExk+4qO+u2sSPBV/C9vJCkOa1I4kq+3nY
sQIDAQAB
-----END PUBLIC KEY-----`;

export function authMiddleware(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization; // Bearer token
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }

  const decoded = jwt.verify(token, JWT_PUBLIC_KEY!, {
    algorithms: ["RS256"],
  });

  if (!decoded) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }

  const userId = (decoded as any).sub;

  if (!userId) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }

  req.userId = userId;
  next();
}
