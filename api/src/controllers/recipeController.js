require('dotenv').config();
const axios = require('axios');
const APIKEY = process.env.APIKEY5
const { Recipe, Diet } = require('../db');

//FUNCION PARA TRAER LAS RECETAS DE LA API

const getApi = async () => {

    const listRecipes = (await axios.get(`https://api.spoonacular.com/recipes/complexSearch?number=100&addRecipeInformation=true&apiKey=${APIKEY}`)).data;
    const dataRecipes = await listRecipes.results.map((el) => {
        return {
            id: el.id,
            name: el.title,
            summary: el.summary,
            healthScore: el.healthScore,
            image: el.image,
            diets: el.diets.map((d) => { return { name: d } }),
            dishTypes: el.dishTypes,
            steps: el.analyzedInstructions
                .map((el) => {
                    return el.steps.map((el) => {
                        return el.step;
                    });
                })
                .flat(),
            db: false
        };
    });
    return dataRecipes;
}

//FUNCION PARA TRAER LAS RECETAS DE LA BD

const getDataBase = async () => {
    return await Recipe.findAll({
        include: Diet,
    });
};

//FUNCION PARA TRAER TODAS LAS RECETAS (API Y BD)

const getAllRecipes = async () => {
    const api = await getApi();
    const db = await getDataBase();
    const allRecipes = await db.concat(api)
    return allRecipes;
};

//FUNCION PARA BUSCAR POR ID EN LA API

const searchInApi = async (id) => {
    try {
        const recipeId = await axios.get(`https://api.spoonacular.com/recipes/${id}/information?apiKey=${APIKEY}`)
        const details = await recipeId.data.results;
        return {
            id: details.id,
            image: details.image,
            name: details.title,
            dishTypes: details.dishTypes,
            diets: details.diets,
            summary: details.summary,
            healthScore: details.healthScore,
            steps: details.analyzedInstructions
                .map((details) => {
                    return details.steps.map((el) => {
                        return details.step;
                    });
                })
                .flat(),
        };
    } catch (e) {
        console.log(e);
    };
};

//FUNCION PARA BUSCAR POR ID EN LA BD

const searchInDataBase = async (id) => {
    try {
        const recipeId = await Recipe.findByPk(id, {
            include: {
                model: Diet,
                attributes: ["name"],
                through: {
                    attributes: []
                }
            }
        });
        return recipeId;
    } catch {
        return undefined;
    };
};

//FUNCION PARA BUSCAR POR ID (EN LA API Y BD) -- USO EN DETAILS

const idSearch = async (id) => {
    const api = searchInApi(id);
    const db = searchInDataBase(id);
    const [apiRecipe, dbRecipe] = await axios.all([api, db])
    return apiRecipe || dbRecipe;
};

const getDbInfo = async () => {
    return await Recipe.findAll({
        include: {
            model: Diet,
            attributes: ['name'],
            through: {
                attributes: [],
            }
        }
    })
}

module.exports = { getAllRecipes, idSearch, getDbInfo };