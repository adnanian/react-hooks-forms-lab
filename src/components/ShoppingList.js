import React, { useState } from "react";
import ItemForm from "./ItemForm";
import Filter from "./Filter";
import Item from "./Item";

function ShoppingList({ items, onItemArrayChange }) {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchName, setSearchName] = useState("");

  function handleCategoryChange(event) {
    setSelectedCategory(event.target.value);
  }

  function handleNameChange(event) {
    setSearchName(event.target.value);
  }

  function onItemFormSubmit(newItem) {
    onItemArrayChange(newItem);
  }

  const itemsToDisplay = items.filter((item) => {

    if (selectedCategory === "All") {
      if (searchName === "") return true;
      return item.name.toLowerCase().includes(searchName.toLowerCase());
    }

    return item.category === selectedCategory && item.name.toLowerCase().includes(searchName.toLowerCase());
  });

  return (
    <div className="ShoppingList">
      <ItemForm onItemFormSubmit={onItemFormSubmit}/>
      <Filter search={searchName} onSearchChange={handleNameChange} onCategoryChange={handleCategoryChange} />
      <ul className="Items">
        {itemsToDisplay.map((item) => (
          <Item key={item.id} name={item.name} category={item.category} />
        ))}
      </ul>
    </div>
  );
}

export default ShoppingList;
