import { body, param } from "express-validator";
import validate from "../../utility/validate";

// _id?: string,
//     name:string,/
//     age:string,/
//     email:string,/
//     rating:object[],/
//     track:string,/
//     createdAt?:Date,
//     lastEvaluated?: Date,
//     trainerAssigned?:string[]

export const studentValidator = [
    body("name").notEmpty().isString().withMessage("Enter a name"),
    body("age").notEmpty().isNumeric().withMessage("Enter a age"),
    body("email").notEmpty().isEmail().withMessage("Enter a email"),
    body("rating").notEmpty().isArray().withMessage("Enter rating"),
    body("track").notEmpty().isString().withMessage("Enter a track"),
    body("trainerAssigned").notEmpty().isArray().withMessage("Enter trainerAssigned"),
    validate,

];
// page?: number;
// itemsPerPage?: number;
// track?: string;
// overallAverage?: number;
// trainer?: string;
// export const filterValidator = [
//     body("page").isNumeric().withMessage("Enter number"),
//     body("itemsPerPage").isNumeric().withMessage("Enter items per page"),
//     body("track").isString().withMessage("Enter track"),
//     body("overallAverage").isNumeric().withMessage("Enter overAllAvg"),
//     body("trainer").isString().withMessage("Enter trainer"),
//     validate,

// ];