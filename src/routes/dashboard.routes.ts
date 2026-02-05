import { Router, type Request, type Response } from "express";
import prisma from "../lib/prisma";

const router = Router();

router.get("/", async (req: Request, res: Response) => {
  try {
    const companyId = req.auth!.companyId;

    const [customers, plans, subscriptions] = await Promise.all([
      prisma.customer.findMany({
        where: { companyId },
      }),
      prisma.plan.findMany(),
      prisma.subscription.findMany({
        where: { customer: { companyId } },
        include: {
          customer: true,
          plan: true,
        },
      }),
    ]);

    res.json({
      customers,
      plans,
      subscriptions,
    });
  } catch (error: any) {
    console.error("❌ Dashboard error:", error.message);
    res.status(500).json({ message: error.message });
  }
});

export default router;