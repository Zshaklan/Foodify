import MealItem from "./MealItem";
import useHttp from "../hooks/useHttp";
import Error from "./Error.jsx";
import { useState } from "react";
import Button from "./UI/Button.jsx";
import FilterMeals from "./filters/FilterMeals.jsx";

const requestConfig = {};
const mealsPerPage = 10;

export default function Meals() {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [availableMeals, setAvailableMeals] = useState([]);
  const { data, isLoading, error } = useHttp(
    `http://localhost:5000/api/meals?page=${currentPage}&limit=${mealsPerPage}`,
    requestConfig,
    []
  );

  const totalMeals = data?.total || 0;
  const totalPages = data ? Math.ceil(totalMeals / mealsPerPage) : 1;

  // Handle page change
  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  if (isLoading) {
    return <p className="center">Fetching Meals...</p>;
  }

  if (error) {
    return <Error title="Failed to fetch" message={error} />;
  }

  return (
    <section className="meals-section">
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search meals..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {isLoading && <p>Loading meals...</p>}
      {error && <p>Error: {error}</p>}
      {!isLoading && !error && availableMeals.length === 0 && (
        <p className="center">No meals found!</p>
      )}

      <FilterMeals
        meals={data.meals}
        setAvailableMeals={setAvailableMeals}
        searchTerm={searchTerm}
      />

      <ul id="meals">
        {availableMeals.map((meal) => (
          <MealItem key={meal.id} meal={meal} />
        ))}
      </ul>

      {totalPages > 1 && (
        <div className="pagination">
          <Button onClick={handlePrevPage} disabled={currentPage === 1}>
            Previous
          </Button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <Button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
          >
            Next
          </Button>
        </div>
      )}
    </section>
  );
}
