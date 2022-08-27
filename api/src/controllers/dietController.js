require("dotenv").config();
const { Diet } = require("../db");

//FUNCION PARA GUARDAR LAS DIETAS EN LA BD

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
            where: { name: el }
        })
    })
    const allTypes = await Diet.findAll()
    res.send(allTypes)
}


module.exports = {
    getAllDiets
};