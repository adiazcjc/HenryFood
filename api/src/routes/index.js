const { Router } = require('express');
const routesRecipe = require('./recipe')
const routesDiet = require('./diet')
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use("/", routesRecipe);
router.use("/", routesDiet);

module.exports = router;
