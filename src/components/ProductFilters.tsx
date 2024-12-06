import React from 'react';

interface ProductFiltersProps {
  filters: {
    category: string;
    minPrice: number;
    maxPrice: number;
  };
  setFilters: React.Dispatch<
    React.SetStateAction<{
      category: string;
      minPrice: number;
      maxPrice: number;
    }>
  >;
}

const ProductFilters: React.FC<ProductFiltersProps> = ({ filters, setFilters }) => {
  const handleCategoryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters({ ...filters, category: e.target.value });
  };

  const handleMinPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    setFilters({ ...filters, minPrice: isNaN(value) ? 0 : value });
  };

  const handleMaxPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    setFilters({ ...filters, maxPrice: isNaN(value) ? 10000 : value });
  };

  return (
    <div className="mb-4 p-4 border rounded bg-gray-50 shadow-sm">
      <h3 className="text-lg font-bold mb-3">Filters</h3>

      {/* Category Filter */}
      <div className="mb-3">
        <label htmlFor="category" className="block text-sm font-medium text-gray-700">
          Category
        </label>
        <input
          id="category"
          type="text"
          className="w-full p-2 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
          placeholder="Enter category (e.g., Smartphone)"
          value={filters.category}
          onChange={handleCategoryChange}
        />
      </div>

      {/* Price Range Filters */}
      <div className="grid grid-cols-2 gap-4">
        {/* Minimum Price */}
        <div>
          <label htmlFor="minPrice" className="block text-sm font-medium text-gray-700">
            Min Price
          </label>
          <input
            id="minPrice"
            type="number"
            className="w-full p-2 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
            placeholder="0"
            value={filters.minPrice || ''}
            onChange={handleMinPriceChange}
          />
        </div>

        {/* Maximum Price */}
        <div>
          <label htmlFor="maxPrice" className="block text-sm font-medium text-gray-700">
            Max Price
          </label>
          <input
            id="maxPrice"
            type="number"
            className="w-full p-2 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
            placeholder="10000"
            value={filters.maxPrice || ''}
            onChange={handleMaxPriceChange}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductFilters;
