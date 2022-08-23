const {Router} = require('express')
const { getAllRecipes, idSearch, getDbInfo } = require('../controllers/recipeController');
const { Recipe,Diet } = require('../db')

const router = Router()

//RUTA PARA MOSTRAR LAS RECETAS

router.get('/recipes', async (req, res) => {

    // try{
    //     let recetas= await getAllRecipes()
    //     res.status(200).send(recetas)
    // }catch(err){
    //     res.status(404).send('ERROR DE AXIOS')
    // }

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
   
    // const {idReceta} = req.params
    // let allRecipes = await getAllRecipes()

    // if(idReceta) {
    //     const receta = await allRecipes.filter(lpm => lpm.id == idReceta || lpm.apiId == idReceta)
    //     //const receta = await allRecipes.filter(lpm => lpm.id == idReceta || lpm.apiId == idReceta)
    //     if(receta.length > 0) {
    //         res.status(200).json(receta)
    //     }
    //     else{
    //         res.status(404).send("Perdon Rey no hay nada, pero tu tranqui, intentalo de nuevo")
    //     }
    // }
    // else{
    //     res.status(200).send(allRecipes)
    // }
   
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

// router.post('/recipes', async (req, res) => {

//     let { title, summary, healthScore, steps, img, diets } = req.body;
//     try {
//         let newRecipe = await Recipe.create({
//             title,
//             summary,
//             healthScore,
//             steps,
//             img
//         })

//         let dbDiets = await Diet.findAll({
//             where: { name: diets }
//         })
//         newRecipe.addDiet(dbDiets)
//         res.status(201).json(newRecipe)
//     } catch (e) {
//         console.log(e)
//         res.status(404).send(e)
//     }
// })

router.post("/recipes", async (req, res) => {
    const { name, image, diets, dishTypes, healthScore, steps, summary,
      } = req.body;
    
      try {
        const newRecipe = await Recipe.create({
          name,
          image,
          dishTypes,
          healthScore,
          steps,
          summary,
        });
        console.log(req.body)
        const dbDiets = await Diet.findAll({
          where: { name: diets },
        });
    
        await newRecipe.addDiet(dbDiets);
    
        res.status(201).send("Receta creada exitosamente");
      } catch (err) {
        // res.status(404).send(err)
        
      }
  });





//RUTA PARA MOSTRAR LOS POKEMONES CREADOS

// router.get('/creados', async (req, res) => {
//     try {
//         let creados = await getDbInfo()
//         res.status(200).json(creados)
//     } catch (err) {
//         res.status(400).send(err)
//     }
// })

// router.delete('/:id', async (req, res) => {
//     try{
//         let {id} = req.params
//         await Recipe.destroy({
//             where: {id}
//         })
//         res.status(201).send('PERRITO ELIMINADO')
//     }catch(err){
//         res.status(400).json(err.message)
//     }
// })
module.exports = router;