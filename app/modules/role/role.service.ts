import roleRepo from "./role.repo";
import { IRole } from "./role.types";
const createRole = (role: IRole) => roleRepo.createRole(role);
const updateRole = (role: IRole) => roleRepo.updateRole(role);
const getAll = () => roleRepo.getAll();
export default {
createRole,
updateRole,
getAll,
}