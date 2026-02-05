import { Router, type Request, type Response } from "express";
import prisma from "../lib/prisma";

const router = Router();

router.get("/", async (req: Request, res: Response) => {
  console.log("\n=== GET /customers ===");
  console.log("req.auth:", req.auth);

  try {
    if (!req.auth) {
      console.log("❌ No auth object");
      return res.status(401).json({ message: "Not authenticated" });
    }

    const { companyId } = req.auth;

    if (!companyId) {
      console.log("❌ No companyId in token");
      return res.status(401).json({ message: "No companyId in token" });
    }

    const customers = await prisma.customer.findMany({
      where: { companyId },
      include: { subscription: true },
    });

    console.log("✅ Customers found:", customers.length);
    res.json(customers);
  } catch (error: any) {
    console.error("❌ ERROR:", error.message);
    res.status(500).json({ message: error.message });
  }
});

router.post("/", async (req: Request, res: Response) => {
  try {
    const { name, email, companyName, phone } = req.body;
    const companyId = req.auth!.companyId;

    const customer = await prisma.customer.create({
      data: { name, email, companyName, phone, companyId },
    });

    res.status(201).json(customer);
  } catch (error: any) {
    console.error("❌ Create customer error:", error);
    res.status(500).json({ message: error.message });
  }
});

router.delete("/:id", async (req: Request, res: Response) => {
  try {
    const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
    const companyId = req.auth!.companyId;

    const customer = await prisma.customer.findFirst({
      where: { id, companyId },
    });

    if (!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }

    await prisma.customer.delete({ where: { id } });
    res.json({ message: "Customer deleted" });
  } catch (error: any) {
    console.error("❌ Delete customer error:", error);
    res.status(500).json({ message: error.message });
  }
});

export default router;
