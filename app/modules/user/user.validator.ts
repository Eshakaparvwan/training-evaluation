import { body, param } from "express-validator";
import validate from "../../utility/validate";


export const userValidator = [
    body("userId").notEmpty().isString().withMessage("Enter a userID"),
    body("password").notEmpty().isString().withMessage("Enter password"),
    body("name").notEmpty().isString().withMessage("Enter a name"),
    body("email").notEmpty().isEmail().withMessage("Enter a valid email."),
    body("role").notEmpty().isString().withMessage("Enter a valid role"),
    validate,

];
export const CredentialsValidator=[
    body("userId").isString().notEmpty().withMessage("userId is required "),
    body("password").isString().notEmpty().withMessage("password is required"),
    validate

];