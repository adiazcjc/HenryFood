const {Router} = require('express')
const { getAllDiets } = require('../controllers/dietController');

const router = Router()

router.get("/diets", getAllDiets);

module.exports = router;