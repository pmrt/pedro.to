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

  let data: ReqBody | null;
  try {
    data = await req.json() as ReqBody
  } catch (error) {
    return response400("error while reading json")
  }

  const { message } = data;
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
