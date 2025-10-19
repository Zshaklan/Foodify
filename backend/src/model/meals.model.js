import mongoose from "mongoose";

const mealSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  isVeg: {
    type: Boolean,
    required: true,
  },
  id: {
    type: String,
    required: true,
  },
});

const Meals = new mongoose.model("meals", mealSchema);

export default Meals;
