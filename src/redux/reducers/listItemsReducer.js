import {
  FETCH_LISTITEMS_FAIL,
  FETCH_LISTITEMS_START,
  FETCH_LISTITEMS_SUCCESS
} from '../actions/actionTypes'
  
  const initialState = {
    listItems: [],
    loading: true
  }
  
  const listItemsReducer = (state = initialState, action) => {
    switch (action.type) {
      case FETCH_LISTITEMS_START:
        return {
          ...state,
          loading: true,
        }
      case FETCH_LISTITEMS_SUCCESS:
        return {
          ...state,
          listItems: action.payload,
          loading: false,
        }
      case FETCH_LISTITEMS_FAIL:
        return {
          ...state,
          loading: false,
        }
      default:
        return state
    }
  }
  
  export default listItemsReducer
  