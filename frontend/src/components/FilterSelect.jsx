import Select from 'react-select';
const FilterSelect = ({ allProducts, categories, setFilterList }) => {
    const handleChange = (e) => {
      const selectedCategory = e.target.value;
      const filtered = selectedCategory === "all"
        ? allProducts
        : allProducts.filter(item => item.category === selectedCategory);
      setFilterList(filtered);
    };
  
    return (
      <select className="form-select" onChange={handleChange}>
        <option value="all">All Categories</option>
        {categories.map((cat, index) => (
          <option key={index} value={cat.name}>{cat.name}</option>
        ))}
      </select>
    );
  };
export default FilterSelect;  
