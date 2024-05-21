import { OrderService } from "../../services/order.service.js"

export const afterEditOrder = async (res, req, ctx) => {
  if (req.method === "post") {
    const order = await OrderService.getOrderById(req.params.id)

    console.log(req.payload)

    order.code = req.payload.code
    order.note = req.payload.note

    await order.save()
  }

  return res
}
