import { useState } from "react";

export default function GroceryList() {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState("");

  const addItem = () => {
    if (newItem.trim() === "") return;

    const newGrocery = {
      id: Date.now(),
      name: newItem,
      checked: false,
    };

    setItems([...items, newGrocery]);
    setNewItem("");
  };

  const toggleItem = (id) => {
    setItems(
      items.map((item) =>
        item.id === id ? { ...item, checked: !item.checked } : item
      )
    );
  };

  const removeItem = (id) => {
    setItems(items.filter((item) => item.id !== id));
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded shadow mt-6">
      <h1 className="text-2xl font-bold mb-4 text-green-700"> Market List</h1>

      <div className="flex gap-2 mb-4">
        <input
          type="text"
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
          placeholder="Add an item..."
          className="w-[32rem] max-w-full px-6 py-3 text-lg border
           rounded-xl shadow-md focus:outline-none "
        />
        <button
          onClick={addItem}
          className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
        >
          Add
        </button>
      </div>

      {items.length === 0 ? (
        <p className="text-gray-500">No items in your basket yet.</p>
      ) : (
        <ul className="space-y-2">
          {items.map((item) => (
            <li
              key={item.id}
              className="w-[32rem] max-w-full px-6 py-3 text-lg border
           rounded-xl shadow-md focus:outline-none "
            >
              <div
                className={`flex items-center gap-2 ${
                  item.checked ? "line-through text-gray-400" : ""
                }`}
              >
                <input
                  type="checkbox"
                  checked={item.checked}
                  onChange={() => toggleItem(item.id)}
                />
                {item.name}
              </div>
              <button
                onClick={() => removeItem(item.id)}
                className="text-red-500 hover:text-red-700"
              >
                ✖
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}


