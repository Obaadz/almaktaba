import { Order } from "../../entities/order.entity.js"

export const beforeEditOrder = async (req, ctx) => {
  if (req.method === "post") {
    req.payload.cartItems = '' // Fix validation error when editing order

    await Order.update({ id: req.params.id }, { code: req.payload.code, note: req.payload.note })
  }

  return req
}
