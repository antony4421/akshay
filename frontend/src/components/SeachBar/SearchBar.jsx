import { useState, useEffect } from "react";
import "./searchbar.css";

const SearchBar = ({ allProducts, setFilterList }) => {
  const [searchWord, setSearchWord] = useState("");

  useEffect(() => {
    if (!searchWord) {
      setFilterList(allProducts); // Reset to all if empty
    } else {
      const filtered = allProducts.filter((item) =>
        item.name?.toLowerCase().includes(searchWord.toLowerCase())
      );
      setFilterList(filtered);
    }
  }, [searchWord, allProducts, setFilterList]);

  const handleChange = (e) => {
    setSearchWord(e.target.value);
  };

  return (
    <div className="search-container">
      <input
        type="text"
        placeholder="Search by name..."
        value={searchWord}
        onChange={handleChange}
      />
      <ion-icon name="search-outline" className="search-icon"></ion-icon>
    </div>
  );
};

export default SearchBar;
