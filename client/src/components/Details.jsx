import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDetails  } from "../actions";
import { useEffect } from "react";
import styles from './Details.module.css'
import imagen from '../images/nota.png'
import Loading from './Loading'
export default function Detail(props) {

    const dispatch= useDispatch();
    useEffect(() => {
        dispatch(getDetails(props.match.params.id))
    },[dispatch]);

    const myRecipe = useSelector((state) => state.detail);
    console.log(myRecipe)

    return(
        <div>

            <hr></hr>
            
            {myRecipe.length>0 ?

                <div className={styles.container}>
                    
                    <h1>{myRecipe[0].name}</h1>

                    <div className={styles.card}>
    
                        <img src={myRecipe[0].image} alt="img no encontrada" />
                    </div>

                    <div className={styles.cards}>
                       
                    <h2>Dish type:</h2>
                            <ul>
                                 {myRecipe[0].dishTypes?.map((e) => {
                                    return <p>{e}</p>;
                                })}
                            </ul>

                            <h2>Type Diets:</h2>
                            <ul>
                                {myRecipe[0].diets?.map((e) => {
                                    return <p>{e}</p>;
                                })}
                            </ul>
                                <h2>Health Score : {myRecipe[0].healthScore}</h2>
                         <div className={styles.recipe}>
                             <img src={imagen} alt="error" />
                            <h2>Steps: </h2>
                             <p>{myRecipe[0].steps}</p>
                         </div>
                    </div>
               
                    <Link to= '/home'>
                        <button>Volver</button>
                    </Link>

                </div> 

            : <div><Loading/></div>}

        
        </div> 
    )
}
