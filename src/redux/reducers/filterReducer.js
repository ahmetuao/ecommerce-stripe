const initialState = {
  filters: {
    authors: [],
    publishers: [],
    name: "",
  },
  sort: {
    field: null,
    order: null,
  },
};

const filtersReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_FILTER":
      return {
        ...state,
        filters: {
          ...state.filters,
          [action.payload.filterType]: action.payload.filters,
        },
      };
    case "SET_SORT":
      return {
        ...state,
        sort: {
          field: action.payload.sortField,
          order: action.payload.sortOrder,
        },
      };
    default:
      return state;
  }
};

export default filtersReducer;
