import { Router, Request, Response, NextFunction } from "express";
import { permit } from "../../utility/authorize";
import { Roles } from "../../utility/populate";
import { ResponseHandler } from "../../utility/response";
import trackService from "./track.service";

const router = Router();
router.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await trackService.getAll();
        res.send(new ResponseHandler(result));
    }
    catch (e) {
        next(e);
    }
});
router.post('/create', permit([Roles.admin]),async (req: Request, res: Response, next: NextFunction) => {
    try {
        const data = req.body;
        const result = await trackService.createTrack(data);
        res.send(new ResponseHandler(result));
    }
    catch (e) {
        next(e);
    }
});
router.put('/update', permit([Roles.admin]),async (req: Request, res: Response, next: NextFunction) => {
    try {
        const data = req.body;
        const result = await trackService.updateTrack(data);
        res.send(new ResponseHandler(result));
    }
    catch (e) {
        next(e);
    }
});
export default router;