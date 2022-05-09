import { Schema, Types, Document, model} from "mongoose"
import { IUser } from "./user.type";
class UserSchema extends Schema {
    constructor() {
        super({
            userId: {
                type: String,
                required: true
            },
            password: {
                type: String,
                required: true
            },
            name: {
                type: String,
                required: true
            },
            email: {
                type: String,
                required: true
            },
            role: {
                type: Types.ObjectId,
                required: true
            }

        });
    }

}
type userDocument=Document & IUser;
const UserModel=model<userDocument>("User",new UserSchema());
export default UserModel;