import User from "./user.model"
import { hashPassword, compareSync } from '../../../utils/bcrypt'

export const signupUser = async (body) => {
  try {
    const user = {
      ...body,
      password: hashPassword(body.password)
    }
    const dbUser = await User.create(user)
    return dbUser
  } catch (err) {
    throw err
  }
}

  export const loginUser = async (body) => {
    try {
      const user = await User.findOne({
        $or: [{ email: body.userOrEmail }, { user: body.userOrEmail }]
      })
  
      if (!user) throw new Error('not found')
      const passwordIsCorrect = compareSync(body.password, user.password)
      if (!passwordIsCorrect) throw new Error('password incorrect')
  
      return user
    } catch (err) {
      throw err
    }
  }
  