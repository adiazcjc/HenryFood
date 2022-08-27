

const initialState = {
    recipes: [],
    allRecipes: [],
    diets: [],
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
        case 'GET_DIETS':
            return {
                ...state,
                diets: action.payload
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
            const reciReci = state.allRecipes
            if (action.payload === 'recipes') {
                arrayRecipes = state.allRecipes
            } else if (action.payload === 'data_base') {
                arrayRecipes = reciReci.filter(p => p.createForMe)
            } else if (action.payload === 'api') {
                arrayRecipes = reciReci.filter(p => !p.createForMe)
            }
            return {
                ...state,
                recipes: arrayRecipes.length ? arrayRecipes : reciReci.concat(alert("Aún no existen Recetas creados"))
            }
        case 'FILTER_DIETS':
            const allRecipes = state.allRecipes;
            const dietsFilter = action.payload === 'All' ? allRecipes :
            allRecipes.filter(el => el.diets.map(el => el.name).includes(action.payload))
            const noDiet = allRecipes
            return {
                ...state,
                recipes: dietsFilter.length ? dietsFilter : noDiet.concat(alert("Aún no existen recetas con ese tipo de dieta"))
            }

        case 'GET_DETAILS':
            return {
                ...state,
                detail: action.payload
            }
        case 'POST_RECIPE':
            return {
                ...state,
            }
        case 'GET_CLEAN':
        return{
            ...state,
            datail: {}
        }    
        default:
            return state;
    }
}


export default rootReducer;
