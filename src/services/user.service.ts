import { User } from '../entities/user.entity.js';
import jwt from "jsonwebtoken"
import argon2 from 'argon2';
import { FindOneOptions } from 'typeorm';
import { validate, ValidationError } from 'class-validator';

export class UserService {
  public static async verifyUserPassword(query: { email: string, password: string }): Promise<boolean> {
    const user = await UserService.getUserByEmail(query.email)

    if (!user) return false

    return user.checkPassword(query.password)
  }

  public static async generateToken(user: { id: number }): Promise<string> {
    return jwt.sign({ id: user.id }, process.env.JWT_SECRET)
  }

  public static async getUserByEmail(email: string, select?: FindOneOptions<User>['select']): Promise<User | undefined> {
    return User.findOne({ where: { email }, select })
  }

  public static async createUser(payload: { fullName: string, phone: string, email: string, password: string }): Promise<void | ValidationError[]> {
    const user = new User()

    user.fullName = payload.fullName
    user.phone = payload.phone
    user.email = payload.email
    user.password = payload.password ? await argon2.hash(payload.password) : undefined

    const errors = await validate(user)

    if (errors.length > 0) {
      return errors
    }

    await User.save(user)
  }
}
