import User from "./user.model"
import { hashPassword, compareSync } from '../../../utils/bcrypt'
import { generateAccessToken } from "../../../utils/auth"

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
      
 
    const token = generateAccessToken(
      { 
        user: body.userOrEmail,
        userId: user.id ,
        fullName: user.fullName,
        email: user.email
      });
     return token
    } catch (err) {
      throw err
    }
  }
  export const findCleaner = async (user, fullName) => {
    try {
      const userDB = await User.findOne({      
        $or: [{ user: user }, { fullName: fullName }],
        userType: 'cleaner'
      })
      if(!userDB) throw new Error('not found cleaner')
      return userDB
    } catch (err) {
      throw err
    }

  }
  export const getCleanerName = async (body) => {
    try {
      const userDB = await User.findOne({

      $or: [{user: body.cleanerName, }, { fullName: body.cleanerName }],

      })
      if(!userDB) throw new Error('not found user')
      return userDB
    } catch (err) {
      throw err
    }
  }
  export const editUser = async (body) => {
    try {
      const user = await User.findById(body.id);
  
      if (!user) {
        throw new Error('Usuário não encontrado');
      }
  
      if (body.password && body.password !== user.password) {
      
        body.password = hashPassword(body.password);
      } else {
      
        body.password = user.password;
      }
         
      const updatedUser = await User.findOneAndUpdate(
        { _id: body.id },
        {
          fullName: body.fullName,
          user: body.user,
          email: body.email,
          password: body.password,
          address: body.address,
          number: body.number,
        },
        { new: true }
      );
  
      return updatedUser;
    } catch (err) {
      throw err;
    }
   
  }
   export const verifyPassword = async (body, user) => {
    try {    
      const userDB = await User.findOne({
        user: user,
      })
      const passwordIsCorrect = compareSync(body.password, userDB.password)
      if (!passwordIsCorrect) throw new Error('password incorrect')
    
     return userDB
    } catch (err) {
      throw err
    }
  }
  
   export const getUser = async (userId) => {
    try {
      const userDB = await User.findById({
        _id: userId,         
      })
      if(!userDB) throw new Error('not found any user')
      return userDB
    } catch (err) {
      throw err
    }
  }
 