const {body}=require("express-validator");

exports.classPostValidator=[
    body("_id").notEmpty().withMessage("id field is required...!")
        .isInt().withMessage("id must be integer...!"),
    body("name").notEmpty().withMessage("name field is required...!")
        .isString().withMessage("name must be string...!")
        .isLength({min:3}).withMessage("name must be at least 3 chararcters...!"),
    body("supervisor").notEmpty().withMessage("supervisor field required...!")
        .isMongoId().withMessage("supervisor must be mongo objectid...!"),
    body("children").notEmpty().withMessage("children field required...!")
        .isArray().withMessage("children must be an array...!"),
    body("children.*").isInt().withMessage("array values must be of type integer...!")
];

exports.classPutValidator=[
    body("_id").notEmpty().withMessage("id field is required...!")
        .isInt().withMessage("id must be integer...!"),
    body("name").optional().notEmpty().withMessage("name field is required...!")
        .isString().withMessage("name must be string...!")
        .isLength({min:3}).withMessage("name must be at least 3 chararcters...!"),
    body("supervisor").optional().notEmpty().withMessage("supervisor field required...!")
        .isMongoId().withMessage("supervisor must be mongo objectid...!"),
    body("children").optional().notEmpty().withMessage("children field required...!")
        .isArray().withMessage("children must be an array...!"),
    body("children.*").isInt().withMessage("array values must be of type integer...!")
];