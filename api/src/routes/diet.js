const {Router} = require('express')
const { getAllDiets } = require('../controllers/dietController');


const router = Router()




// router.get("/diets", getAllDiets);
router.get('/diets', async (req, res) => {
    try {
        let theDiet = await getAllDiets()
        res.status(200).json(theDiet)
    } catch (err) {
        res.status(400).send(err)
    }
});

// router.get('/diets', async (req, res) => {

//     const allDiets = await getAllDiets();

//      allDiets.forEach(el => {
//         Diet.findOrCreate({
//             where: {
//               name: el,
//             },
//           });
//     })

//     const diets = await Diet.findAll();
//     res.send(diets);

// });

module.exports = router;