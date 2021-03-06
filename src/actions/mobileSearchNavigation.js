import {
  SHOW_SEARCH_RESULTS_MAP,
  SHOW_SEARCH_RESULTS,
  SHOW_SEARCH_FORM,
} from '../constants';

export function showMap() {

  return async (dispatch) => {
    dispatch({
      type: SHOW_SEARCH_RESULTS_MAP,
      payload: {
        searchMap: true,
        searchResults: false,
        searchForm: false
      }
    });
    return true;
  };
};

export function showResults() {

  return async (dispatch) => {
    dispatch({
      type: SHOW_SEARCH_RESULTS,
      payload: {
        searchMap: false,
        searchResults: true,
        searchForm: false
      }
    });
    return true;
  };
};


export function showForm() {

  return async (dispatch) => {
    dispatch({
      type: SHOW_SEARCH_FORM,
      payload: {
        searchMap: false,
        searchResults: false,
        searchForm: true
      }
    });
    return true;
  };
};
