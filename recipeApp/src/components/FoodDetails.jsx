import { useState, useEffect } from "react";
import styles from "./fooddetails.module.css";
import ItemList from "./ItemList";

export default function FoodDetails({ foodId }) {
  const [food, setFood] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const URL = `https://api.spoonacular.com/recipes/${foodId}/information`;
  const API_KEY = "b222ad74ccdd46c9a347ce91a2e3d777";
  useEffect(() => {
    async function fetchFood() {
      const response = await fetch(`${URL}?apiKey=${API_KEY}`);
      const data = await response.json();
      console.log(data);
      setFood(data);
      setIsLoading(false);
    }
    fetchFood();
  }, [foodId]);
  /* Changes whenever foodId changes*/

  return (
    <div>
      <div className={styles.recipeCard}>
        <h1 className={styles.recipeName}>{food.title}</h1>
        <img className={styles.recipeImage} src={food.image} alt="" />
        <div className={styles.recipeDetails}>
          <span>
            <strong>⌚️ {food.readyInMinutes} Minutes</strong>
          </span>
          <span>
            👨‍👩‍👧‍👦 <strong> Serves {food.servings} </strong>
          </span>
          <span>
            <strong>
              {" "}
              {food.vegetarian ? " 🥕 Vegetarian" : " 🍖 Non-Vegetarian"}{" "}
            </strong>
          </span>
          <span>
            <strong>{food.vegan ? "🥑 Vegan" : ""} </strong>
          </span>
        </div>
        <div>
          ${" "}
          <span>
            <strong>{food.pricePerServing / 100} Per Serving </strong>
          </span>
        </div>
      </div>
      <div>
        <h2>Ingredients</h2>
        <ItemList food = {food}/>
        <h2>Instructions</h2>
        <div className={styles.recipeInstructions}>
          <ol>
            {isLoading ? (
              <p>Loading...</p>
            ) : (
              food.analyzedInstructions[0].steps.map((step) => (
                <li>{step.step}</li>
              ))
            )}
          </ol>
        </div>
      </div>
    </div>
  );
}
