import { IExclude, Route } from "./routes.types";
import trackRouter from "../modules/track/track.routes"
import roleRouter from "../modules/role/role.routes"
import userRouter from "../modules/user/user.routes"
import studentRouter from "../modules/student/student.routes"
export const routes: Route[] = [
    new Route('/track',trackRouter),
    new Route('/role',roleRouter),
    new Route('/user',userRouter),
    new Route('/student',studentRouter)
];

export const excludedPaths: IExclude[] = [
    { method: 'POST', path: '/user/login' },
];