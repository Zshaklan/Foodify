import { useContext, useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";
import { CartContext } from "../store/CartContext.jsx";
import Button from "./UI/Button.jsx";
import { currencyFormatter } from "../utils/formatting.js";
import useHttp from "../hooks/useHttp";
import "./MealDescription.css";

export default function MealDescription() {
  const cartCtx = useContext(CartContext);
  const { id } = useParams();

  const config = useMemo(() => ({ method: "GET" }), []);

  const { sendRequest, data, isLoading, error } = useHttp(
    `/api/meals/${id}`,
    config
  );

  const meal = data?.meal;

  useEffect(() => {
    if (id) {
      sendRequest();
    }
  }, [id, sendRequest]);

  function handleAddMealToCart() {
    if (meal) cartCtx.addItem(meal);
  }

  if (isLoading) return <p className="center">Loading meal...</p>;
  if (error) return <p className="center">Error: {error}</p>;
  if (!meal) return <p className="center">No meal found!</p>;

  return (
    <div className="meal-description">
      <div className="meal-image">
        <img src={`/${meal.image}`} alt={meal.name} />
      </div>
      <div className="meal-details">
        <h2>{meal.name}</h2>
        <p className="meal-price">{currencyFormatter.format(meal.price)}</p>
        <p className="meal-description-text">{meal.description}</p>
        <Button onClick={handleAddMealToCart}>Add to Cart</Button>
      </div>
    </div>
  );
}
