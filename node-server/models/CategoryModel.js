const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
  {
    //categoryId: {
    //type: Number,
    //unique: true,
    //default: 1,
    //},
    name: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      default: "default category description",
    },
    image: {
      type: String,
      default: "/images/tablets-category.png",
    },
    attrs: [{ key: { type: String }, value: [{ type: String }] }],
  },
  {
    timestamps: true,
  }
);
categorySchema.index({ description: 1 });
const Category = mongoose.model("Category", categorySchema.index({}));

module.exports = Category;
