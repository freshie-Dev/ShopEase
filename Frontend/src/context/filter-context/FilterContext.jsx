import {
  createContext,
  useEffect,
  useReducer,
  useContext,
  useState,
} from "react";
// import ProductContextProvider from "./ProductContext";
const FilterContext = createContext();
import reducer from "../../reducers/FilterReducer";
import { useProductContext } from "../product-context/ProductContextProvider";

const initialState = {
  filteredProducts: [],
  allProducts: [],
  gridView: true,
  sortingValue: "default",
  queryImage: null,
  filters: {
    text: "",
    category: "all",
    colors: "all",
    brand: "all",
    queryImage: null,
    price: 0,
    maxPrice: 0,
    minPrice: 0,
  },
};

const FilterProvider = ({ children }) => {
  const { productState } = useProductContext();
  const [filterSlider, setFilterSlider] = useState();

  const [filterState, dispatch] = useReducer(reducer, initialState);
  // const [sortedProducts, setSortedProducts] = useState([...products]);

  // const sortProducts = (event) => {
  //     let {value: sortValue} = event.target;
  //     dispatch({ type: "GET_SORT_VALUE", payload: sortValue });
  // };

  // //! clear all filters
  const clearFilters = () => {
    dispatch({ type: "CLEAR_FILTERS" });
  };

  // //! update the filter values
  const updateFilterValue = (event) => {
    let { name, value } = event.target;

    return dispatch({ type: "UPDATE_FILTERS_VALUE", payload: { name, value } });
  };

  const updateQueryImageFilterValue = (queryImage) => {
    let { name, value } = queryImage;
    return dispatch({ type: "UPDATE_QUERY_IMAGE_FILTERS_VALUE", payload: { name, value } });
  };
  useEffect(() => {
    console.log(filterState.filters.queryImage)
  }, [filterState.filters.queryImage])
  
  //! search by image
  const searchByImage = (e) => {
    const searchImageFile = e.target.files[0]; // Get the first file from the FileList
    dispatch({ type: "SEARCH_BY_IMAGE", payload : searchImageFile  });
  };

  // //! Reset colors filter
  // const resetColors = () => {
  //     return dispatch({type: "RESET_COLORS"})
  // }

  //! get all categories
  const getCategories = () => {
    const categoriesSet = new Set();
    productState.allProducts.forEach((product) => {
      product.categories.forEach((category) => {
        categoriesSet.add(category);
      });
    });
    const categories = Array.from(categoriesSet);
    categories.unshift("all"); // Add "All" as the first item
    return categories;
  };

  //! get all colors
  const getColors = () => {
    const colorSet = new Set(); // Using Set to avoid duplicates
    productState.allProducts.forEach((product) => {
      product.attributes.forEach((attribute) => {
        colorSet.add(attribute.colorName);
      });
    });
    const colors = Array.from(colorSet); // Convert Set back to an array
    colors.unshift("all");
    return colors;
  };

  // //! load filtered products when the filters change or sorted products when the sorting value changes
  useEffect(() => {
    console.log("hahahah")
    dispatch({ type: "FILTER_PRODUCTS" });
    localStorage.setItem('filters', JSON.stringify(filterState.filters))
  }, [filterState.filters]);


  // //! load all products for the gird and list view for the first time
  useEffect(() => {
    dispatch({
      type: "LOAD_FILTER_PRODUCTS",
      payload: productState.allProducts,
    });
  }, [productState.allProducts]);

  return (
    <FilterContext.Provider
      value={{
        ...filterState,
        // setGridView,
        // setListView,
        // sortProducts,
        updateFilterValue,
        updateQueryImageFilterValue,
        getCategories,
        getColors,
        clearFilters,
        searchByImage,
        // resetColors,
        // filterSlider,
        // setFilterSlider,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
};
const useFilterContext = () => {
  return useContext(FilterContext);
};

export { FilterProvider };
export default useFilterContext;
