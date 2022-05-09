import { ICredentials } from "../../utility/credentials";
import userRepo from "./user.repo";
import { IUser } from "./user.type";
import { sign } from "jsonwebtoken";

const createUser = (user: IUser) => userRepo.createUser(user);
const findOne = (credentials: ICredentials) => userRepo.findOne(credentials);
const getAll = () => userRepo.getAll();
const getOne = (id: string) => userRepo.getOne(id);
const deleteUser = (id: string) => userRepo.deleteUser(id);
 
const login = async (credentials: ICredentials) => {
    const userRecord = await userRepo.findOne(credentials);
    if (!userRecord) {
        throw { statusCode: 404, message: "INVALID CREDENTIALS" }
    }
    const { SECRET_KEY } = process.env;
    const token = sign(JSON.parse(JSON.stringify(userRecord)), SECRET_KEY || '');
    return { token };
}
const getTrainer=() => userRepo.getTrainer();
export default {
    createUser,
    findOne,
    getAll,
    getOne,
    login,
    deleteUser,
    getTrainer,
};