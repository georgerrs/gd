import {gql} from 'react-apollo';
import {reset, change} from 'redux-form';
import {showLoading, hideLoading} from 'react-redux-loading-bar';

import {
    SEARCH_LISTING_START, 
    SEARCH_LISTING_SUCCESS, 
    SEARCH_LISTING_ERROR
} from '../constants';

import { getSearchResults } from './getSearchResults';


const query = gql `
  query(
      $personCapacity: Int,
      $dates: String,
      $currentPage: Int,
      $geography: String
    ){
      SearchListing(
        personCapacity: $personCapacity,
        dates: $dates,
        currentPage: $currentPage
        geography: $geography
      ) {
        count
        results {
          id
          title
          personCapacity
          lat
          lng
          beds
          bookingType
          coverPhoto
          reviewsCount,
          reviewsStarRating,
          listPhotos {
            id
            name
            type
            status
          }
          listingData {
            basePrice
            currency
          }
          settingsData {
            listsettings {
              id
              itemName
            }
          }
          wishListStatus
          isListOwner
        }
      }
    }
`;

export function searchListing({personCapacity, dates, geography, currentPage}) {

    return async(dispatch, getState, {client}) => {

        dispatch({type: SEARCH_LISTING_START});
        dispatch(reset('SearchForm'));

        try {
            const {data} = await client.query({
                query, 
                variables: {
                    personCapacity,
                    dates,
                    currentPage,
                    geography
                }, 
                fetchPolicy: 'network-only'
            });
            if (data.SearchListing) {
                dispatch({type: SEARCH_LISTING_SUCCESS});
                await dispatch(change('SearchForm', 'personCapacity', personCapacity));
                await dispatch(change('SearchForm', 'dates', dates));
                await dispatch(change('SearchForm', 'geography', geography));
                await dispatch(change('SearchForm', 'currentPage', currentPage));
                dispatch(getSearchResults(data.SearchListing));
                dispatch(hideLoading());
            } 
        } catch (error) {
            dispatch({
                type: SEARCH_LISTING_ERROR, 
                payload: {
                    error
                }
            });
            dispatch(hideLoading());
            return false;
        }

        return true;
    };
}
