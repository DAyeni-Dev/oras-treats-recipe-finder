import { Link } from "react-router-dom";

 function LandingPage() {
  return (
    <div className="flex flex-col h-screen justify-between  overflow-hidden">
      <main className="flex flex-col items-center justify-center text-center ">
        <h1 className="text-5xl font-extrabold mb-8">
          Welcome to ORA's Treats
        </h1>
        <h2 className="text-sm font-light mb-4">Recipe Finder</h2>

        <p className="text-lg text-gray-700 max-w-2xl mb-4 line-height:1.625">
          At ORA’s Treats, we believe cooking should be fun, easy, and full of
          flavor! Whether you’re looking for everyday meals, party favorites,
          or creative new dishes, you’ll find recipes that bring joy to your
          table.
        </p>

        <p className="text-lg text-gray-700 max-w-2xl mb-4 line-height:1.625">
          Discover exciting recipes, upload your own special creations, generate
          meals from the ingredients you already have, plan weekly menus, and
          even create grocery lists. Cooking has never been this simple and enjoyable!
        </p>


        <p className="text-lg text-gray-700 max-w-2xl mb-4 line-height:1.625">
          From everyday cooking to special occasions, ORA’s Treats is here
          to make your kitchen a place of creativity and love.
        </p>
      </main>
    </div>
  );
}

export default LandingPage;