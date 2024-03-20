import User from "./user.model"
import { hashPassword, compareSync } from '../../../utils/bcrypt'

export const signupUser = async (body) => {
  try {
    const user = {
      ...body,
      password: hashPassword(body.password),
      userType: 'user'
    }
    const dbUser = await User.create(user)
    return dbUser
  } catch (err) {
    throw err
  }
}
export const signupCleaner = async (body) => {
  try {
    const cleaner = {     
      ...body,
      password: hashPassword(body.password),
      userType: 'cleaner'
    }
    const dbCleaner = await User.create(cleaner)
    return dbCleaner
  } catch (err) {
    throw err
  }
}

  export const loginUserAndCleaner = async (body) => {
    try {
      const user = await User.findOne({
        $or: [{ email: body.userOrEmail }, { user: body.userOrEmail }],
      })
  
      if (!user) throw new Error('not found')
      const passwordIsCorrect = compareSync(body.password, user.password)
      if (!passwordIsCorrect) throw new Error('password incorrect')
  
      return user
    } catch (err) {
      throw err
    }
  }
  