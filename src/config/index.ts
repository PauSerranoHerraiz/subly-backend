import express, { Application } from "express";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";

const ORIGIN = process.env.ORIGIN || "http://localhost:3000";

export default (app: Application) => {
  app.use(
    cors({
      credentials: true,
      origin: ORIGIN,
    })
  );

  app.use(morgan("dev"));
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(cookieParser());
};