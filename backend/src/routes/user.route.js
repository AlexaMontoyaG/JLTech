const { Router } = require("express");
const { check } = require("express-validator");
const {
  createUser,
  listUsers,
  deleteUser,
  updateUser,
} = require("../controller/user.controller");
const {
  validateExistingEmail,
  validateExistingUser,
} = require("../helpers/dbValidations");
const { validateFields } = require("../middlewares/validateFields");
const { validateRoleAdminOrRh } = require("../middlewares/validateRoles");
const {
  validateJWT,
  validateUser,
  validateFile, validateMongoId
} = require("../middlewares/validations");
const route = Router();

route.post(
  "/register",
  [
    check("email")
      .isEmail()
      .withMessage("Invalid email")
      .notEmpty()
      .withMessage("Email required")
      .custom(validateExistingEmail),
    check("password")
      .notEmpty()
      .withMessage("Password required")
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
        "i"
      )
      .withMessage(
        "Password should be combination of one uppercase, one lower case, one special char, one digit and min 8 char long"
      ),
    check("contact").notEmpty().withMessage("Contact required"), check("name").notEmpty().withMessage("Name required"),
    validateFields,
    validateFile,
    validateJWT,
    validateRoleAdminOrRh,
  ],
  createUser
);

route.get(
  "/list",
  [validateFields, validateJWT, validateRoleAdminOrRh],
  listUsers
);

route.delete(
  "/delete/:id",
  [
    check("id", "Invalid id")
      .isMongoId()
      .if(check("id").isMongoId())
      .custom(validateExistingUser),
    validateFields,
    validateJWT,
    validateRoleAdminOrRh,
    validateUser
  ],
  deleteUser
);

route.put(
  "/update/:id",
  [
    check("id", "Invalid id")
      .isMongoId()
      .if(check("id").isMongoId())
      .custom(validateExistingUser),
    validateFields,
    validateJWT,
    validateRoleAdminOrRh,
    validateUser
  ],
  updateUser
);

module.exports = route;
