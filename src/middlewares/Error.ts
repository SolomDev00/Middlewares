import { Request, Response, NextFunction } from "express";

export default class ErrorMiddleware {
  static handle(err: Error, req: Request, res: Response, next: NextFunction) {
    if (req.originalUrl.startsWith("/api")) {
      res.status(500).json({
        error: "Internal Server Error",
        message: err.message,
        stack: process.env.NODE_ENV === "development" ? err.stack : null,
      });
      return;
    }

    res.status(500).render("error", {
      pageTitle: "Something error.",
      message: "500, Error Server Down.",
      error: err.message,
    });

    next();
  }
}
