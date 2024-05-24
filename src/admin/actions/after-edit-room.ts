import { RoomService } from "../../services/room.service.js"

export const afterEditOrder = async (res, req, ctx) => {
  if (req.method === "post") {
    const room = await RoomService.getRoomById(req.payload.id)

    room.name = req.payload.name
    room.owner = req.payload.owner

    await room.save()
  }

  return res
}
