import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { BiArrowBack, BiTime, BiDish, BiDrink, BiPlus, BiShoppingBag, BiCheck, BiHeart, BiSolidHeart } from 'react-icons/bi';
import drinksData from '../data/drinks.json';
import { useNotification } from '../context/NotificationContext';

function TreatDetails() {
  const { showNotification } = useNotification();
  const { id } = useParams();
  const [treat, setTreat] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isDrink, setIsDrink] = useState(false);
  const [addedItems, setAddedItems] = useState({});
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    setIsFavorite(favorites.some(fav => fav.id === id));
  }, [id]);

  const toggleFavorite = () => {
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    let newFavorites;

    if (isFavorite) {
      newFavorites = favorites.filter(fav => fav.id !== id);
      showNotification('Removed from Favorites', 'info');
    } else {
      const tags = [
        treat.strCategory, 
        isDrink ? treat.strGlass : treat.strArea,
        ...(treat.strTags ? treat.strTags.split(',') : [])
      ].filter(Boolean).slice(0, 3);

      const newFavorite = {
        id,
        title: treat.strMeal || treat.strDrink,
        image: treat.strMealThumb || treat.strDrinkThumb,
        tags
      };
      newFavorites = [...favorites, newFavorite];
      showNotification('Added to Favorites!');
    }

    localStorage.setItem('favorites', JSON.stringify(newFavorites));
    setIsFavorite(!isFavorite);
  };

  const addToBasket = (ingredient, measure) => {
    const newItem = {
      id: Date.now() + Math.random(),
      ingredient,
      measure,
      recipe: treat.strMeal || treat.strDrink,
      recipeId: id,
      checked: false
    };

    const currentBasket = JSON.parse(localStorage.getItem('marketBasket') || '[]');
    const newBasket = [...currentBasket, newItem];
    localStorage.setItem('marketBasket', JSON.stringify(newBasket));

    setAddedItems(prev => ({ ...prev, [ingredient]: true }));
    showNotification(`Added ${ingredient} to basket`);
    setTimeout(() => {
      setAddedItems(prev => ({ ...prev, [ingredient]: false }));
    }, 2000);
  };

  const getIngredients = (treatData) => {
    const ingredients = [];
    for (let i = 1; i <= 20; i++) {
      const ingredient = treatData[`strIngredient${i}`];
      const measure = treatData[`strMeasure${i}`];
      if (ingredient && ingredient.trim() !== "") {
        ingredients.push({
          id: Date.now() + Math.random() + i,
          ingredient,
          measure,
          recipe: treatData.strMeal || treatData.strDrink,
          recipeId: id,
          checked: false
        });
      }
    }
    return ingredients;
  };

  const addAllToBasket = () => {
    const ingredientsToAdd = getIngredients(treat);
    const currentBasket = JSON.parse(localStorage.getItem('marketBasket') || '[]');
    const newBasket = [...currentBasket, ...ingredientsToAdd];
    localStorage.setItem('marketBasket', JSON.stringify(newBasket));
    
    showNotification('All ingredients added to your Market Basket!');
  };

  useEffect(() => {
    setLoading(true);
    
    const localDrink = drinksData.find(d => d.id === id);
    
    if (localDrink) {
       const normalizedDrink = {
          idMeal: localDrink.id,
          strMeal: localDrink.name,
          strMealThumb: localDrink.image,
          strCategory: localDrink.category,
          strGlass: localDrink.glass,
          strInstructions: localDrink.preparation,
          strAlcoholic: localDrink.type || 'Alcoholic',
       };

       if (localDrink.ingredients) {
          localDrink.ingredients.forEach((ing, index) => {
             if (index < 20) {
                normalizedDrink[`strIngredient${index + 1}`] = ing.ingredient;
                normalizedDrink[`strMeasure${index + 1}`] = `${ing.amount || ''} ${ing.unit || ''}`.trim();
             }
          });
       }

       setTreat(normalizedDrink);
       setIsDrink(true);
       setLoading(false);
       return;
    }
    
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
      .then(res => res.json())
      .then(data => {
        if (data.meals) {
          setTreat(data.meals[0]);
          setIsDrink(false);
          setLoading(false);
        } else {
          setTreat(null);
          setLoading(false);
        }
      })
      .catch(err => {
        console.error("Error fetching meal details:", err);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 text-[#005c29]">
        <div className="animate-spin text-4xl">🍳</div>
      </div>
    );
  }

  if (!treat) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
        <h2 className="text-2xl font-bold text-gray-700 mb-4">Treat not found!</h2>
        <Link to="/treats" className="text-[#f93270] hover:underline">Back to Treats</Link>
      </div>
    );
  }

  const ingredientsList = treat ? getIngredients(treat) : [];

  const title = treat.strMeal || treat.strDrink;
  const image = treat.strMealThumb || treat.strDrinkThumb;
  const category = treat.strCategory;
  const areaOrGlass = isDrink ? treat.strGlass : treat.strArea;
  const instructions = treat.strInstructions;
  const youtube = treat.strYoutube;
  const alcoholic = isDrink ? treat.strAlcoholic : null;

  return (
    <div className="min-h-screen bg-gray-50 pb-12">
      <div className="h-[400px] w-full relative">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="absolute bottom-0 left-0 w-full p-8 bg-gradient-to-t from-black/80 to-transparent">
          <div className="max-w-4xl mx-auto text-white">
            <Link to="/treats" className="inline-flex items-center gap-2 text-white/80 hover:text-[#8fbf1a] mb-4 transition-colors">
              <BiArrowBack /> Back to Treats
            </Link>
            <div className="flex items-center gap-4 mb-2">
              <h1 className="text-4xl md:text-5xl font-chewy tracking-wide">{title}</h1>
              <button 
                onClick={toggleFavorite}
                className="p-3 bg-white/10 hover:bg-white/20 rounded-full backdrop-blur-sm transition-all transform hover:scale-110"
                title={isFavorite ? "Remove from Favorites" : "Add to Favorites"}
              >
                {isFavorite ? (
                  <BiSolidHeart className="text-[#f93270] text-2xl md:text-3xl" />
                ) : (
                  <BiHeart className="text-white text-2xl md:text-3xl" />
                )}
              </button>
            </div>
            
            <div className="flex flex-wrap items-center gap-4 md:gap-6 text-sm md:text-base mt-4">
              <span className="bg-[#f93270] px-3 py-1 rounded-full font-bold">{category}</span>
              
              <span className="flex items-center gap-1">
                {isDrink ? <BiDrink /> : <BiDish />} 
                {areaOrGlass}
              </span>

              {alcoholic && (
                 <span className={`px-3 py-1 rounded-full font-bold border ${alcoholic === 'Alcoholic' ? 'border-red-400 text-red-200' : 'border-green-400 text-green-200'}`}>
                   {alcoholic}
                 </span>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-10 grid md:grid-cols-3 gap-10">
        <div className="md:col-span-1">
          <div className="bg-white p-6 rounded-2xl shadow-lg border-t-4 border-[#8fbf1a]">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-[#005c29] flex items-center gap-2">
                 Treats List
              </h3>
              <button 
                onClick={addAllToBasket}
                className="text-xs font-bold bg-[#f93270] text-white px-3 py-1 rounded-full hover:bg-[#d6255b] transition-colors"
              >
                Add All
              </button>
            </div>
            <ul className="space-y-3">
              {ingredientsList.map((item, index) => (
                <li key={index} className="flex justify-between items-center text-sm border-b border-gray-100 pb-2 last:border-0 group">
                  <div className="flex-1">
                    <span className="font-medium text-gray-700 block">{item.ingredient}</span>
                    <span className="text-gray-500 text-xs">{item.measure}</span>
                  </div>
                  <button 
                    onClick={() => addToBasket(item.ingredient, item.measure)}
                    className={`
                      p-2 rounded-full transition-all duration-300
                      ${addedItems[item.ingredient] 
                        ? 'bg-[#8fbf1a] text-white' 
                        : 'bg-gray-100 text-gray-400 hover:bg-[#f93270] hover:text-white'
                      }
                    `}
                    title="Add to Basket"
                    disabled={addedItems[item.ingredient]}
                  >
                    {addedItems[item.ingredient] ? <BiCheck /> : <BiPlus />}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="md:col-span-2">
          <div className="bg-white p-8 rounded-2xl shadow-lg border-t-4 border-[#f93270]">
            <h3 className="text-2xl font-bold text-[#005c29] mb-6 font-chewy tracking-wide">
               How to treat yourself
            </h3>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              {instructions.split('\r\n').filter(Boolean).map((step, index) => (
                <p key={index} className="mb-4 last:mb-0">
                  {step}
                </p>
              ))}
            </div>
            {youtube && (
              <div className="mt-8 pt-6 border-t border-gray-100">
                <a 
                  href={youtube} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-red-600 hover:text-red-700 font-bold"
                >
                   Watch on YouTube
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default TreatDetails;
