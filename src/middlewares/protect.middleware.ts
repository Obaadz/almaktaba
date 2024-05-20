import type { Request, Response, NextFunction } from 'express'
import { UserService } from '../services/user.service.js'

export class ProtectMiddleware {
  public static protect(req: Request, res: Response, next: NextFunction): void | Promise<void> {
    try {

      const authorizationHeader = req.headers["authorization"],
        token = authorizationHeader?.split(' ')[1]

      if (!token) {
        res.status(401).send({ data: null, error: { message: 'Unauthorized' } })
        return
      }

      const data = UserService.verifyToken(token)

      if (!data) {
        res.status(401).send({ data: null, error: { message: 'Unauthorized' } })
        return
      }

      req.auth = { user: { id: data.id }, token }

      next()
    } catch (error) {
      console.error(error);
      res.status(500).send({ data: null, error: { message: 'Internal server error' } });
    }
  }
}
