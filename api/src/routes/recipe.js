const { Router } = require('express')
const { getAllRecipes } = require('../controllers/recipeController');
const { Recipe, Diet } = require('../db')

const router = Router()

//RUTA PARA MOSTRAR LAS RECETAS

router.get('/recipes', async (req, res) => {

  const { name } = req.query;
  try {
    let allRecipes = await getAllRecipes();
    if (name) {
      let filterName = allRecipes.filter(el => el.name.toLowerCase().includes(name.toLowerCase()))
      filterName ? res.status(200).send(filterName) : res.status(404).send('No existe una receta con ese nombre')
    }
    else {
      res.status(200).send(allRecipes)
    }
  } catch (err) {
    res.status(404).send('SE TE ACABARON LAS CONSULTAS DE ESTA APIKEY')
  }

})

//RUTA PARA MOSTRAR RECETA POR ID (DETAILS)

router.get('/recipes/:idRecipe', async (req, res) => {

  try {
    const { idRecipe } = req.params;
    let allRecipes = await getAllRecipes()
    if (idRecipe) {
      const filterId = await allRecipes.filter(el => el.id == idRecipe)
      filterId.length ? res.status(200).json(filterId) :
        res.status(404).send("No existe una receta con ese ID")
    }
    res.status(200).json(allRecipes);
  } catch (err) {
    console.log(err)
  }
})

//RUTA PARA CREAR RECETAS

router.post("/recipes", async (req, res) => {
  let { name, image, diets, dishTypes, healthScore, steps, summary } = req.body;

  try {
    let newRecipe = await Recipe.create({
      name,
      image,
      dishTypes,
      healthScore,
      steps,
      summary
    });
    let dbDiets = await Diet.findAll({
      where: { name: diets },
    });
    newRecipe.addDiet(dbDiets);
    res.status(201).send("Receta creada exitosamente");
  } catch (err) {
    res.status(404).send(err)
    console.log(err)

  }
});

//RUTA PARA ELIMINAR UNA RECETA

router.delete('/:id', async (req, res) => {
  try {
      let { id } = req.params;
      await Recipe.destroy({
          where: { id }
      })
      res.status(201).json('Receta eliminada con éxito')
  } catch (err) {
      res.status(418).json(err.message)
  }
})

module.exports = router;