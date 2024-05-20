import { User } from '../entities/user.entity.js';
import jwt from "jsonwebtoken"
import argon2 from 'argon2';
import { FindOneOptions } from 'typeorm';
import { validate, ValidationError } from 'class-validator';

export class UserService {
  public static async getUserByEmail(email: string): Promise<User | undefined> {
    return User.findOne({ where: { email } })
  }

  public static async getUserById(id: number): Promise<User | undefined> {
    return User.findOne({ where: { id } })
  }

  public static async generateToken(user: { id: number }): Promise<string> {
    return jwt.sign({ id: user.id }, process.env.JWT_SECRET)
  }

  public static verifyToken(token: string): { id: number } | null {
    try {
      const data = jwt.verify(token, process.env.SECRET)

      if (typeof data === 'string')
        return null

      return data as {
        id: number
      }
    } catch (error) {
      console.error(error)

      return null
    }
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

  public static async updateUser(query: { email?: string }, payload: { fullName?: string, phone?: string, email?: string, password?: string, OTP?: string | null }): Promise<void | ValidationError[]> {
    const user = await UserService.getUserByEmail(query.email)

    if (payload.email)
      user.email = payload.email
    if (payload.fullName)
      user.fullName = payload.fullName
    if (payload.phone)
      user.phone = payload.phone
    if (payload.password)
      user.password = payload.password ? await argon2.hash(payload.password) : undefined

    user.OTP = payload.OTP

    const errors = await validate(user)

    if (errors.length > 0) {
      return errors
    }

    await User.save(user)
  }
}