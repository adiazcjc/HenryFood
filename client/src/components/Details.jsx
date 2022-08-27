import React from "react";
import { Link, useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getDetails, getClean } from "../actions";
import Loading from './Loading'
import styles from "./Details.module.css"


export default function Detail() {
   const myRecipe = useSelector(state => state.detail)
   const dispatch = useDispatch()
   const { id } = useParams()

//    useEffect(() => {
//       dispatch(getDetails(id))
//   }, [dispatch])

useEffect(() => {
   dispatch(getDetails(id));
   return () => {
     dispatch(getClean());
   };
 }, [dispatch, id]);

   return (
      <div  className={styles.container}>
         {myRecipe.length > 0 ?

            <div className={styles.box}>

                  <h1 className={styles.h1}>{myRecipe[0].name && myRecipe[0].name}</h1>

                  <div className={styles.blockOne}>

                     <img className={styles.img} src={myRecipe[0].image} lt="no se encontro la imagen" />

                     <div className={styles.card1}>

                        <h2>Tipe of diets</h2>
                        <h3>{myRecipe[0].diets && myRecipe[0].diets.map(el => el.name.toUpperCase() + ", ")}</h3>

                        <h2>Dish type</h2>
                        <h3>{myRecipe[0].dishTypes ? myRecipe[0].dishTypes?.map((e) => { return <p>{e}</p>; }) : 'No existe DishType'}</h3>

                        <h2>Health Score</h2>
                        <h3>{myRecipe[0].healthScore + "%"}</h3>

                     </div>
                  </div>

                  <div className={styles.blockTwo}>

                     <div className={styles.card}>

                        <h2>Summary</h2>
                        <h3> <div dangerouslySetInnerHTML={{ __html: myRecipe[0].summary }} /></h3>

                        <h2>Steps</h2>
                        <h3>{myRecipe[0].steps}</h3>

                     </div>
                  </div>

                  <Link to='/home'>
                     <button className={styles.button}>Volver</button>
                  </Link>
               </div> : <Loading />
            }
      </div>
      )
}