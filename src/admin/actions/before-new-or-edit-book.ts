export const beforeNewOrEditBook = (req, ctx) => {
  if (req.method === "post") {
    if (req.payload.price)
      req.payload.price = parseFloat(req.payload.price).toString() + " EGP"
  }

  return req
}
