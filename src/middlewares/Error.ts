import { Request, Response, NextFunction } from "express";

export default class ErrorMiddleware {
  static handle(err: Error, req: Request, res: Response, next: NextFunction) {
    if (req.originalUrl.startsWith("/api")) {
      res.status(500).json({
        error: "Interal Server Error",
        message: err.message,
        stack: process.env.NODE_ENV === "development" ? err.stack : null,
      });
    }
    next();
  }
}
