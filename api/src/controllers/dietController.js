
require("dotenv").config();

const { Diet, Recipe } = require("../db");
const { getAllRecipes } = require("./recipeController");

//-------------------- FUNCION PARA TRAER LAS DIETAS --------------------

const getAllDiets = async (req, res) => {
    const recipes = await getAllRecipes();
    const diets = recipes.map((el) => el.diets);
  
    diets.map((el) => {
      el.forEach((name) => {
        Diet.findOrCreate({
          where: { name: name },
        });
      });
    });
  
    const info = await Diet.findAll();
    const dietsInfo = info.map((el) => el.name);
    res.send(dietsInfo);
  };


module.exports = {
    getAllDiets
};