import { Router, type Request, type Response } from "express";
import prisma from "../lib/prisma";

const router = Router();

console.log("🔥 subscriptions.routes.ts loaded!");

router.post("/", async (req: Request, res: Response) => {
  console.log("\n=== POST /subscriptions START ===");
  console.log("Body:", req.body);
  console.log("Auth:", req.auth);

  try {
    const { customerId, planId } = req.body;
    const companyId = req.auth!.companyId;

    console.log("Looking for customer:", customerId);
    console.log("In company:", companyId);

    const customer = await prisma.customer.findFirst({
      where: { id: customerId, companyId },
    });

    console.log("Customer found?", customer ? "✅ YES" : "❌ NO");

    if (!customer) {
      console.log("❌ Returning 404");
      return res.status(404).json({ message: "Customer not found" });
    }

    const plan = await prisma.plan.findUnique({
      where: { id: planId },
    });

    if (!plan) {
      return res.status(404).json({ message: "Plan not found" });
    }

    const subscription = await prisma.subscription.create({
      data: {
        customerId,
        planId,
        status: "ACTIVE",
        startedAt: new Date(), 
      },
      include: {
        customer: true,
        plan: true,
      },
    });

    console.log("✅ Subscription created:", subscription.id);
    res.status(201).json(subscription);
  } catch (error: any) {
    console.error("❌ Error:", error.message);
    res.status(500).json({ message: error.message });
  }
});

router.get("/", async (req: Request, res: Response) => {
  try {
    const companyId = req.auth!.companyId;
    const subscriptions = await prisma.subscription.findMany({
      where: { customer: { companyId } },
      include: { customer: true, plan: true },
    });
    res.json(subscriptions);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

router.patch("/:id", async (req: Request, res: Response) => {
  try {
    const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
    const { planId, status } = req.body;
    const companyId = req.auth!.companyId;

    const subscription = await prisma.subscription.findFirst({
      where: { id, customer: { companyId } },
    });

    if (!subscription) {
      return res.status(404).json({ message: "Subscription not found" });
    }

    const updated = await prisma.subscription.update({
      where: { id },
      data: { planId, status },
      include: { customer: true, plan: true },
    });

    res.json(updated);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

router.delete("/:id", async (req: Request, res: Response) => {
  try {
    const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
    const companyId = req.auth!.companyId;

    const subscription = await prisma.subscription.findFirst({
      where: { id, customer: { companyId } },
    });

    if (!subscription) {
      return res.status(404).json({ message: "Subscription not found" });
    }

    await prisma.subscription.delete({ where: { id } });
    res.json({ message: "Subscription deleted" });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

export default router;