import React, { useState, useEffect } from 'react';
import { BiTrash, BiCheck, BiShoppingBag, BiArrowBack, BiPlus } from 'react-icons/bi';
import { Link } from 'react-router-dom';
import { useNotification } from '../context/NotificationContext';

function MarketBasket() {
  const { showNotification } = useNotification();
  const [shoppingList, setShoppingList] = useState([]);
  const [basketItemName, setBasketItemName] = useState("");
  const [basketItemMeasure, setBasketItemMeasure] = useState("");
  const [basketItemCategory, setBasketItemCategory] = useState("");

  useEffect(() => {
    const savedBasket = localStorage.getItem('marketBasket');
    if (savedBasket) {
      setShoppingList(JSON.parse(savedBasket));
    }
  }, []);

  const updateBasket = (newBasket) => {
    setShoppingList(newBasket);
    localStorage.setItem('marketBasket', JSON.stringify(newBasket));
  };

  const addItem = (e) => {
    e.preventDefault();
    if (!basketItemName.trim()) return;

    const newItem = {
      id: Date.now(),
      ingredient: basketItemName,
      measure: basketItemMeasure,
      recipe: basketItemCategory.trim() || "My Personal List",
      recipeId: "personal_entry",
      checked: false
    };

    const newBasket = [...shoppingList, newItem];
    updateBasket(newBasket);
    setBasketItemName("");
    setBasketItemMeasure("");
    showNotification(`Added ${basketItemName} to your basket!`);
  };

  const toggleItem = (id) => {
    const newBasket = shoppingList.map(item => 
      item.id === id ? { ...item, checked: !item.checked } : item
    );
    updateBasket(newBasket);
  };

  const removeItem = (id) => {
    const itemToRemove = shoppingList.find(item => item.id === id);
    const newBasket = shoppingList.filter(item => item.id !== id);
    updateBasket(newBasket);
    showNotification(`Removed ${itemToRemove?.ingredient || 'item'} from basket`, 'error');
  };

  const clearBasket = () => {
    if (window.confirm('Are you sure you want to clear your basket?')) {
      updateBasket([]);
      showNotification('Basket cleared', 'error');
    }
  };

  const removeChecked = () => {
    if (window.confirm('Remove all checked items?')) {
      const newBasket = shoppingList.filter(item => !item.checked);
      updateBasket(newBasket);
      showNotification('Checked items removed', 'error');
    }
  };

  const shareList = () => {
    const text = shoppingList.map(item => 
      `${item.checked ? '[x]' : '[ ]'} ${item.ingredient} ${item.measure ? `(${item.measure})` : ''} - ${item.recipe}`
    ).join('\n');
    
    navigator.clipboard.writeText(`My Market Basket:\n\n${text}`)
      .then(() => showNotification('List copied to clipboard!', 'info'))
      .catch(err => console.error('Failed to copy:', err));
  };
  
  const groupedItems = shoppingList.reduce((acc, item) => {
    if (!acc[item.recipe]) {
      acc[item.recipe] = [];
    }
    acc[item.recipe].push(item);
    return acc;
  }, {});

  return (
    <div className="min-h-screen bg-gray-50 pb-12">
      
      <div className="bg-[#005c29] py-12 px-6 text-center relative overflow-hidden">
        <div className="absolute top-0 left-0 w-32 h-32 bg-[#8fbf1a] rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute top-0 right-0 w-32 h-32 bg-[#f93270] rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>

        <div className="relative z-10 max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-chewy text-white mb-4 tracking-wide">
            Your <span className="text-[#f93270]">Market</span> <span className="text-[#8fbf1a]">Basket</span>
          </h1>
          <p className="text-white/80 text-lg max-w-2xl mx-auto">
            Get ready to cook! Here are the ingredients you need.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-8">
        
        <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 mb-8">
          <h3 className="font-bold text-gray-700 mb-4 flex items-center gap-2">
            <BiPlus className="text-[#f93270]" /> Add Your Own Item
          </h3>
          <form onSubmit={addItem} className="flex flex-col md:flex-row gap-4">
            <input
              type="text"
              placeholder="List Name (e.g., Office Party)"
              value={basketItemCategory}
              onChange={(e) => setBasketItemCategory(e.target.value)}
              className="md:w-64 px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8fbf1a]"
            />
            <input
              type="text"
              placeholder="Item name (e.g., Milk)"
              value={basketItemName}
              onChange={(e) => setBasketItemName(e.target.value)}
              className="flex-1 px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8fbf1a]"
            />
            <input
              type="text"
              placeholder="Amount (optional)"
              value={basketItemMeasure}
              onChange={(e) => setBasketItemMeasure(e.target.value)}
              className="md:w-48 px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8fbf1a]"
            />
            <button 
              type="submit"
              disabled={!basketItemName.trim()}
              className="px-6 py-2 bg-[#005c29] text-white font-bold rounded-lg hover:bg-[#004a21] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Add Item
            </button>
          </form>
        </div>

        {shoppingList.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl shadow-lg border border-gray-100">
            <div className="text-6xl mb-6 text-[#8fbf1a]">🧺</div>
            <h3 className="text-2xl font-bold text-gray-700 mb-3">Your basket is empty</h3>
            <p className="text-gray-500 mb-8">Go explore some treats and add ingredients here!</p>
            <Link 
              to="/treats" 
              className="inline-flex items-center gap-2 px-8 py-3 bg-[#f93270] text-white rounded-full font-bold hover:bg-[#d6255b] transition-all transform hover:scale-105 shadow-lg"
            >
              <BiShoppingBag /> Browse Treats
            </Link>
          </div>
        ) : (
          <>
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
              <div className="text-gray-600 font-medium">
                {shoppingList.filter(i => i.checked).length} / {shoppingList.length} items collected
              </div>
              
              <div className="flex items-center gap-3">
                <button 
                  onClick={shareList}
                  className="text-[#005c29] hover:text-[#004a21] font-bold text-sm flex items-center gap-1 px-4 py-2 bg-[#8fbf1a]/10 hover:bg-[#8fbf1a]/20 rounded-full transition-colors"
                >
                  <BiShoppingBag /> Share List
                </button>
                
                {shoppingList.some(i => i.checked) && (
                  <button 
                    onClick={removeChecked}
                    className="text-orange-500 hover:text-orange-700 font-bold text-sm flex items-center gap-1 px-4 py-2 hover:bg-orange-50 rounded-full transition-colors"
                  >
                    <BiCheck /> Clear Checked
                  </button>
                )}

                <button 
                  onClick={clearBasket}
                  className="text-red-500 hover:text-red-700 font-bold text-sm flex items-center gap-1 px-4 py-2 hover:bg-red-50 rounded-full transition-colors"
                >
                  <BiTrash /> Clear All
                </button>
              </div>
            </div>

            <div className="space-y-6">
              {Object.entries(groupedItems).map(([recipe, items]) => (
                <div key={recipe} className="bg-white rounded-2xl shadow-md overflow-hidden border border-gray-100">
                  <div className="bg-[#f0fdf4] px-6 py-3 border-b border-[#8fbf1a]/20 flex justify-between items-center">
                    <h3 className="font-bold text-[#005c29] text-lg">{recipe}</h3>
                    <span className="text-xs font-bold bg-[#8fbf1a] text-white px-2 py-1 rounded-full">
                      {items.length} items
                    </span>
                  </div>
                  <div className="divide-y divide-gray-100">
                    {items.map(item => (
                      <div 
                        key={item.id} 
                        className={`px-6 py-4 flex items-center gap-4 transition-colors hover:bg-gray-50 cursor-pointer ${
                          item.checked ? 'bg-gray-50' : ''
                        }`}
                        onClick={() => toggleItem(item.id)}
                      >
                        <div className={`
                          w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all
                          ${item.checked 
                            ? 'bg-[#8fbf1a] border-[#8fbf1a] text-white' 
                            : 'border-gray-300 text-transparent hover:border-[#8fbf1a]'
                          }
                        `}>
                          <BiCheck size={16} />
                        </div>
                        
                        <div className={`flex-1 ${item.checked ? 'opacity-50 line-through text-gray-400' : 'text-gray-700'}`}>
                          <span className="font-bold">{item.ingredient}</span>
                          {item.measure && <span className="text-gray-500 ml-2 text-sm">- {item.measure}</span>}
                        </div>

                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            removeItem(item.id);
                          }}
                          className="text-gray-300 hover:text-red-500 transition-colors p-2"
                          title="Remove item"
                        >
                          <BiTrash />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default MarketBasket;
