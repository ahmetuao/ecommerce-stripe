import { combineReducers } from "redux";
import cartReducer from "./cartReducer";
import filtersReducer from "./filterReducer";
import listItemsReducer from "./listItemsReducer";

const rootReducer = combineReducers({
  listItems: listItemsReducer,
  cart: cartReducer,
  filters: filtersReducer,
});

export default rootReducer;
