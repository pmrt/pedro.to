import { Config } from "@netlify/functions";
import { MessageBody, TokenSecret, response400, response401, response500 } from "./common.mts";

export default async (req: Request) => {
  if (req.method !== "POST") {
    return response400("bad request")
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

  let data: string
  try {
    data = await req.text()
  } catch (error) {
    return response400("error while reading json")
  }

  const params = new URLSearchParams(data)
  const [ receiver_url, receiver_endpoint ] = [params.get("receiver_url"), params.get("receiver_endpoint")]
  if (!receiver_url || !receiver_endpoint) {
    return response400("bad json body")
  }

  let resp: Response | null = null;
  try {
    resp = await fetch(receiver_url+receiver_endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: MessageBody,
      })
    })

    if (!resp.ok) {
      return response500(`failed response while sending request to ${receiver_url+receiver_endpoint}. status: ${resp.status} ${resp.statusText}`)
    }

    return Response.json({
      message: "message sent successfully",
      resp: await resp.json()
    }, { status: 200 })
      
  } catch (error) {
    if (resp) {
      return response500(
      `couldn´t send request to ${receiver_url+receiver_endpoint}. resp: status:${resp.status} resp: ${resp.statusText}\nhttp error: ${error instanceof Error ? error.message : "unknown error"}`
      )
    }
      return response500(
      `couldn´t send request to ${receiver_url+receiver_endpoint}. http error: ${error instanceof Error ? error.message : "unknown error"}`
      )
  }
}

export const config: Config = {
  path: "/kaisadilla/send",
}
