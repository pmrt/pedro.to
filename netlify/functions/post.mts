import { Config } from "@netlify/functions";

interface ReqBody {
  message: string
}

function response400(error: string): Response {
  return Response.json({
    message: "",
    error,
  }, {
    status: 400,
  })
}

export default async (req: Request) => {
  if (req.method !== "POST") {
    return response400("bad request")
  }

  let data: string
  try {
    data = await req.text()
  } catch (error) {
    return response400("error while reading json")
  }

  const params = new URLSearchParams(data)
  const message = params.get("message");
  if (!message) {
    return response400("bad json body")
  }

  return Response.json({
    message:message, 
  })
}

export const config: Config = {
  path: "/kaisadilla/receivetest",
}
