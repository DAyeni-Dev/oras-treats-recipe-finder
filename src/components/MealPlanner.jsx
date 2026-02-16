import React, { useState, useEffect } from 'react';
import { BiCalendar, BiChevronLeft, BiChevronRight, BiTrash, BiPlus, BiShoppingBag } from 'react-icons/bi';
import { Link } from 'react-router-dom';
import { useNotification } from '../context/NotificationContext';
import { motion, AnimatePresence } from 'framer-motion';

const MEAL_TYPES = ['Breakfast', 'Lunch', 'Dinner', 'Snack', 'Fruits'];

function MealPlanner() {
  const { showNotification } = useNotification();
  const [view, setView] = useState('weekly'); 
  const [currentDate, setCurrentDate] = useState(new Date());
  const [mealPlan, setMealPlan] = useState({});
  const [selectedDay, setSelectedDay] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingMeal, setEditingMeal] = useState(null);
  const [newMeal, setNewMeal] = useState({ type: 'Breakfast', name: '', recipeId: '' });

  
  const getAvailableTypes = (date, excludeType = null) => {
    if (!date) return MEAL_TYPES;
    const dateKey = formatDateKey(date);
    const existingMeals = mealPlan[dateKey] || [];
    const usedTypes = existingMeals.map(m => m.type).filter(t => t !== excludeType);
    return MEAL_TYPES.filter(type => !usedTypes.includes(type));
  };

  
  useEffect(() => {
    if (showAddModal && selectedDay) {
      if (editingMeal) {
        setNewMeal({ type: editingMeal.type, name: editingMeal.name, recipeId: editingMeal.recipeId || '' });
      } else {
        const available = getAvailableTypes(selectedDay);
        if (available.length > 0) {
          setNewMeal(prev => ({ ...prev, type: available[0], name: '', recipeId: '' }));
        }
      }
    }
  }, [showAddModal, selectedDay, mealPlan, editingMeal]);

 
  const isPastDay = (date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const checkDate = new Date(date);
    checkDate.setHours(0, 0, 0, 0);
    return checkDate < today;
  };

  
  const isDayFull = (date) => {
    return getAvailableTypes(date).length === 0;
  };

  
  useEffect(() => {
    const savedPlan = localStorage.getItem('mealPlan');
    if (savedPlan) {
      setMealPlan(JSON.parse(savedPlan));
    }
  }, []);

  const saveMealPlan = (newPlan) => {
    setMealPlan(newPlan);
    localStorage.setItem('mealPlan', JSON.stringify(newPlan));
  };

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const days = new Date(year, month + 1, 0).getDate();
    return Array.from({ length: days }, (_, i) => new Date(year, month, i + 1));
  };

  const getDaysInWeek = (date) => {
    const startOfWeek = new Date(date);
    const day = startOfWeek.getDay();
    const diff = startOfWeek.getDate() - day + (day === 0 ? -6 : 1); 
    startOfWeek.setDate(diff);
    
    return Array.from({ length: 7 }, (_, i) => {
      const d = new Date(startOfWeek);
      d.setDate(startOfWeek.getDate() + i);
      return d;
    });
  };

  const formatDateKey = (date) => {
    return date.toISOString().split('T')[0];
  };

  const handlePrev = () => {
    const newDate = new Date(currentDate);
    if (view === 'weekly') newDate.setDate(newDate.getDate() - 7);
    else if (view === 'monthly') newDate.setMonth(newDate.getMonth() - 1);
    else newDate.setDate(newDate.getDate() - 1);
    setCurrentDate(newDate);
  };

  const handleNext = () => {
    const newDate = new Date(currentDate);
    if (view === 'weekly') newDate.setDate(newDate.getDate() + 7);
    else if (view === 'monthly') newDate.setMonth(newDate.getMonth() + 1);
    else newDate.setDate(newDate.getDate() + 1);
    setCurrentDate(newDate);
  };

  const handleAddMeal = (e) => {
    e.preventDefault();
    if (!selectedDay || !newMeal.name) return;

    const dateKey = formatDateKey(selectedDay);
    const currentDayMeals = mealPlan[dateKey] || [];
    
    let updatedPlan;
    if (editingMeal) {
      updatedPlan = {
        ...mealPlan,
        [dateKey]: currentDayMeals.map(m => m.id === editingMeal.id ? { ...newMeal, id: editingMeal.id } : m)
      };
      showNotification('Meal updated!');
    } else {
      updatedPlan = {
        ...mealPlan,
        [dateKey]: [...currentDayMeals, { ...newMeal, id: Date.now() }]
      };
      showNotification('Meal added to plan!');
    }

    saveMealPlan(updatedPlan);
    setShowAddModal(false);
    setEditingMeal(null);
    setNewMeal({ type: 'Breakfast', name: '', recipeId: '' });
  };

  const removeMeal = (dateKey, mealId) => {
    if (window.confirm('Remove this meal?')) {
      const currentDayMeals = mealPlan[dateKey] || [];
      const updatedPlan = {
        ...mealPlan,
        [dateKey]: currentDayMeals.filter(m => m.id !== mealId)
      };
      saveMealPlan(updatedPlan);
      showNotification('Meal removed', 'info');
    }
  };

  const renderDailyView = () => {
    const dateKey = formatDateKey(currentDate);
    const meals = mealPlan[dateKey] || [];
    const mealTypes = MEAL_TYPES;
    const past = isPastDay(currentDate);
    const full = isDayFull(currentDate);
    const isToday = formatDateKey(new Date()) === dateKey;

    return (
      <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="p-6 bg-[#005c29] text-white flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold">
              {currentDate.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
            </h2>
            <div className="mt-1 flex items-center gap-2 text-xs font-semibold uppercase tracking-wide">
              {isToday && (
                <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-white/10 border border-white/30">
                  Today
                </span>
              )}
              {past && !isToday && (
                <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-white/10 border border-white/30">
                  Past day (locked)
                </span>
              )}
              {!past && full && (
                <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-white/10 border border-white/30">
                  All meal slots filled
                </span>
              )}
            </div>
          </div>
          {!past && !full && (
            <button 
              onClick={() => { setSelectedDay(currentDate); setEditingMeal(null); setShowAddModal(true); }}
              className="bg-[#f93270] hover:bg-[#d6255b] text-white p-2 rounded-full transition-colors"
            >
              <BiPlus size={24} />
            </button>
          )}
        </div>
        <div className="p-6 space-y-6">
          {mealTypes.map(type => (
            <div key={type} className="border-b border-gray-100 last:border-0 pb-4 last:pb-0">
              <h3 className="text-[#8fbf1a] font-bold uppercase text-sm mb-3 tracking-wider">{type}</h3>
              <div className="space-y-3">
                {meals.filter(m => m.type === type).length > 0 ? (
                  meals.filter(m => m.type === type).map(meal => (
                    <div key={meal.id} className="flex justify-between items-center bg-gray-50 p-3 rounded-lg group hover:bg-gray-100 transition-colors">
                      <span className="font-medium text-gray-700">{meal.name}</span>
                      {!past && (
                        <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button 
                            onClick={() => { setSelectedDay(currentDate); setEditingMeal(meal); setShowAddModal(true); }}
                            className="text-[#005c29] hover:text-[#8fbf1a]"
                          >
                            <span className="text-xs font-bold">Edit</span>
                          </button>
                          <button 
                            onClick={() => removeMeal(dateKey, meal.id)}
                            className="text-red-400 hover:text-red-600"
                          >
                            <BiTrash size={18} />
                          </button>
                        </div>
                      )}
                    </div>
                  ))
                ) : (
                  <p className="text-gray-400 text-sm italic">No meals planned</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderWeeklyView = () => {
    const days = getDaysInWeek(currentDate);
    return (
      <div className="grid grid-cols-1 md:grid-cols-7 gap-4">
        {days.map(day => {
          const dateKey = formatDateKey(day);
          const meals = mealPlan[dateKey] || [];
          const isToday = formatDateKey(new Date()) === dateKey;
          const past = isPastDay(day);
          const full = isDayFull(day);

          return (
            <div key={dateKey} className={`bg-white rounded-xl shadow-sm border ${isToday ? 'border-[#f93270] ring-2 ring-[#f93270]/10' : 'border-gray-100'} overflow-hidden flex flex-col h-full min-h-[300px]`}>
              <div className={`p-3 text-center ${isToday ? 'bg-[#f93270] text-white' : 'bg-gray-50 text-gray-700'}`}>
                <div className="text-xs uppercase font-bold opacity-80">{day.toLocaleDateString('en-US', { weekday: 'short' })}</div>
                <div className="text-xl font-bold">{day.getDate()}</div>
              </div>
              <div className="p-3 flex-1 flex flex-col gap-2 overflow-y-auto">
                {meals.map(meal => (
                  <div key={meal.id} className="bg-[#f0fdf4] border border-[#8fbf1a]/20 p-2 rounded text-xs group relative">
                    <div className="font-bold text-[#005c29] mb-1">{meal.type}</div>
                    <div className="text-gray-700 truncate pr-4" title={meal.name}>{meal.name}</div>
                    {!past && (
                      <div className="absolute top-1 right-1 flex flex-col gap-1 opacity-0 group-hover:opacity-100 transition-opacity bg-[#f0fdf4] rounded shadow-sm p-0.5">
                        <button 
                          onClick={() => { setSelectedDay(day); setEditingMeal(meal); setShowAddModal(true); }}
                          className="text-[#005c29] hover:text-[#8fbf1a]"
                        >
                          <span className="text-[10px] font-bold">Edit</span>
                        </button>
                        <button 
                          onClick={() => removeMeal(dateKey, meal.id)}
                          className="text-red-400 hover:text-red-600"
                        >
                          <BiTrash size={12} />
                        </button>
                      </div>
                    )}
                  </div>
                ))}
                {!past && !full && (
                  <button 
                    onClick={() => { setSelectedDay(day); setEditingMeal(null); setShowAddModal(true); }}
                    className="mt-auto w-full py-2 text-gray-400 hover:text-[#005c29] hover:bg-gray-50 rounded border border-dashed border-gray-200 hover:border-[#005c29] transition-colors text-xs flex items-center justify-center gap-1"
                  >
                    <BiPlus /> Add
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  const renderMonthlyView = () => {
    const days = getDaysInMonth(currentDate);
    const startOffset = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay(); // 0 (Sun) - 6 (Sat)
    const offset = startOffset === 0 ? 6 : startOffset - 1; // Adjust for Monday start

    return (
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <div className="grid grid-cols-7 gap-2 mb-4 text-center">
          {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(d => (
            <div key={d} className="font-bold text-gray-400 text-sm uppercase">{d}</div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-2">
          {Array.from({ length: offset }).map((_, i) => (
            <div key={`empty-${i}`} className="aspect-square bg-gray-50 rounded-lg opacity-50"></div>
          ))}
          {days.map(day => {
            const dateKey = formatDateKey(day);
            const meals = mealPlan[dateKey] || [];
            const isToday = formatDateKey(new Date()) === dateKey;
            const past = isPastDay(day);
            const full = isDayFull(day);
            const canAdd = !past && !full;
            
            return (
              <div 
                key={dateKey}
                onClick={() => { 
                  setSelectedDay(day); 
                  if (view === 'monthly' && meals.length > 0) {
                    setView('daily');
                    setCurrentDate(day);
                  } else if (canAdd) {
                    setEditingMeal(null);
                    setShowAddModal(true); 
                  }
                }}
                className={`aspect-square rounded-lg p-2 relative transition-all ${
                  canAdd || meals.length > 0 ? 'cursor-pointer hover:ring-2 hover:ring-[#8fbf1a] hover:bg-white hover:shadow-md' : 'cursor-default opacity-60'
                } ${
                  isToday ? 'bg-[#f93270] text-white' : 'bg-gray-50 text-gray-700'
                }`}
              >
                <span className={`font-bold text-sm ${isToday ? 'text-white' : 'text-gray-500'}`}>{day.getDate()}</span>
                {meals.length > 0 && (
                  <div className="mt-1 flex flex-col gap-1 overflow-hidden">
                    {meals.slice(0, 2).map(m => (
                      <div key={m.id} className="text-[8px] truncate bg-white/50 px-1 rounded text-[#005c29]">
                        {m.name}
                      </div>
                    ))}
                    {meals.length > 2 && <div className="text-[8px] text-center font-bold">+{meals.length - 2} more</div>}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-12">
      <div className="bg-[#005c29] py-10 px-6 text-center relative overflow-hidden">
        <div className="absolute top-0 left-0 w-32 h-32 bg-[#8fbf1a] rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute top-0 right-0 w-32 h-32 bg-[#f93270] rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        
        <div className="relative z-10 max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-chewy text-white mb-2 tracking-wide">
            Treat <span className="text-[#8fbf1a]">Map</span>
          </h1>
          <p className="text-white/80 text-lg">Plan your culinary journey.</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <div className="flex bg-white rounded-full p-1 shadow-md">
            {['daily', 'weekly', 'monthly'].map(v => (
              <button
                key={v}
                onClick={() => setView(v)}
                className={`px-6 py-2 rounded-full text-sm font-bold capitalize transition-all ${
                  view === v ? 'bg-[#005c29] text-white shadow-sm' : 'text-gray-500 hover:text-[#005c29]'
                }`}
              >
                {v}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-4 bg-white px-4 py-2 rounded-full shadow-md">
            <button onClick={handlePrev} className="p-2 hover:bg-gray-100 rounded-full text-gray-600">
              <BiChevronLeft size={24} />
            </button>
            <span className="font-bold text-gray-700 min-w-[150px] text-center">
              {view === 'daily' && currentDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
              {view === 'weekly' && `Week of ${getDaysInWeek(currentDate)[0].toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`}
              {view === 'monthly' && currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
            </span>
            <button onClick={handleNext} className="p-2 hover:bg-gray-100 rounded-full text-gray-600">
              <BiChevronRight size={24} />
            </button>
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={view + currentDate.toISOString()}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
          >
            {view === 'daily' && renderDailyView()}
            {view === 'weekly' && renderWeeklyView()}
            {view === 'monthly' && renderMonthlyView()}
          </motion.div>
        </AnimatePresence>
      </div>

      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => { setShowAddModal(false); setEditingMeal(null); }}>
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden" onClick={e => e.stopPropagation()}>
            <div className="bg-[#005c29] p-4 text-white flex justify-between items-center">
              <h3 className="font-bold text-lg">{editingMeal ? 'Edit' : 'Add'} Meal for {selectedDay?.toLocaleDateString()}</h3>
              <button onClick={() => { setShowAddModal(false); setEditingMeal(null); }} className="hover:text-red-200"><BiPlus className="rotate-45 text-2xl" /></button>
            </div>
            <form onSubmit={handleAddMeal} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Meal Type</label>
                <select 
                  value={newMeal.type} 
                  onChange={e => setNewMeal({...newMeal, type: e.target.value})}
                  className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#8fbf1a] outline-none"
                >
                  {getAvailableTypes(selectedDay, editingMeal?.type).map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">What are we eating?</label>
                <input 
                  type="text" 
                  value={newMeal.name}
                  onChange={e => setNewMeal({...newMeal, name: e.target.value})}
                  placeholder="e.g., Jollof Rice"
                  className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#8fbf1a] outline-none"
                  autoFocus
                />
              </div>
              <div className="flex justify-end gap-3 pt-4">
                <button 
                  type="button" 
                  onClick={() => { setShowAddModal(false); setEditingMeal(null); }}
                  className="px-4 py-2 text-gray-500 hover:bg-gray-100 rounded-lg font-medium"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  disabled={!newMeal.name}
                  className="px-6 py-2 bg-[#f93270] text-white rounded-lg font-bold hover:bg-[#d6255b] disabled:opacity-50 transition-colors"
                >
                  {editingMeal ? 'Update' : 'Save'} Meal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default MealPlanner;
