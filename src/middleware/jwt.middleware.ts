import { expressjwt } from "express-jwt";
import { type Request } from "express";

const isAuthenticated = expressjwt({
  secret: process.env.TOKEN_SECRET!,
  algorithms: ["HS256"],
  requestProperty: "auth",
  getToken: (req: Request) => {
    const authHeader = req.headers.authorization;
    console.log("🔐 Authorization header:", authHeader);

    if (authHeader?.startsWith("Bearer ")) {
      const token = authHeader.substring(7);
      console.log("✅ Token extracted:", token.substring(0, 20) + "...");
      return token;
    }

    console.log("❌ No token found");
    return undefined;
  },
});

export default isAuthenticated;