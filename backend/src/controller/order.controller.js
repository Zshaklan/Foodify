import mealModel from "../model/meals.model.js";
import orderModel from "../model/order.model.js";

// Save user orders
export const saveUserOrder = async (req, res) => {
  try {
    const { items, customer } = req.body;

    console.log(items[0]);

    // 1. Basic validation
    if (!items || !Array.isArray(items) || items.length === 0) {
      return res
        .status(400)
        .json({ message: "Items are required and must be a non-empty array" });
    }

    if (
      !customer ||
      !customer.name ||
      !customer.street ||
      !customer.postalCode ||
      !customer.city
    ) {
      return res
        .status(400)
        .json({ message: "Customer details are incomplete or missing" });
    }

    if (!req.user || !req.user.id) {
      return res.status(401).json({ message: "User not authenticated" });
    }

    // 2. Validate meal IDs and get current prices from database
    const orderItems = [];
    let totalAmount = 0;

    for (const item of items) {
      console.log(item);
      const meal = await mealModel.findOne({ _id: item._id });

      if (!meal) {
        return res.status(404).json({
          message: `Meal with ID ${item._id || item.meal} not found`,
        });
      }

      // Use current price from database (more secure)
      const price = parseFloat(meal.price);
      const quantity = parseInt(item.quantity);

      if (isNaN(quantity) || quantity < 1) {
        return res.status(400).json({
          message: `Invalid quantity for meal ${meal.name}`,
        });
      }

      orderItems.push({
        meal: meal._id,
        quantity: quantity,
        price: price,
      });

      totalAmount += price * quantity;

      // 3. Create and save order
      const newOrder = await orderModel.create({
        user: req.user.id,
        items: orderItems,
        deliveryAddress: {
          name: customer.name,
          street: customer.street,
          postalCode: customer.postalCode,
          city: customer.city,
        },
        totalAmount: parseFloat(totalAmount.toFixed(2)),
      });

      // 4. Populate order details for response
      await newOrder.populate("user", "fullName email");
      await newOrder.populate("items.meal", "name description image isVeg");

      // 5. Send success response
      return res.status(201).json({
        message: "Order placed successfully",
        order: newOrder,
      });
    }
  } catch (error) {
    console.error("Error saving order:", error.message);
    return res.status(500).json({
      message: "Failed to save order. Please try again later.",
    });
  }
};
