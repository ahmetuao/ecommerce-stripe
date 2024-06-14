import { CLEAR_FILTER, SET_FILTER, SET_SORT } from "./actionTypes";

export const setFilter = (filterType, filters) => ({
  type: SET_FILTER,
  payload: { filterType, filters },
});

export const clearFilter = (filterType) => ({
  type: CLEAR_FILTER,
  payload: filterType,
});

export const setSort = (sortField, sortOrder) => ({
    type: SET_SORT,
    payload: { sortField, sortOrder }
  });