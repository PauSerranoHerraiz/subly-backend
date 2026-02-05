import "express";

declare global {
  namespace Express {
    interface Request {
      auth?: {
        id: string;
        email: string;
        role: string;
        companyId: string;
      };
    }
  }
}

export {};
