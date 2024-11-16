import { Config } from "@netlify/functions"
import { TokenSecret, response401 } from "./common.mts"

export default async (req: Request) => {
  if (req.method !== "GET") {
    return Response.json({
      message: "",
      error: "method not allowed",
    }, { status: 405 })
  }

  const authHeader = req.headers.get("Authorization")
  if (!authHeader) {
    return response401("empty token")
  }

  const token = authHeader.startsWith("Bearer ")
    ? authHeader.slice(7)
    : authHeader;
  if (token != TokenSecret) {
    return response401("invalid token")
  }

  return Response.json({
    message: "ok"
  }, { status: 200 })
}

export const config: Config = {
  path: "/kaisadilla/health",
}
