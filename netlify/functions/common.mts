export const TokenSecret = process.env.TOKEN_SECRET;
export const MessageBody = process.env.MESSAGE_BODY;

export function response400(error: string): Response {
  return Response.json({
    message: "",
    error,
  }, {
    status: 400,
  })
}

export function response500(error: string): Response {
  return Response.json({
    message: "",
    error,
  }, {
    status: 400,
  })
}

export function response401(error: string): Response {
  return Response.json({
    message: "",
    error,
  }, {
    status: 401,
  })
}
