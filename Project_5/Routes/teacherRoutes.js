const express=require("express");
const {body,param,query}=require("express-validator");
const router=express.Router();
const controller=require("./../Controllers/teacherController");
const validate=require("./../Core/Validations/validationMiddelWare");
const teacherValidator=require("./../Core/Validations/teacherValidator");
const authMW=require("./../Core/Auth/authenticationMiddleWare");
const multer=require("multer");
const path=require("path");

router.route("/teachers")
    .all(authMW.checkAdmin)
    .get(controller.getAllTeachers)
    .post(multer({
        storage:multer.diskStorage({
            destination:(request,file,callBack)=>{
                callBack(null,path.join(__dirname,"..","images"))
            }
        })
    }).single("image"),teacherValidator.teacherPostValidator,validate,controller.addTeacher)
    .put(teacherValidator.teacherPutValidator,validate,controller.updateTeacher)
    .delete(
        body("_id").isMongoId().withMessage("Id should be Mongo Object...!")
        ,validate,controller.deleteTeacher
    )
    ;

router.get("/teachers/:id",authMW.checkAdmin,controller.getTeacher)


module.exports=router;

