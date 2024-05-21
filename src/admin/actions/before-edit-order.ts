export const beforeEditOrder = (req, ctx) => {
  if (req.method === "post") {
    console.log("REQ PAYLOD", req.payload)
  }

  return req
}
