import { Router, Request, Response } from "express";
import prisma from "../lib/prisma";
import isAuthenticated from "../middleware/jwt.middleware";

const router = Router()
router.use(isAuthenticated)

router.get("/", async (req: Request, res: Response) => {
  const plans = await prisma.plan.findMany();
  res.json(plans);
});

router.post("/", async (req: Request, res: Response) => {
  const { name, priceMonthly } = req.body;

  const plan = await prisma.plan.create({
    data: { name, priceMonthly },
  });

  res.status(201).json(plan);
});

router.put("/:id", async (req: Request, res: Response) => {
  const { name, priceMonthly } = req.body;

  try {
    const updated = await prisma.plan.update({
      where: { id: req.params.id },
      data: { name, priceMonthly },
    });
    res.json(updated);
  } catch {
    res.status(404).json({ message: "Plan not found" });
  }
})

router.delete("/:id", async (req: Request, res: Response) => {
  try {
    await prisma.plan.delete({ where: { id: req.params.id } });
    res.json({ message: "Plan deleted" });
  } catch {
    res.status(404).json({ message: "Plan not found" });
  }
});


export default router