import { Server as HttpServer } from "http";
import { Server, Socket } from "socket.io";
import { User } from "./entities/user.entity.js";
import { UserService } from "./services/user.service.js";
import { MessageService } from "./services/message.service.js";

type SocketProtected = Socket & {
  user: User
};

type Message = {
  roomId: number;
  senderId: number;
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
      const token = socket.handshake.auth.token

      const data = UserService.verifyToken(token)

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
      console.log('User connected:', socket.user.id)

      socket.on('message', async (message: Message) => {
        console.log('Message received:', message)

        const sentMessage = await MessageService.createMessage(message)

        socket.broadcast.emit('message', sentMessage)
      })
    })

    SocketIOServer.io.on('disconnect', (socket: SocketProtected) => {
      console.log('User disconnected:', socket.user.id)
    })
  }
}