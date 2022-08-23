
// const { getAllRecipes } = require('./recipeController');


// const getAllDiets = async () => {

//     const allRecipes = await getAllRecipes()
//     const cicle = await allRecipes.map(e => e.diets)
//     const arrayDiets = cicle.flat();
//     return arrayDiets;
// }


// module.exports = { getAllDiets };


require('dotenv').config();
const axios = require('axios');
const APIKEY = process.env.APIKEY2
const {Recipe,Diet} = require('../db');
//-------------------- FUNCION PARA TRAER LOS TIPOS --------------------

// const getAllDiets = async () => {
//     try {
//         const theDiet = [];

//         await axios.get(`https://api.spoonacular.com/recipes/complexSearch?number=100&addRecipeInformation=true&apiKey=${APIKEY}`).then(allDiets => {
//             allDiets.data.results.map(el => theDiet.push(el.name))
//         }).catch(e => console.log(e))

//         const types = theDiet.map(async (el) => {
//             return await Diet.findOrCreate({
//                 where: {
//                     name: el
//                 }
//             }).catch(e => console.log(e))
//         })

//         const allRecipesDiets = await Diet.findAll();
//         return allRecipesDiets;

//     } catch (err) {
//         console.log(err)
//     }

// }


const getAllDiets = async function(){
    // const dietList = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${APIKEY}&number=60&addRecipeInformation=true`);
    // const repeated = await dietList.data.results.map( d => d.diets).flat(1);
    // return [... new Set(repeated)]

    try {
        const getDiet = await Diet.findAll();
        if(getDiet.length){
            console.log(getDiet)
            return res.status(200).json(getDiet) ;
        } else {
            try{
                await Diet.bulkCreate([
                    { name: "Gluten Free" },
                    { name: "Ketogenic" },
                    { name: "Vegetarian" },
                    { name: "Lacto-Vegetarian" },
                    { name: "Ovo-Vegetarian" },
                    { name: "Vegan" },
                    { name: "Pescetarian" },
                    { name: "Primal" },
                    { name: "Whole30" }
                ]);
            }catch (err) {
                console.error(err);
            }
            const getDiet = await Diet.findAll();
            console.log(getDiet)
            return  res.status(200).json(getDiet);
        }
    } catch (err) {
        console.error(err);
    }
};

module.exports = {
    getAllDiets
};