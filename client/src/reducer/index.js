const initialState = {
    recipes: [],
    allRecipes: [],
    detail: {}
}

function rootReducer(state = initialState, action) {
    switch (action.type) {
        case 'GET_RECIPES':
            return {
                ...state,
                recipes: action.payload,
                allRecipes: action.payload
            }
        case 'SEARCH_NAME':
            return {
                ...state,
                recipes: action.payload
            }

        case 'ORDER_NAME':
            let all = state.recipes
            if (action.payload === 'asc') all.sort((a, b) => a.name.localeCompare(b.name))
            if (action.payload === 'desc') all.sort((a, b) => b.name.localeCompare(a.name))
            if (action.payload === 'all') all = state.recipes
            return {
                ...state,
                recipes: [...all]
            }
        case 'ORDER_SCORE':
            let scoreRecipe = action.payload === "min" ?
                state.recipes.sort((a, z) => {
                    if (a.healthScore > z.healthScore) {
                        return 1
                    }
                    if (z.healthScore > a.healthScore) {
                        return -1
                    }
                    return 0
                }) :
                state.recipes.sort((a, z) => {
                    if (a.healthScore > z.healthScore) {
                        return -1
                    }
                    if (z.healthScore > a.healthScore) {
                        return 1
                    }
                    return 0
                })
            return {
                ...state,
                recipes: scoreRecipe
            }
        case 'FILTER_DB_OR_API':

            let arrayRecipes = []
            const reciReci = state.recipes
            if (action.payload === 'recipes') {
                arrayRecipes = state.recipes
            } else if (action.payload === 'data_base') {
                arrayRecipes = reciReci.filter(p => p.createdInDb)
            } else if (action.payload === 'api') {
                arrayRecipes = reciReci.filter(p => !p.createdInDb)
            }
            return {
                ...state,
                recipes: arrayRecipes.length ? arrayRecipes : reciReci.concat(alert("Aún no existen Recetas creados"))
            }
        case 'FILTER_DIETS':
            // const myRecipes = [...state.allRecipes];
            // const filterDiets = myRecipes.filter((el) => el.diets.includes(action.payload));
            // return {
            //   ...state,
            //   recipes: filterDiets,
            // }
            const myRecipes = [...state.allRecipes];
            const filterDiet = action.payload === 'All' ? myRecipes :
                myRecipes.filter((el) => el.diets.includes(action.payload));
            const noDiet = myRecipes
            return {
                ...state,
                recipes: filterDiet.length ? filterDiet : noDiet.concat(alert("Aún no existen recetas con esa dieta"))
            }
        case 'GET_DETAILS':
            return {
                ...state,
                detail: action.payload
            }
        default:
            return state;
    }
}


export default rootReducer;  
// import {
//     GET_RECIPES,
//     SEARCH_NAME,
//     GET_DETAILS,
//     FILTER_DIETS,
//     FILTER_CREATED,
//     FILTER_DB_OR_API,
//     ORDER_NAME,
//     ORDER_SCORE
// } from "../actions";




// const initialState = {
//     recipes: [],
//     detail: {},
//     forFilter: [],
// }

// function rootReducer(state = initialState, action) {
//     switch (action.type) {
//         case 'GET_RECIPES':
//             return {
//                 ...state,
//                 recipes: action.payload,
//                 forFilter: action.payload
//             }
//         case 'SEARCH_NAME':
//             return {
//                 ...state,
//                 recipes: action.payload
//             }

//         case 'ORDER_NAME':
//             let all = state.recipes
//             if (action.payload === 'asc') all.sort((a, b) => a.name.localeCompare(b.name))
//             if (action.payload === 'desc') all.sort((a, b) => b.name.localeCompare(a.name))
//             if (action.payload === 'all') all = state.recipes
//             return {
//                 ...state,
//                 recipes: [...all]
//             }
//         case 'ORDER_SCORE':
//             let scoreRecipe = action.payload === "min" ?
//                 state.recipes.sort((a, z) => {
//                     if (a.healthScore > z.healthScore) {
//                         return 1
//                     }
//                     if (z.healthScore > a.healthScore) {
//                         return -1
//                     }
//                     return 0
//                 }) :
//                 state.recipes.sort((a, z) => {
//                     if (a.healthScore > z.healthScore) {
//                         return -1
//                     }
//                     if (z.healthScore > a.healthScore) {
//                         return 1
//                     }
//                     return 0
//                 })
//             return {
//                 ...state,
//                 recipes: scoreRecipe
//             }
//         case 'FILTER_DB_OR_API':

//             let arrayRecipes = []
//             const reciReci = state.recipes
//             if (action.payload === 'recipes') {
//                 arrayRecipes = state.recipes
//             } else if (action.payload === 'data_base') {
//                 arrayRecipes = reciReci.filter(p => p.createdInDb)
//             } else if (action.payload === 'api') {
//                 arrayRecipes = reciReci.filter(p => !p.createdInDb)
//             }
//             return {
//                 ...state,
//                 recipes: arrayRecipes.length ? arrayRecipes : reciReci.concat(alert("Aún no existen Recetas creados"))
//             }
//         case 'FILTER_DIETS':
//             const allRecis = state.forFilter;
//             const filterDiet = action.payload === 'All' ? allRecis :
//                 allRecis.filter(el => el.diets.map(el => el.name).includes(action.payload))
//             const noDiet = allRecis
//             return {
//                 ...state,
//                 recipes: filterDiet.length ? filterDiet : noDiet.concat(alert("Aún no existen recetas con esa dieta"))
//             }

//         case 'GET_DETAILS':
//             return {
//                 ...state,
//                 detail: action.payload
//             }
//         default:
//             return state;
//     }
// }


// export default rootReducer;  