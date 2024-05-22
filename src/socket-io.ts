import { Server as HttpServer } from "http";
import { Server, Socket } from "socket.io";
import { User } from "./entities/user.entity.js";
import { UserService } from "./services/user.service.js";
import { MessageService } from "./services/message.service.js";
import { RoomService } from "./services/room.service.js";

type SocketProtected = Socket & {
  user: User
};

type Message = {
  roomId: number;
  content: string;
};

export class SocketIOServer {
  private static io: Server;

  public static initalize(httpServer: HttpServer) {
    SocketIOServer.io = new Server(httpServer, {
      maxHttpBufferSize: 1e7, // 10MB
      cors: {
        origin: "*",
      },
    })

    SocketIOServer.startIOListeners()
  }

  public static startIOListeners() {
    SocketIOServer.io.use(async (socket: SocketProtected, next) => {
      console.log("socket auth:", socket.id)

      const token = socket.handshake.auth.token || socket.handshake.headers['authorization']

      console.log("token:", token)

      const data = UserService.verifyToken(token)

      console.log("TOKEN DATA:", data)

      if (!data) {
        next(new Error('Unauthorized'))
        return
      }

      const user = await UserService.getUserById(data.id)

      if (!user) {
        next(new Error('Unauthorized'))
        return
      }

      socket.user = user

      next()
    })

    SocketIOServer.io.on('connection', (socket: SocketProtected) => {
      console.log('User connected, ID of user:', socket.user.id)

      socket.on('message', async (payload: Message) => {
        console.log('Message received:', payload, "from user:", socket.user.id, "to room:", payload.roomId)

        if (!payload || !payload.content || !payload.roomId || typeof payload.content != 'string' || typeof payload.roomId != 'number') {
          console.error('Invalid message payload:', payload)
          socket.emit('error', 'Invalid message payload')
          return
        }

        const room = await RoomService.getRoomById(payload.roomId)

        if (!room) {
          console.error('Room not found:', payload.roomId)
          socket.emit('error', 'Room not found')
          return
        }

        const newMessage = await MessageService.createMessage({ content: payload.content, roomId: payload.roomId, senderId: socket.user.id })

        SocketIOServer.io.emit('message', {
          id: newMessage.id,
          content: newMessage.content,
          createdAt: newMessage.createdAt,
          room: {
            id: newMessage.room.id,
            name: newMessage.room.name,
            owner: {
              id: newMessage.room.owner.id,
              fullName: newMessage.room.owner.fullName
            }
          },
          sender: {
            id: newMessage.sender.id,
            fullName: newMessage.sender.fullName
          },
        })
      })

      socket.on('error', (error) => {
        console.error('Socket error:', error)

        socket.emit('error', error)
      })

      socket.on('disconnect', () => {
        console.log('User disconnected, ID of user:', socket.user.id)
      })
    })

    SocketIOServer.io.on('error', (error) => {
      console.error('Socket error io:', error)
    })
  }
}