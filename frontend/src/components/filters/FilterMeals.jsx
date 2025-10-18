import { useState, useEffect } from "react";
import "./FilterMeals.css";

const FilterMeals = ({ meals, setAvailableMeals, searchTerm }) => {
  const [priceFilter, setPriceFilter] = useState("All");
  const [dietFilter, setDietFilter] = useState("All");

  useEffect(() => {
    let filtered = meals;

    // Search filter
    if (searchTerm.trim() !== "" && meals) {
      filtered = filtered.filter((meal) =>
        meal.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Diet filter
    if (dietFilter !== "All") {
      filtered = filtered.filter(
        (meal) =>
          (dietFilter === "Veg" && meal.isVeg) ||
          (dietFilter === "Non-Veg" && !meal.isVeg)
      );
    }

    // Price filter
    if (priceFilter !== "All") {
      filtered = filtered.filter((meal) => {
        const price = parseFloat(meal.price);
        if (priceFilter === "<10") return price < 10;
        if (priceFilter === "10-15") return price >= 10 && price <= 15;
        if (priceFilter === ">15") return price > 15;
        return true;
      });
    }

    // Update the meals in parent
    setAvailableMeals(filtered || []);
  }, [priceFilter, dietFilter, meals, setAvailableMeals, searchTerm]);

  return (
    <div className="filters">
      <select
        value={priceFilter}
        onChange={(e) => setPriceFilter(e.target.value)}
      >
        <option value="All">All Prices</option>
        <option value="<10">Below ₹10</option>
        <option value="10-15">₹10 - ₹15</option>
        <option value=">15">Above ₹15</option>
      </select>

      <select
        value={dietFilter}
        onChange={(e) => setDietFilter(e.target.value)}
      >
        <option value="All">All Diets</option>
        <option value="Veg">Veg</option>
        <option value="Non-Veg">Non-Veg</option>
      </select>
    </div>
  );
};

export default FilterMeals;
