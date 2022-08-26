
require("dotenv").config();

const { Diet, Recipe } = require("../db");
const { getAllRecipes } = require("./recipeController");

//-------------------- FUNCION PARA TRAER LAS DIETAS --------------------

// const getAllDiets = async (req, res) => {
//     const recipes = await getAllRecipes();
//     const diets = recipes.map((el) => el.diets);
  
//     diets.map((el) => {
//       el.forEach((name) => {
//         Diet.findOrCreate({
//           where: { name: name },
//         });
//       });
//     });
  
//     const info = await Diet.findAll();
//     const dietsInfo = info.map((el) => el.name);
//     res.send(dietsInfo);
//   };

const getAllDiets = async (req, res) => {
  const diets = [
      "gluten free",
      "dairy free",
      "paleolithic",
      "ketogenic",
      "lacto ovo vegetarian",
      "vegan",
      "pescatarian",
      "primal",
      "fodmap friendly",
      "whole 30",
  ]

  diets.forEach(el => {
      Diet.findOrCreate({ 
          where: { name: el }  //por cada tipo de dieta
      })
  })

  const allTypes = await Diet.findAll()
  res.send(allTypes)
}


module.exports = {
    getAllDiets
};