import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { getRecipes, getClean, filterDiet, orderForName, filterCreatedOrApi, orderForScore } from '../actions';
import { Link } from 'react-router-dom'
import Cards from "./Cards";
import Paginated from "./Paginated";
import Loading from "./Loading"
import NavBar from "./NavBar"
import styles from './Home.module.css'

export default function Home() {

    const dispatch = useDispatch()

    const allRecipes = useSelector((state) => state.recipes)
    const allDiets = useSelector((state) => state.dietsTypes)

    const [currentPage, setCurrentPage] = useState(1)
    const [order, setOrder] = useState("")
    const [recipesForPage, setRecipesForPage] = useState(9)
    const indexLastRecipe = currentPage * recipesForPage;
    const indexFirstRecipe = indexLastRecipe - recipesForPage;
    const currentRecipes = allRecipes.slice(
        indexFirstRecipe,
        indexLastRecipe
    );

    if (currentPage > Math.ceil(allRecipes.length / recipesForPage) &&
        currentPage != 1
    ) {
        setCurrentPage(1)
    }

    const paginated = (numPage) => {
        setCurrentPage(numPage)
    }

    useEffect(() => {
        dispatch(getRecipes())
    }, [dispatch])


    function handleForScore(e) {
        e.preventDefault();
        dispatch(orderForScore(e.target.value));
        setCurrentPage(1);
        setOrder(`Ordenado ${e.target.value}`)
    }

    function handleFilterDiet(e) {
        e.preventDefault();
        dispatch(filterDiet(e.target.value))
        setCurrentPage(1)
    }

    function handleFilterCreatedOrApi(e) {
        e.preventDefault();
        dispatch(filterCreatedOrApi(e.target.value))
        setCurrentPage(1)
    }

    function handleName(e) {
        e.preventDefault();
        dispatch(orderForName(e.target.value))
        setCurrentPage(1)
    }

    const handleReload = () => {
        window.location.reload();
    }

    if (currentRecipes.length === 0) {
        return (
            <div className={styles.home}>
                <div>
                    <Loading />
                </div>
            </div>
        )
    } else {
        return (

            <div className={styles.home}>

                <NavBar />
                <hr></hr>
                <div>
                    <div className={styles.contenedor}>

                        <select className={styles.filterOrder} onChange={e => { handleName(e) }}>
                            <option value='todos'>Ordenar ⇅</option>
                            <option value='asc'>A - Z</option>
                            <option value='desc'>Z - A</option>
                        </select>

                        <select onChange={e => handleForScore(e)}>
                            <option value="all">Ordenar por Score</option>
                            <option value="max">Máximo</option>
                            <option value="min">Mínimo</option>
                        </select>

                        <select onChange={e => handleFilterDiet(e)}>
                            <option value="All">Filtrar por dietas </option>
                            <option value="vegan"> Vegan </option>
                            <option value="dairy free"> Dairy free </option>
                            <option value="lacto ovo vegetarian"> Lacto ovo vegetarian </option>
                            <option value="lacto-Vegetarian"> Lacto-Vegetarian </option>
                            <option value="pescatarian"> Pescatarian </option>
                            <option value="primal"> Primal </option>
                            <option value="paleolithic"> Paleolithic </option>
                            <option value="fodmap friendly"> Fodmap friendly </option>
                            <option value="Ketogenic"> Ketogenic </option>
                            <option value="Whole30"> Whole30 </option>
                        </select>

                        <select onChange={e => handleFilterCreatedOrApi(e)}>
                            <option value="recipes">Creados o Existentes</option>
                            <option value="data_base">Creados</option>
                            <option value="api">Existentes</option>
                        </select>

                        <button onClick={e => { handleReload() }}>⟳</button>

                    </div>

                    <Paginated
                        recipesForPage={recipesForPage}
                        allRecipes={allRecipes.length}
                        paginated={paginated}
                    />
                    <div className={styles.cards} >
                        {
                            currentRecipes?.map(el => {
                                
                                return (
                                    <div>
                                        <Link to={"/recipes/" + el.id} style={{ textDecoration: 'none' }}>
                                            <Cards
                                                id={el.id} 
                                                name={el.name}
                                                image={el.image}
                                                diets={el.diets}
                                                healthScore={el.healthScore}
                                                 />
                                        </Link>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        )
    }
}