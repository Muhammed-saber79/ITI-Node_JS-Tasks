const express=require("express");
const {body,param,query}=require("express-validator");
const router=express.Router();
const controller=require("./../Controllers/teacherController");
const validate=require("./../Core/Validations/validationMiddelWare");
const teacherValidator=require("./../Core/Validations/teacherValidator");


router.route("/teachers")
    .get(controller.getAllTeachers)
    .post(teacherValidator.teacherPostValidator,validate,controller.addTeacher)
    .put(teacherValidator.teacherPutValidator,validate,controller.updateTeacher)
    .delete(
        body("_id").isMongoId().withMessage("Id should be Mongo Object...!")
        ,validate,controller.deleteTeacher
    )
    ;

router.get("/teachers/:id",controller.getTeacher)


module.exports=router;

