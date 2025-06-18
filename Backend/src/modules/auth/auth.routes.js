import { Router } from "express";
export const authRoutes = Router();

authRoutes.get("/", (req, res) => {
  res.status(200).json({
    message: "Welcome to the Auth API",
    status: "success",
  });
});