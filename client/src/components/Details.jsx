// import React, { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { Link } from "react-router-dom";
// import { getDetails } from "../actions/";
// import Loading from "./Loading";
// import styles from './Details.module.css'
// import imagen from '../images/nota.png'

// export default function Detail(props) {

//     let detailRecipe = useSelector(state => state.detail)


//     const dispatch = useDispatch();

//     useEffect(() => {
//         dispatch(getDetails(props.match.params.id));

//     }, [dispatch, props.match.params.id]);

//     const receta = useSelector((state) => state.detail);

//     console.log(receta)
//     const descript = receta[0].summary;
//     console.log(descript)
//     return (
//         <div className={styles.container}>
//             {!receta ? (<Loading />) : (
//                 <div>
//                     <h1>{detailRecipe[0].name}</h1>
//                         <div className={styles.card}>
//                             <img src={detailRecipe[0].image} alt="error al cargar la imagen" />

//                             <h2>Dish type:</h2>
//                             <ul>
//                                 {detailRecipe[0].dishTypes?.map((e) => {
//                                     return <p>{e}</p>;
//                                 })}
//                             </ul>

//                             <h2>Type Diets:</h2>
//                             <ul>
//                                 {detailRecipe[0].diets?.map((e) => {
//                                     return <p>{e}</p>;
//                                 })}
//                             </ul>
//                                 <h2>Health Score : {detailRecipe[0].healthScore}</h2>
//                         </div>

//                         <div className={styles.recipe}>
//                             <img src={imagen} alt="error" />
//                             <h2>Steps: </h2>
//                             <p>{detailRecipe[0].steps}</p>
//                         </div>

//                         <div className={styles.resumen}>
//                             <h2>Summary</h2>
//                             <p dangerouslySetInnerHTML={{ __html: descript }} />
//                         </div>          

//                     <Link to="/home">
//                         <button>Volver</button>
//                     </Link>

//                 </div>
//             )}



//         </div>
//     );
// }


import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDetails  } from "../actions";
import { useEffect } from "react";
import styles from './Details.module.css'
import imagen from '../images/nota.png'
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

            : <h3>cargando</h3>}

        
        </div> 
    )
}
