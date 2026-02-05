import { Router, type Request, type Response } from "express";
import jwt from "jsonwebtoken";
import prisma from "../lib/prisma";

const router = Router();

router.post("/login", async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    console.log("🔐 Login attempt:", email);

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user || user.password !== password) {
      console.log("❌ Invalid credentials");
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        role: user.role,
        companyId: user.companyId,
      },
      process.env.TOKEN_SECRET!,
      { expiresIn: "6h" }
    );

    console.log("✅ Token generated:", token.substring(0, 20) + "...");

    res.json({ token }); 
  } catch (error: any) {
    console.error("❌ Login error:", error.message);
    res.status(500).json({ message: error.message });
  }
});

router.post("/signup", async (req: Request, res: Response) => {
  try {
    const { email, password, role = "MEMBER" } = req.body;

    console.log("📝 Signup attempt:", email);

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const company = await prisma.company.create({
      data: { name: `Company of ${email}` },
    });

    const user = await prisma.user.create({
      data: {
        email,
        password, 
        role,
        companyId: company.id,
      },
    });

    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        role: user.role,
        companyId: user.companyId,
      },
      process.env.TOKEN_SECRET!,
      { expiresIn: "6h" }
    );

    console.log("✅ User created and token generated");

    res.status(201).json({ token });
  } catch (error: any) {
    console.error("❌ Signup error:", error.message);
    res.status(500).json({ message: error.message });
  }
});

export default router;
