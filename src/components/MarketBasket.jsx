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

 

  
}
