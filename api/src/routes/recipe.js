const {Router} = require('express')
const { getAllRecipes, idSearch, getDbInfo } = require('../controllers/recipeController');
const { Recipe,Diet } = require('../db')

const router = Router()

//RUTA PARA MOSTRAR LAS RECETAS

router.get('/recipes', async (req, res) => {

    const {name} = req.query;
    try{
        let allRecipes = await getAllRecipes();
        if(name) {
            let filterName = allRecipes.filter(el => el.name.toLowerCase().includes(name.toLowerCase()))
            filterName ? res.status(200).send(filterName) : res.status(404).send('No existe una receta con ese nombre')
        }
        else {
            res.status(200).send(allRecipes)
        }
    }catch(err){
        res.status(404).send('SE TE ACABARON LAS APIKEY')
    }
    
})


router.get('/recipes/:idRecipe', async (req, res) => {
   
    try {
        const {idRecipe} = req.params;
        let allRecipes = await getAllRecipes()
        if (idRecipe) {
            const filterId = await allRecipes.filter(el => el.id == idRecipe)
           //const filterId = await allRecipes.filter(el => el.id == idRecipe || el.apiId == idRecipe)
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




module.exports = router;