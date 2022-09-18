import mongoose from "mongoose";

const Schema = mongoose.Schema;

const foodRecipeSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      required: true,
    },
    imagePath: {
      type: String,
    },  
    imageFilename: {
      type: String,
    },
    ingredients: {
      type: Array,
      required: true,
    },
    procedure: {
      type: String,
      required: true,
    },
    isLiked: {
      type: Boolean,
    },
  },
  {
    timestamps: {
      createdAt: true,
      updatedAt: true,
    },
    toObject: {
      versionKey: false,
      transform(doc, ret) {
        ret.id = ret._id.toString();
        delete ret._id;
      },
    },
  },
)

export default mongoose.model("FoodRecipe", foodRecipeSchema, "foodRecipe")