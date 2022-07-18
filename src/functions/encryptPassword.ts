import bcrypt from 'bcrypt'

//TODO: add this variable to secrets file
const BCRYPT_SALT_ROUNDS = 12

export const encryptPassword = (password: string) => {
  const hashedPassword = bcrypt.hash(password, BCRYPT_SALT_ROUNDS)
  return hashedPassword
}