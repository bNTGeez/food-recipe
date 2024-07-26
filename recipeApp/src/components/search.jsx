import { useEffect, useState } from 'react';
import styles from './search.module.css';

const URL = "https://api.spoonacular.com/recipes/complexSearch";
const API_KEY = "b222ad74ccdd46c9a347ce91a2e3d777";

export default function Search({foodData, setFoodData}){

    const [query, setQuery] = useState("pizza");
    useEffect(()=>{
        async function fetchFood(){ 
            const response = await fetch(`${URL}?query=${query}&apiKey=${API_KEY}`);
            const data = await response.json();
            console.log(data.results);
            setFoodData(data.results);
        }
        fetchFood();
    }, [query])


    return (
        <div className = {styles.searchContainer} >
            <input 
                className = {styles.input}
                value = {query} 
                onChange = { (e) => setQuery(e.target.value)}
                type = "text" 
            />
        </div>
    )
}