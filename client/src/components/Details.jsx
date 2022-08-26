// import React from "react";
// import { Link } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { getDetails } from "../actions";
// import { useEffect } from "react";
// import styles from './Details.module.css'
// import imagen from '../images/nota.png'
// import Loading from './Loading'
// export default function Detail(props) {

//     const dispatch = useDispatch();
//     useEffect(() => {
//         dispatch(getDetails(props.match.params.id))
//     }, [dispatch]);

//     const myRecipe = useSelector((state) => state.detail);
//     console.log(myRecipe)

//     return (
//         <div>

//             <hr></hr>

//             {myRecipe.length > 0 ?

//                 <div className={styles.container}>

//                     <h1>{myRecipe[0].name}</h1>

//                     <div className={styles.card}>

//                         <img src={myRecipe[0].image} alt="img no encontrada" />
//                     </div>

//                     <div className={styles.cards}>

//                         <h2>Dish type:</h2>
//                         <ul>
//                             {myRecipe[0].dishTypes?.map((e) => {
//                                 return <p>{e}</p>;
//                             })}
//                         </ul>

//                         <h2>Type Diets:</h2>
//                         <ul>
//                         {myRecipe[0].diets && myRecipe[0].diets.map(el => el.name.toUpperCase() + ", ")}
//                         </ul>
//                         <h2>Health Score : {myRecipe[0].healthScore}</h2>
//                         <div className={styles.recipe}>
//                             <img src={imagen} alt="error" />
//                             <h2>Steps: </h2>
//                             <p>{myRecipe[0].steps}</p>
//                             <h2>Summary: </h2>
//                             <div dangerouslySetInnerHTML={{ __html: myRecipe[0].summary }} />
//                         </div>
//                     </div>

//                     <Link to='/home'>
//                         <button>Volver</button>
//                     </Link>

//                 </div>

//                 : <div><Loading /></div>}


//         </div>
//     )
// }


import React from "react";
import { Link, useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getDetails, getClean } from "../actions";
import styles from "./Details.module.css"


export default function Detail() {
   const dispatch = useDispatch()
   const { id } = useParams()
   

   useEffect(() => {
      dispatch(getDetails(id))  //props.match.params.id
      return ()=>{dispatch(getClean())}  //BLANQUEO EL ESTADO GLOBAL
   }, [dispatch, id])                 

   const myRecipe = useSelector(state => state.detail)

  

   return (
      <div className={styles.container}>
         <Link to='/home'>
            <button className={styles.button}
            >HOME</button>
         </Link>

         <div className={styles.borde}>
            {myRecipe.length > 0 ?
               <div>
                  <h1 className={styles.h1}
                  >{myRecipe[0].name && myRecipe[0].name}</h1>  
                  <img className={styles.img}
                     src={myRecipe[0].image ? myRecipe[0].image : 'https://images.unsplash.com/photo-1542010589005-d1eacc3918f2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1492&q=80'} alt="no se encontro la imagen" />
                  <div>
                     <h5 className={styles.titles}>Tipe of diet:</h5>
                     <h2>{myRecipe[0].diets && myRecipe[0].diets.map(el => el.name.toUpperCase() + ", ")}</h2>
                  </div>
                  <div>
                     <h5 className={styles.titles}>Dish type:</h5>
                     <h3 className={styles.dt}>{myRecipe[0].dishTypes?.map((e) => {
                                                return <p>{e}</p>;
                                                })}</h3>
                  </div>
                  <div>
                     <h5 className={styles.titles}>Summary:</h5>
                     <h3 className={styles.summary}> <div dangerouslySetInnerHTML={{ __html: myRecipe[0].summary }} /></h3>
                  </div>
                  <div>
                     <h5 className={styles.titles}>Health Score:</h5>
                     <h2>{myRecipe[0].healthScore && myRecipe[0].healthScore}</h2>
                  </div>
                  <div>
                     <h5 className={styles.titles}>Steps:</h5>
                     <h4 className={styles.steps}>{myRecipe[0].steps}</h4>
                  </div>
               </div> : <p>LOADING...</p>
            }

         </div>
      </div>

   //detail ->  array de obj
   )
}