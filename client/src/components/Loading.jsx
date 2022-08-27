import React from 'react'
import styles from './Loading.module.css'
import imagen from "../images/cooking.gif"

export default function LoadingPage() {
    return (
        <div>
             <div className={styles.loading}>
            <img src={imagen}></img>
            <h1>CARGANDO...</h1>
            </div>
            <div className={styles.wave}>
                <div style={{height: '80px', overflow: 'hidden'}}>
                    <svg viewBox="0 0 500 150" preserveAspectRatio="none" style={{ height: '100%', width: '100%'}}>
                        <path d="M0.00,49.99 C150.00,150.00 349.21,-49.99 500.00,49.99 L500.00,150.00 L0.00,150.00 Z"></path>
                    </svg>
                </div>
            </div>
        </div>
       
        
    )
}