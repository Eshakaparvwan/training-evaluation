import { IRole } from "./role.types";
import roleModel from "./role.schema";


const createRole = (role: IRole) => roleModel.create(role);
const updateRole = (role: IRole) => roleModel.updateOne({
    _id: role._id
}, role);
const getAll = () => roleModel.find({});
export default {
createRole,
updateRole,
getAll,
}