export const beforeEditOrder = async (req, ctx) => {
  if (req.method === "post") {
    req.payload.cartItems = '' // Fix validation error when editing order
  }

  return req
}
