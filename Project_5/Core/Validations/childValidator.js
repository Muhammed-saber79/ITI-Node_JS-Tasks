const {body,param,query}=require("express-validator");

exports.childPostValidator=[
    body("_id").notEmpty().withMessage("id field is required...!")
        .isInt().withMessage("id must be integer...!"),
    body("fullName").notEmpty().withMessage("fullName field is required...!")
        .isString().withMessage("fullName must be string...!")
        .isLength({min:3}).withMessage("fullName must be at least 3 chararcters...!"),
    body("age").notEmpty().withMessage("age field is required...!")
        .isInt().withMessage("age must be int...!"),
    body("level").isIn(["PreKG","KG1","KG2"]).withMessage("level must be on of these options['PreKG','KG1','KG2']...!"),
    body("address").notEmpty().withMessage("address is empty...!")
        .isObject().withMessage("address must be written in json format as an Object...!"),
    body("address.city").notEmpty().withMessage("city field is required...!")
        .isAlpha().withMessage("city must be string...!"),
    body("address.street").notEmpty().withMessage("street field is required...!")
        .isAlphanumeric().withMessage("street must be mixed...!"),
    body("address.building").notEmpty().withMessage("building field is required...!")
        .isAlphanumeric().withMessage("building must be mixed...!")
];

exports.childPutValidator=[
    body("_id").notEmpty().withMessage("id field is required...!")
        .isInt().withMessage("id must be integer...!"),
    body("fullName").optional().notEmpty().withMessage("fullName field is required...!")
        .isString().withMessage("fullName must be string...!")
        .isLength({min:3}).withMessage("fullName must be at least 3 chararcters...!"),
    body("age").optional().notEmpty().withMessage("age field is required...!")
        .isInt().withMessage("age must be int...!"),
    body("level").optional().isIn(["PreKG","KG1","KG2"]).withMessage("level must be on of these options['PreKG','KG1','KG2']...!"),
    body("address").optional().notEmpty().withMessage("address is empty...!")
        .isObject().withMessage("address must be written in json format as an Object...!"),
    body("address.city").optional().notEmpty().withMessage("city field is required...!")
        .isAlpha().withMessage("city must be string...!"),
    body("address.street").optional().notEmpty().withMessage("street field is required...!")
        .isAlphanumeric().withMessage("street must be mixed...!"),
    body("address.building").optional().notEmpty().withMessage("building field is required...!")
        .isAlphanumeric().withMessage("building must be mixed...!")
];