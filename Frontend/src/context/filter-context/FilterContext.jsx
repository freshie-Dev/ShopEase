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
  searchImage: null,
  filters: {
    text: "",
    category: "all",
    colors: "all",
    brand: "all",
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
    dispatch({ type: "FILTER_PRODUCTS" });
  }, [filterState.filters]);
  // useEffect(() => {
  //     dispatch({type: "FILTER_PRODUCTS"});
  //     dispatch({type: "GET_SORTED_PRODUCTS"});
  // }, [products, state.filters, state.sortingValue]);

  // // useEffect(() => {
  // //     dispatch({type: "GET_SORTED_PRODUCTS"});
  // // }, [ state.sortingValue])

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
