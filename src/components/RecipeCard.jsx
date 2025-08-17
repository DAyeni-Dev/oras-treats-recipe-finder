function RecipeCard({ meal }) {
    return (
        <div className="border rounded p-2 shadow w-40 mx auto">
            <img
                src={meal.strMealThumb}
                alt={meal.strMeal}
                className="w-32 h-32 object-cover mx-auto rounded"/>
                <h3 className="text-sm font-semibold mt-2 text-center">
                    {meal.strMeal}
                </h3>
        </div>
    );
}

export default RecipeCard