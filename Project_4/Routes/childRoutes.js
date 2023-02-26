const express=require("express");
const {body,param,query}=require("express-validator");
const router=express.Router();
const controller=require("./../Controllers/childController");
const validate=require("./../Core/Validations/validationMiddelWare");
const childValidator=require("./../Core/Validations/childValidator");

router.route("/children")
    .get(controller.getAllChilds)
    .post(childValidator.childPostValidator,validate,controller.addChild)
    .put(childValidator.childPutValidator,validate,controller.updateChild)
    .delete(
        body("_id").notEmpty().withMessage("id field required...!")
        .isInt().withMessage("id must be integer...!")
        ,validate,controller.deleteChild)
    ;
  
router.get("/children/:id",controller.getChild);

module.exports=router;