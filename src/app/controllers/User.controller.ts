import StatusCode from "../../configurations/StatusCode"
import { encryptPassword, generateAccessToken } from "../../functions"
import UserModel from "../models/User.model"

const createUser = async (request, response) => {
  const { email, password } = request.body

  const user = new UserModel({
    email: email,
    password: await encryptPassword(password)
  })

  try {
    const databaseResponse = await user.save()
    response.status(StatusCode.CREATED).send(databaseResponse)
  } catch (error) {
    response.status(StatusCode.INTERNAL_SERVER_ERROR).send({ message: error.message })
  }
}

const login = () => {
  /*   const x = generateAccessToken(email)
    console.log('x', x) */
}

const getAllUsers = async (request, response) => {
  try {
    const databaseResponse = await UserModel.find()
    response.status(StatusCode.OK).send(databaseResponse)
  } catch (error) {
    response.status(StatusCode.INTERNAL_SERVER_ERROR).send({ message: error.message })
  }
}

export default {
  createUser,
  login,
  getAllUsers,
}