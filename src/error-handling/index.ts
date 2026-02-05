import { Application, Request, Response, NextFunction } from "express";

export default (app: Application) => {
  app.use((req: Request, res: Response) => {
    res.status(404).json({ message: "This route does not exist" });
  });

  app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    console.error("ERROR", req.method, req.path, err);

    if (!res.headersSent) {
      res.status(err.status || 500).json({
        message: err.message || "Internal server error",
      });
    }
  });
};