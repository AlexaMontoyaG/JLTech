const { Router } = require("express");
const { check } = require("express-validator");
const {
  createCustomer,
  listCustomers,
  deleteCustomer,
  updateCustomer,
} = require("../controller/customer.controller");
const {
  validateExistingCustomer,
  validateExistingEmailCustomer,
} = require("../helpers/dbValidations");
const { validateFields } = require("../middlewares/validateFields");
const {
  validateRoleAdminOrSellerOrRh,
} = require("../middlewares/validateRoles");
const { validateJWT, validateUser } = require("../middlewares/validations");
const route = Router();

route.post(
  "/createCustomer",
  [
    check("email")
      .isEmail()
      .withMessage("Invalid email")
      .notEmpty()
      .withMessage("Email required")
      .custom(validateExistingEmailCustomer),
    check("name").notEmpty().withMessage("Name required"),
    check("contact").notEmpty().withMessage("Contact required"),
    validateFields,
    validateJWT,
    validateRoleAdminOrSellerOrRh,
  ],
  createCustomer
);

route.get(
  "/listCustomers",
  [validateFields, validateJWT, validateRoleAdminOrSellerOrRh],
  listCustomers
);

route.delete(
  "/deleteCustomer/:id",
  [
    check("id", "Invalid id")
      .isMongoId()
      .if(check("id").isMongoId().isMongoId())
      .custom(validateExistingCustomer),
    validateFields,
    validateJWT,
    validateRoleAdminOrSellerOrRh,
    validateUser
  ],
  deleteCustomer
);

route.put(
  "/updateCustomer/:id",
  [
    check("id", "Invalid id")
      .isMongoId()
      .if(check("id").isMongoId())
      .custom(validateExistingCustomer),
    validateFields,
    validateJWT,
    validateRoleAdminOrSellerOrRh,
    validateUser
  ],
  updateCustomer
);

module.exports = route;
