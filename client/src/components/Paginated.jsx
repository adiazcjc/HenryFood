import React from "react";
import styles from './Paginated.module.css'

export default function Paginated({recipesForPage,allRecipes,paginated}){
    const numPage = []
    for(let i=1; i<=Math.ceil(allRecipes/recipesForPage); i++){
        numPage.push(i)
    }
    return(
        <nav>
            <ul className={styles.paginated}>
                {numPage &&
                numPage.map(number =>(
                        <li className={styles.nro} key={number}>
                        <a onClick={() => paginated(number)}>{number}</a>
                    </li>
                ))}
            </ul>
        </nav>
    )
}