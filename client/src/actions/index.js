import axios from 'axios'
export const GET_RECIPES = "GET_RECIPES";
export const SEARCH_NAME = "SEARCH_NAME";
export const GET_DETAILS = "GET_DETAILS";
export const FILTER_DIETS = "FILTER_DIETS";
export const FILTER_CREATED = "FILTER_CREATED";
export const FILTER_DB_OR_API = "FILTER_DB_OR_API";
export const ORDER_NAME = "ORDER_NAME";
export const ORDER_SCORE = "ORDER_SCORE";


export function getRecipes(){
    return async function(dispatch){
        var json = await axios.get('http://localhost:3001/recipes');
        return dispatch({
            type: 'GET_RECIPES',
            payload: json.data
        })
    }
}

export function searchName(payload) {
    return async function (dispatch) {
         try {
            var json = await axios.get("http://localhost:3001/recipes?name=" + payload)
            return dispatch ({
                type: 'SEARCH_NAME',
                payload: json.data
            })
         } catch (error) {
             console.log(error)
             
         }
        
    }
}

export function getDetails(id) {
    return async function (dispatch) {
        try {
            let json = await axios.get(`http://localhost:3001/recipes/${id}`)
            return dispatch({
                type: 'GET_DETAILS',
                payload: json.data
            })
        } catch (e) {
            console.log(e)
        }
    }
}

export function postRecipe(payload) {
    return async function (dispatch) {
        const recipeCreated = await axios.post("http://localhost:3001/recipes", payload)
        return recipeCreated
    }
}

export function getDiets() {
    return async function (dispatch) {
      var json = await axios.get("http://localhost:3001/diets");
      return dispatch({
        type: 'GET_DIETS',
        payload: json.data,
      })
    }
  }



export function filterDiet(payload) {
    return {
        type: 'FILTER_DIETS',
        payload
    }
}

export function filterCreated(payload) {
    return {
        type: 'FILTER_CREATED',
        payload
    }
}
export function orderForName(payload) {
    return {
        type: 'ORDER_NAME',
        payload
    }
}

export function orderForScore (payload) {
    return {
        type: "ORDER_SCORE",
        payload
    }
}

export function filterCreatedOrApi(payload) {
    return {
        type: "FILTER_DB_OR_API",
        payload
    }
}

export function getClean(){
    return{
      type: 'GET_CLEAN',
    }
  }