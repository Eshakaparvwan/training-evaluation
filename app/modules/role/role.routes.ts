import { Router, Request, Response, NextFunction } from "express";
import { ResponseHandler } from "../../utility/response";
import roleService from "./role.service";
import { permit } from "../../utility/authorize";
import { Roles } from "../../utility/populate";
const router = Router();
router.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await roleService.getAll();
        res.send(new ResponseHandler(result));
    }
    catch (e) {
        next(e);
    }
});
router.post('/create', permit([Roles.admin]), async (req: Request, res: Response, next: NextFunction) => {
    try {
        const data = req.body;
        const result = await roleService.createRole(data);
        res.send(new ResponseHandler(result));
    }
    catch (e) {
        next(e);
    }
});
router.put('/update', permit([Roles.admin]) ,async (req: Request, res: Response, next: NextFunction) => {
    try {
        const data = req.body;
        const result = await roleService.updateRole(data);
        res.send(new ResponseHandler(result));
    }
    catch (e) {
        next(e);
    }
});


export default router;