import Meals from "../model/meals.model.js";

export const getAllMeals = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    // Calculate the number of documents to skip
    const skip = (page - 1) * limit;

    const meals = await Meals.find().skip(skip).limit(limit);

    if (meals.length === 0) {
      return res.status(404).json({ message: "No meals to fetch!" });
    }

    const total = await Meals.countDocuments();

    res.status(200).json({
      message: "All meals fetched successfully!",
      page,
      limit,
      total,
      meals,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Server error while fetching meals" });
  }
};

export const getMealById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: "Meal ID is required." });
    }

    const meal = await Meals.findById(id);

    if (!meal) {
      return res.status(404).json({ message: "Meal not found." });
    }

    return res.status(200).json({ message: "Meal fetched successfully", meal });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
