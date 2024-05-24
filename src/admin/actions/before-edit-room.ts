export const beforeEditRoom = async (req, ctx) => {
  if (req.method === "post") {
    req.payload.messages = '' // Fix validation error when editing order
    req.payload.users = '' // Fix validation error when editing order
  }

  return req
}
