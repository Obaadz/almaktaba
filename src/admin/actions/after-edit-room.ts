import { UserService } from "../../services/user.service.js"
import { RoomService } from "../../services/room.service.js"

export const afterEditRoom = async (res, req, ctx) => {
  if (req.method === "post") {
    const room = await RoomService.getRoomById(req.payload.id)
    const user = await UserService.getUserById(req.payload['owner.id'])

    room.name = req.payload.name
    room.owner = user

    await room.save()
  }

  return res
}
