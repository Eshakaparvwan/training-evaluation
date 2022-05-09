import { Router, Request, Response, NextFunction } from "express";
import { ResponseHandler } from "../../utility/response";
import { permit } from "../../utility/authorize";
import { Roles } from "../../utility/populate";
import studentServices from "./student.services";
import { studentValidator } from "./student.validation";
const router = Router();
router.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await studentServices.getAll();
        res.send(new ResponseHandler(result));
    }
    catch (e) {
        next(e);
    }
});
router.post('/create', permit([Roles.admin, Roles.trainer]), studentValidator, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const data = req.body;
        const result = await studentServices.createStudent(data);
        res.send(new ResponseHandler(result));
    }
    catch (e) {
        next(e);
    }
});
// filter the data 
// router.post('/track', permit([Roles.trainer]), async (req: Request, res: Response, next: NextFunction) => {
//     try {

//     }
//     catch (e) {
//         next(e);
//     }
// })
//update the student data
router.put('/update', permit([Roles.admin, Roles.admin]), async (req: Request, res: Response, next: NextFunction) => {
    try {
        const data = req.body;
        const result = await studentServices.updateStudent(data);
        res.send(new ResponseHandler(result));
    }
    catch (e) {
        next(e);
    }
});

router.put('/addRating', permit([Roles.admin, Roles.trainer]), async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id, rating } = req.body;
        const result = await studentServices.addRating(id, rating);
        res.send(new ResponseHandler(result));
    }
    catch (e) {
        next(e);
    }
});

router.get('/showHistory/:id', permit([Roles.admin, Roles.trainer]),
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const id = req.params.id;
            const result = await studentServices.getOne(id);
            res.send(new ResponseHandler(result));

        }
        catch (e) {
            next(e);
        }
    })

router.get('/filter',permit([Roles.admin, Roles.trainer]), async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { role , _id} =res.locals.user;
        const filter = req.body;
        const result = await studentServices.calculateAvg(filter , role ,_id);
        res.send(new ResponseHandler(result));
    }
    catch (e) {
        next(e);
    }
});


export default router;