import { prop, getModelForClass } from '@typegoose/typegoose'

export class User {
  @prop({ required: true, index: true, unique: true })
  id: number
  @prop({ type: String, index: true, required: true, default: [] })
  passwords: string[]
  @prop({ required: true, default: 0 })
  notRespondedTimes: number
}

export const UserModel = getModelForClass(User, {
  schemaOptions: { timestamps: true },
})

export async function findUser(id: number) {
  let user = await UserModel.findOne({ id })
  if (!user) {
    try {
      user = await new UserModel({ id }).save()
    } catch (err) {
      user = await UserModel.findOne({ id })
    }
  }
  return user
}
