const express=require("express");
const {body,param,query}=require("express-validator");
const router=express.Router();
const controller=require("./../Controllers/classController");
const childController=require("./../Controllers/childController");
const teacherController=require("./../Controllers/teacherController");
const validate=require("./../Core/Validations/validationMiddelWare");
const classValidator=require("./../Core/Validations/classValidator");
const authMW=require("./../Core/Auth/authenticationMiddleWare");

router.route("/classes")
    .all(authMW.checkAdmin)
    .get(controller.getAllClasses)
    .post(classValidator.classPostValidator,validate,controller.addClass)
    .put(classValidator.classPutValidator,validate,controller.updateClass)
    .delete(
        body("_id").isInt().withMessage("id must be integer...!")
        ,validate,controller.deleteClass)
    ;
  
router.get("/classes/:id",authMW.checkAdmin,controller.getClass);
router.get("/classChildren/:id",authMW.checkAdmin,childController.getAllChilds);
router.get("/classTeacher/:id",authMW.checkAdmin,teacherController.getTeacher);

module.exports=router;