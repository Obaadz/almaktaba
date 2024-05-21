export const beforeEditOrder = (req, ctx) => {
  if (req.method === "post") {
    req.payload.cartItems = '' // Fix validation error when editing order
  }

  return req
}
