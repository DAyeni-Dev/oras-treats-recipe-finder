import { Link } from "react-router-dom";

function TreatCard({ treat }) {
  return (
    <Link to={`/treat/${treat.idMeal}`}>
      <div className="border rounded-lg p-2 shadow-sm w-40 hover:scale-105 transition mx-auto">
        <img
          src={treat.strMealThumb}
          alt={treat.strMeal}
          className="w-full h-28 object-cover rounded"
        />
        <h3 className="text-sm font-semibold mt-2 text-center text-gray-800 line-clamp-2">
          {treat.strMeal}
        </h3>
      </div>
    </Link>
  );
}

export default TreatCard;
