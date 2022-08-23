import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { getRecipes } from "../actions";
import { Link } from "react-router-dom";


//----------------------Componentes-------------------------------
import Cards from "./Cards";
import Paginated from "./Paginated";
//----------------------------------------------------------------


export default function CardContain() {
  const dispatch = useDispatch()
  const allRecipes = useSelector((state) => state.recipes);
  const filter = useSelector((state) => state.filters);
//-------------------------- Paginated -----------------------------------------------
  const [filterRecipe,setFilterRecipe] = useState([])
  const [currentPage, setCurrentPage] = useState(1);
  const [recipePerPage, setRecipePerPage] = useState(9);
  const indexLastPage = currentPage * recipePerPage;
  const indexFirstPage = indexLastPage - recipePerPage;
  const currentPK = filterRecipe.slice(indexFirstPage, indexLastPage);
 

  //-------------------------- Funciones --------------------------------------------

  function paginado(pageNumber) {
    setCurrentPage(pageNumber);
  }

//   useEffect(() => {
//     setFilterRecipe(filtered(allRecipes,filter))
//     console.log("todos los recipes",filterRecipe)
//   },[filter]);


//   useEffect(() => {
//     dispatch(refreshDetail([]))
//   },[dispatch]);

  useEffect(() =>{
    dispatch(getRecipes()) 
  },[allRecipes])

  //---------------------------------------------------------------------------------

  return (
    <div>
    <div>
      {currentPK?.map((el) => {
        return (
          <div>
            <Link to={"/home/" + el.id}>
              <Cards  
                id={el.id}
                name={el.name}
                image={el.image}
                diets={el.diets}
                healthScore={el.healthScore} />
            </Link>
          </div>
        );
      })}
      </div>
      <div>
      <Paginated
        recipePerPage={recipePerPage}
        allRecipes={filterRecipe}
        paginado={paginado}
      />
      </div>
    </div>
  );
}