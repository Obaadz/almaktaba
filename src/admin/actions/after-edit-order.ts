import { Order } from "../../entities/order.entity.js"

export const afterEditOrder = async (res, req, ctx) => {
  if (req.method === "post") {
    await Order.update({ id: req.params.id }, { code: req.payload.code, note: req.payload.note })
  }

  return res
}
