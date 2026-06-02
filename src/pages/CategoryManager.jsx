import { useState, useEffect } from "react";
import defaultCategories from "../data/defaultCategories";

export default function CategoryManager() {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState("");

  useEffect(() => {
    const saved =
      JSON.parse(localStorage.getItem("categories")) ||
      defaultCategories;

    setCategories(saved);
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "categories",
      JSON.stringify(categories)
    );
  }, [categories]);

  const addCategory = () => {
    if (!newCategory.trim()) return;

    setCategories([
      ...categories,
      newCategory,
    ]);

    setNewCategory("");
  };

  return (
    <div style={{ padding: "30px" }}>
      <h1>Categories</h1>

      <input
        value={newCategory}
        onChange={(e) => setNewCategory(e.target.value)}
        placeholder="New Category"
        style={{
          marginTop: 20,
          marginLeft: 10,
          padding: "12px 20px",
          borderRadius: "10px",
          border: "1px solid #444",
          background: "transparent",
          color: "#fff",
        }}
      />


      <button
       onClick={addCategory}
       style={{
          marginTop: 20,
          marginLeft: 10,
          padding: "12px 20px",
          borderRadius: "10px",
          border: "1px solid #444",
          background: "transparent",
          color: "#fff",
        }}
       
       >
        Add
      </button>

      {categories.map((cat) => (
        <p key={cat}>{cat}</p>
      ))}
    </div>
  );
}