import { Config } from "@netlify/functions";

interface ReqBody {
  receiver_url: string
  receiver_endpoint: string
}

const TokenSecret = "test";
const MessageBody = "PLQG1aPSOqjR+vsPmi+bGnV9VjhqXha9+jx9LirROUISESCYjBmC5Zb3In1ro23cFe6fkZeimWqVjWukT/p7jeEd6KANyfZ7qjIpoE5Zul3qCSO23Jc/q2CrvEaxy8c2IeLV2P6f2UtCsZ4n42F6qRzk4mqSnjwifVtg209DXol1JPsmvoysuZRsvnmasdTIFiPp/4nOiORutk4wfYoG1zLzp7hSmtfE6hwVSAx+qyTji9lNLCjIOaekiKC9ZFo7eg1mGBhulXy+zgG5fAcptHvP/fALJoe2elLSfEZAlajl3PCBr31AOFim7XgdsVA7ZtQKGeqyVZDUqNvFiKC72UYmnh6JbUWFk4ajYtbhIO8EJ8CFOZWVH6GG2tWYkwgvML8Q/Zg8IMu0hEYhDVdZ/+Loc6YQ4JLvX9kfaDH6n/tAO3re5eO6+mQk/6xS9ACgtTnOpWPgW23hQlcnI2ckNNuVRoigwOL7gwlruWBa/NQSvnlKh5gsRHGqBQqaV3arTUeni+M1TFvLj6Pb8i/VTCCA3e/1I7p6N5jeltObYPWK9nDpaOprC+76HGC0myfkBL0zExOzS6HXiGZDvWNLyQCoOqfDh0zXpdPK190Tal764wVRALWcO0QPWsn9S/fJwDyZBSeIiduft+ANtD6Yiy3aLugR6z45I9HZfS07Tj16wBVGqPbatjE2CoCvErHzhuymZWQ83nvYMFJhAaZi/UHLANZRNNc4Ok6GoayEUSZsLlv6tw0RegXh6P15Rv/Y0VG/iK6IMuyIvDXN0q8KPmWiYn0J7eGcmMh/ar4MY22bgSU0esxNBwRl4b26j7Jj9Szr2oX70hGfcJwmT82ROgtw/5746cdAYbulc+gsLJaKm/f6qVcqW3s/5ADz6J7NApqJ57SHajtkEFs2GDmTm/jZmSInVf7bsxx2O01XLkV/y/2F+X1ORbVEn9JnG4OSW1AaGWykVV8/I6Xx0i1bt8jAQeIrL3FqNpeCfsAg17n1cLIAVDFFDQGDlvWdAryWI/DzfujtoLiX5AaXOSYci0zLCJZZHEwo1NfKanq96USMwH8qCd1FKQuKrViK6q8Fy3xRY/c4aQ9/wNrQNQA1jtEVYEiO41r76YXgdzjC0KouAMVFKzEiUMosJF7+AbHclOgHP+aEnLz6/Q+wmrJnaKzjJykITnv2VzWaNmKu3pGUi8xaWoeDNXxVyAXiZdmWMShYUcQhd8KFEMH4+BH5EUy35F3R4qBKbr+v0S4l8QWBxRiPTRmuR8is1U+wBaEWRsSy9VU6vcRDYACBUr4xcCYCXgCBasrVk3aBXC46ou5e9QxIvEzbh6BAgg14SwNAXSDEHBhpgTy9zBPJQy5W4PrCGCKeGg6l3FRHoevF7KL9HhX2GsI22E1slpSh7MNAxNkpmrW+aq8rksxdocSuYL24swjkQ8bc0rFTX13n8N0xkD2Bg+xdq69R7Atn4Xf0";

function response400(error: string): Response {
  return Response.json({
    message: "",
    error,
  }, {
    status: 400,
  })
}

function response500(error: string): Response {
  return Response.json({
    message: "",
    error,
  }, {
    status: 400,
  })
}

function response401(error: string): Response {
  return Response.json({
    message: "",
    error,
  }, {
    status: 401,
  })
}

export default async (req: Request) => {
  if (req.method !== "POST") {
    return response400("bad request")
  }

  const authHeader = req.headers.get("Authorization")
  if (!authHeader) {
    return response401("empty token")
  }

  const token = authHeader.startsWith("Bearer ")
    ? authHeader.slice(7) // Quita el prefijo "Bearer "
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
