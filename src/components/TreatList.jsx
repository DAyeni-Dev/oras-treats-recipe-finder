import { useState } from "react";
import TreatCard from "./TreatCard";

function TreatList({ treats }) {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredTreats = treats.filter((treat) =>
    treat.strMeal.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="px-6">
      
      <div className="flex flex-col items-center mt-8 mb-10">
        <h2 className="text-2xl font-bold mb-4">Find Your Treat </h2>
        <input
          type="text"
          placeholder="Search treats..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-[32rem] max-w-full px-6 py-3 text-lg border
           rounded-xl shadow-md focus:outline-none "
        />
      </div>

      
      {filteredTreats.length === 0 ? (
        <p className="text-center text-gray-600">No Treats Found </p>
      ) : (
        <div className="grid grid-cols-5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {filteredTreats.map((treat) => (
            <TreatCard key={treat.idMeal} treat={treat} />
          ))}
        </div>
      )}
    </div>
  );
}

export default TreatList;
