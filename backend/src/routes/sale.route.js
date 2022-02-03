const { Router } = require("express");
const { check } = require("express-validator");
const {
  createSale,
  listSales,
  deleteSale,
  updateSale,
} = require("../controller/sale.controller");
const { validateExistingSale } = require("../helpers/dbValidations");
const { validateFields } = require("../middlewares/validateFields");
const { validateRoleAdminOrSeller } = require("../middlewares/validateRoles");
const { validateJWT, validateUser } = require("../middlewares/validations");
const route = Router();

route.post(
  "/createSale",
  [
    validateJWT,
    validateUser,
    validateRoleAdminOrSeller,
    check("date")
      .if(check("date"))
      .isDate({ format: "DD-MM-YYYY" })
      .withMessage("The date format must be DD-MM-YYYY"),
    check("amount")
      .notEmpty()
      .withMessage("Amount required")
      .isNumeric()
      .withMessage("Amount only can be number type"),
    check("product").notEmpty().withMessage("Product required"),
    check("value")
      .if(check("value"))
      .isNumeric()
      .withMessage("Value only can be number type"),
    validateFields,
  ],
  createSale
);

route.get(
  "/listSales",
  [validateFields, validateJWT, validateRoleAdminOrSeller],
  listSales
);

route.delete(
  "/deleteSale/:id",
  [
    validateJWT,
    validateUser,
    validateRoleAdminOrSeller,
    check("id", "Invalid id")
      .isMongoId()
      .if(check("id").isMongoId())
      .custom(validateExistingSale),
    validateFields,
  ],
  deleteSale
);

route.put(
  "/updateSale/:id",
  [
    validateJWT,
    validateUser,
    validateRoleAdminOrSeller,
    check("id", "Invalid id")
      .isMongoId()
      .if(check("id").isMongoId())
      .custom(validateExistingSale),
    validateFields,
  ],
  updateSale
);

module.exports = route;
