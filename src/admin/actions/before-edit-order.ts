export const beforeEditOrder = (req, ctx) => {
  if (req.method === "post") {
    console.log("REQ", req)
    console.log("CTX", ctx)
  }

  return req
}
