const customerModel = require("../models/customer.model");
const productModel = require("../models/product.model");
const saleModel = require("../models/sale.model");
const userModel = require("../models/user.model");

const validateExistingEmail = async (email) => {
  const user = await userModel.findOne({ email });
  if (user) {
    throw new Error("Email already registered");
  }
};

const validateExistingUser = async (id) => {
  try {
    const user = await userModel.findById(id);
    if (!user) {
      throw new Error("User does not exist");
    }
  } catch (error) {
    throw new Error(error.message);
  }
};

const validateExistingEmailCustomer = async (email) => {
  const user = await customerModel.findOne({ email });
  if (user) {
    throw new Error("Email already registered");
  }
};

const validateExistingCustomer = async (id) => {
  try {
    const customer = await customerModel.findById(id);
    if (!customer) {
      throw new Error("Customer does not exist");
    }
  } catch (error) {
    throw new Error(error.message);
  }
};

const validateExistingProduct = async (id) => {
  try {
    const product = await productModel.findById(id);
    if (!product) {
      throw new Error("Product does not exist");
    }
  } catch (error) {
    throw new Error(error.message);
  }
};

const validateExistingSale = async (id) => {
  try {
    const sale = await saleModel.findById(id);
    if (!sale) {
      throw new Error("Sale does not exist");
    }
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = {
  validateExistingEmail,
  validateExistingUser,
  validateExistingCustomer,
  validateExistingEmailCustomer,
  validateExistingProduct,
  validateExistingSale,
};
