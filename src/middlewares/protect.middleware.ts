import type { Request, Response, NextFunction } from 'express'
import { UserService } from '../services/user.service.js'

export class ProtectMiddleware {
  public static protect(req: Request, res: Response, next: NextFunction): void | Promise<void> {
    const authorizationHeader = req.headers["authorization"],
      token = authorizationHeader?.split(' ')[1]

    if (!token) {
      res.status(401).send({ data: null, error: { message: 'Unauthorized' } })
      return
    }

    const data = UserService.verifyToken(token)

    req.auth = { user: { id: data.id }, token }

    next()
  }

}
