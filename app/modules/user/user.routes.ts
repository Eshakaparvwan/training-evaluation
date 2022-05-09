import { Router, Request, Response, NextFunction } from "express";
import { ResponseHandler } from "../../utility/response";
import userServices from "./user.services";
import { CredentialsValidator, userValidator } from "./user.validator";
import { Roles } from "../../utility/populate";
import { permit } from "../../utility/authorize";
const router = Router();
router.get('/', permit([Roles.admin]),
    async (
        req: Request,
        res: Response,
        next: NextFunction) => {
        try {
            const result = await userServices.getAll();
            res.send(new ResponseHandler(result));
        }
        catch (e) {
            next(e);
        }
    });
router.post('/create', permit([Roles.admin]), userValidator,
    async (
        req: Request,
        res: Response,
        next: NextFunction) => {
        try {
            const data = req.body;
            const result = await userServices.createUser(data);
            res.send(new ResponseHandler(result));
        }
        catch (e) {
            next(e);
        }
    });
router.post('/login', CredentialsValidator,
    async (
        req: Request,
        res: Response,
        next: NextFunction) => {
        try {
            const data = req.body;
            const result = await userServices.login(data);
            res.send(new ResponseHandler(result));
        }
        catch (e) {
            next(e);
        }
    });

router.get('/trainer',async (
    req: Request,
    res: Response,
    next: NextFunction) => {
    try {

        const result = await userServices.getTrainer();
        res.send(new ResponseHandler(result));
    }
    catch (e) {
        next(e);
    }
});


export default router;