//import { Location} from './../store';
import {
  Action,
  EndLocationAction,
} from "../actions";

import{
  START_LOCATION,
  END_LOCATION,
  SHOW_GEO_ERROR,
  CLEAR_GEO_ERROR,
  } from "./../constants";

export interface Location {
  id: string;
  place: string;
  country: string
  lat: number;
  lng: number;
};

export interface GeoState {

    location:Location,
    errorMessage: string,
    loading: boolean,
}


const initialState = {  
    errorMessage: '',
    location: {id:'0',place:'Saint-James',country:'France', lat:0, lng:0},
    loading: false,
    
};

export const locationReducer =  (state:GeoState = initialState, action: Action): GeoState => {


  switch (action.type) {
   
      case START_LOCATION: {
        console.log('REDUCER - START_LOCATION: ');
        return {  
          ...state, loading: true
        };
      }
      case END_LOCATION: {
        console.log('REDUCER - END_LOCATION: ');
        const endLocationAction = action as EndLocationAction;
        return {           
          ...state,
          loading: false,
          //target: endLocationAction.payload.location.place,
          location: endLocationAction.payload.location
        };
      }
      case SHOW_GEO_ERROR: {
        console.log('REDUCER - SHOW_ERROR: ', action.payload);
        return {
            // @ts-ignore
          ...state, errorMessage: action.payload, loading:false
        };
      }
      case CLEAR_GEO_ERROR: {
        console.log('REDUCER - CLEAR_ERROR ');
        return {
            // @ts-ignore
          ...state, errorMessage: ""
        };
      }

    

    default:
      return state;
  }
}
