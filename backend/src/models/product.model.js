const { Schema, model } = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const productSchema = new Schema(
  {
    img: {
      type: Array,
    },
    imageName: {
      type: Array,
    },
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      default: 0,
    },
    stock: {
      type: Boolean,
      required: true,
      default: true,
    },
  },
  { timestamps: true }
);

productSchema.plugin(mongoosePaginate);

productSchema.methods.saveUrlImg = function (fileName = []) {
  const url = process.env.URL_BASE;
  for (let i = 0; i < fileName.length; i++) {
    this.img.push(`${url}/public/${fileName[i]}`);
    this.imageName.push(fileName[i]);
  }
};

module.exports = model("product", productSchema);
