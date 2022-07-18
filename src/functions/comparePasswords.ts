import bcrypt from 'bcrypt'

export const comparePasswords = async (password: string, encryptedPassword: string) => {
  const passwordComparision = await bcrypt.compare(password, encryptedPassword)
  return passwordComparision
}