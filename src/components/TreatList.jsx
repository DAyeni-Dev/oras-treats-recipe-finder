import TreatCard from "./TreatCard";

function TreatList({ treats }) {
  if (!treats || treats.length === 0) {
    return <p className="text-center text-gray-600">No Treats Found 🍽</p>;
  }

  return (
    <div className="grid grid-cols-5 sm:grid-cols-4 md:grid-cols-3 gap-50">
      {treats.map((treat) => (
        <TreatCard key={treat.idMeal} treat={treat} />
      ))}
    </div>
  );
}

export default TreatList;
