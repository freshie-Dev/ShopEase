const reducer = (state, action) => {
    switch (action.type) {
        case "LOAD_FILTER_PRODUCTS":

            const maxPrice = Math.max(...action.payload.map((item) => item.price));
            return {
                ...state,
                filteredProducts: [...action.payload],
                allProducts: [...action.payload],
                filters: {
                    ...state.filters,
                    price: maxPrice,
                    maxPrice: maxPrice,
                }
            }
        case "SET_GRID_VIEW":
            return {
                ...state,
                gridView: true,
            }
        case "SET_LIST_VIEW":
            return {
                ...state,
                gridView: false,
            }
        case "GET_SORT_VALUE":
            const selectField = document.getElementById("sort");
            const selectedSortValue = selectField.options[selectField.selectedIndex].value;
            return {
                ...state,
                sortingValue: action.payload,
            }
        // case "GET_SORTED_PRODUCTS":
        //     const {sortingValue, filteredProducts} = state;
        //     let tempSortedProducts = [...filteredProducts];
        //     if(sortingValue === "lowest"){

        //     }
        //     if(sortingValue === "highest"){
        //         tempSortedProducts = tempSortedProducts.sort((a,b) => b.price - a.price)

        //     }
        //     if(sortingValue === "ascending"){
        //         tempSortedProducts = tempSortedProducts.sort((a,b) => a.name.localeCompare(b.name))

        //     }
        //     if(sortingValue === "descending"){
        //         tempSortedProducts = tempSortedProducts.sort((a,b) => b.name.localeCompare(a.name))

        //     }
        //     if (sortingValue === "all"){
        //         tempSortedProducts = [...state.allProducts];

        //     }

        // return {
        //     ...state,
        //     filteredProducts: [...tempSortedProducts],
        // }
        case "UPDATE_FILTERS_VALUE":
            const { name, value } = action.payload;
            return {
                ...state,
                filters: {
                    ...state.filters,
                    [name]: value,
                }
            }

        case "UPDATE_QUERY_IMAGE_FILTERS_VALUE":
            console.log("from filter reducer", action.payload)
            return {
                ...state,
                filters: {
                    ...state.filters,
                    [action.payload.name]: action.payload.value,
                }
            }
        case "FILTER_PRODUCTS":
            let { allProducts } = state;
            let tempFilteredProducts = [...allProducts];

            const { text, category, colors, brand, price, queryImage } = state.filters;
            let check = "nothing"
            if (text) {
                tempFilteredProducts = tempFilteredProducts.filter((curEle) => {
                    check = "text"
                    return curEle.title.toLowerCase().includes(text.toLowerCase());
                });
            }
            if (category !== "all") {
                tempFilteredProducts = tempFilteredProducts.filter((curEle) => {
                    check = "category"
                    return curEle.categories.includes(category);
                });
            }
            if (colors !== "all") {
                tempFilteredProducts = tempFilteredProducts.filter((curEle) => {
                    // Check if any attribute's colorName matches the selected color
                    return curEle.attributes.some((attr) =>
                        attr.colorName.toLowerCase() === colors.toLowerCase()
                    );
                });
            }
            if (brand !== "all") {
                tempFilteredProducts = tempFilteredProducts.filter((curEle) => {
                    check = "brand"
                    return curEle.brand === brand;
                });
            }
            if (price) {
                tempFilteredProducts = tempFilteredProducts.filter((curEle) => {
                    check = "price"
                    return curEle.price <= price;
                });
            }
            if (queryImage) {
                const identifierIndexMap = new Map(queryImage.map((id, index) => [id, index]));

                // Extract uniqueIdentifiers from tempFilteredProducts
                let uid = tempFilteredProducts.map(prod => prod.uniqueIdentifier);

                console.log(uid);

                // Separate undefined items from defined items
                const definedItems = tempFilteredProducts.filter(prod => prod.uniqueIdentifier !== undefined);
                const undefinedItems = tempFilteredProducts.filter(prod => prod.uniqueIdentifier === undefined);

                // Sort defined items based on the order of queryImage array
                const sortedDefinedItems = definedItems.sort((a, b) => {
                    const indexA = identifierIndexMap.get(a.uniqueIdentifier);
                    const indexB = identifierIndexMap.get(b.uniqueIdentifier);
                    return indexA - indexB;
                });

                // Concatenate sorted defined items with undefined items
                const sortedTempProducts = [...sortedDefinedItems, ...undefinedItems];

                tempFilteredProducts = sortedTempProducts;
            }
            return {
                ...state,
                filteredProducts: tempFilteredProducts
            }
        case "SEARCH_BY_IMAGE":
            const image = action.payload
            console.log(image)
            return {
                ...state,
                searchImage: image
            }
            break;
        case "CLEAR_FILTERS":
            return {
                ...state,
                filters: {
                    ...state.filters,
                    text: "",
                    category: "all",
                    colors: "all",
                    brand: "all",
                    price: 0,
                    maxPrice: 0,
                    minPrice: 0,
                    queryImage: null
                }
            }
            break;
        // case "RESET_COLORS":
        //     return {
        //         ...state,
        //         filters: {
        //             ...state.filters,
        //             colors: "all"
        //         }
        //     }
        // break;
        default:
            return state;
    }
}
export default reducer;