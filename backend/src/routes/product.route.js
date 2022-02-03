const { Router } = require("express");
const { check } = require("express-validator");
const {
  createProduct,
  listProducts,
  deleteProduct,
  updateProduct,
} = require("../controller/product.controller");
const { validateExistingProduct } = require("../helpers/dbValidations");
const { validateFields } = require("../middlewares/validateFields");
const { validateRoleAdminOrGrocer } = require("../middlewares/validateRoles");
const { validateJWT, validateUser } = require("../middlewares/validations");
const route = Router();

route.post(
  "/createProduct",
  [
    validateJWT,
    validateUser,
    validateRoleAdminOrGrocer,
    check("name").notEmpty().withMessage("Name required"),
    check("price")
      .notEmpty()
      .withMessage("Price required")
      .isNumeric()
      .withMessage("Price only can be number type"),
    validateFields,
  ],
  createProduct
);

route.get(
  "/listProducts",
  [validateFields, validateJWT, validateRoleAdminOrGrocer],
  listProducts
);

route.delete(
  "/deleteProduct/:id",
  [
    validateJWT,
    validateUser,
    validateRoleAdminOrGrocer,
    check("id", "Invalid id")
      .isMongoId()
      .if(check("id").isMongoId())
      .custom(validateExistingProduct),
    validateFields,
  ],
  deleteProduct
);

route.put(
  "/updateProduct/:id",
  [
    validateJWT,
    validateUser,
    validateRoleAdminOrGrocer,
    check("id", "Invalid id")
      .isMongoId()
      .if(check("id").isMongoId())
      .custom(validateExistingProduct),
    validateFields,
  ],
  updateProduct
);

module.exports = route;
