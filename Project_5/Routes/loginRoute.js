const express=require("express");
const {body,params,query}=require("express-validator");
const router=express.Router();
const controller=require("./../Controllers/loginController");
const validate=require("./../Core/Validations/validationMiddelWare");


router.post("/login",
    body("email").notEmpty().withMessage("email field required...!")
    .isString().withMessage("email must be in email format...!"),
    body("password").notEmpty().withMessage("password field required...!")
    .isString().withMessage("password must be string...!")
,validate,controller.login);

module.exports=router;