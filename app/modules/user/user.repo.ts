import { ICredentials } from "../../utility/credentials";
import UserModel from "./user.schema";
import { IUser } from "./user.type";
import { Types } from "mongoose"

const createUser = (user: IUser) => UserModel.create(user);
const findOne = (credentials: ICredentials) => UserModel.findOne(credentials);
const getAll = () => UserModel.find();
const getOne = (id: string) => UserModel.findById(id);
const deleteUser = (id: string) => UserModel.deleteOne({ _id: id });
const getTrainer=() => UserModel.find({role: new Types.ObjectId('624579d728f6ec28cae0885f')})
export default {
    createUser,
    findOne,
    getAll,
    getOne,
    deleteUser,
    getTrainer,
};
