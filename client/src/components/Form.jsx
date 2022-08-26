import React, { useState, useEffect } from 'react';
import { postRecipe, getDiets } from '../actions'
import { useDispatch, useSelector } from 'react-redux';
import styles from './Form.module.css'
import { Link } from 'react-router-dom';


export default function RecipeCreate() {
    const dispatch = useDispatch();
    const diets = useSelector((state) => state.diets)
    console.log(diets)

    const [input, setInput] = useState({
        name: "",
        img: "",
        healthScore: 1,
        summary: "",
        steps: "",
        diets: []
    })

    useEffect(() => {
        dispatch(getDiets())
    }, [dispatch])

    function handleChange(e) {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
    }
    
    function handleSelect(e) {
        setInput({
            ...input,
            diets: [...input.diets, e.target.value]
        })
    }

    function handleSubmit(e) {
      
        if (!input.name || input.name.length <= 2 || input.name.length > 15) {
            e.preventDefault();
            return alert("Debe ingresar un nombre que contenga entre 2 y 50 caracteres")
        } else if (!input.diets.length) {
            e.preventDefault();
            return alert('Selecciona al menos un tipo de dieta')
        } else if (input.img.length === 0){
            e.preventDefault();
            return alert('Debe ingresar la URL de la imagen')
        }else if(!(/https:\/\/[a-zA-Z./-]+/gm).test(input.img)) {
            e.preventDefault();
            return alert('Debes ingresar una URL válida')
        } else if(!input.healthScore || input.healthScore.length <= 0 || input.healthScore.length > 10){
            e.preventDefault();
            return alert('Debes asignar un nivel de Health Score entre 1 y 10!')
        }else if(!input.summary || input.summary.length <= 0 || input.summary.length > 100){
            e.preventDefault();
            return alert('El resumen del plato debe contener al menos 20 caracteres!')
        }else if(!input.steps || input.steps.length <= 0 || input.steps.length > 100){
            e.preventDefault();
            return alert('El tipo de plato debe contener al menos 10 caracteres!')
        }
        dispatch(postRecipe(input))
        alert("Tu receta ha sido creada con éxito!")
        setInput({
            name: "",
            img: "",
            healthScore: 1,
            summary: "",
            steps: "",
            diets: []
        })
    }

    function handleClear(){
        document.getElementById("miForm").reset();
    }

    let handleDelete = (diet) => {
        setInput({
            ...input,
            diets: input.diets.filter(el => el !== diet)
        })
    }

    return (
        <div className={styles.container}>
            <Link to='/home'>
                <h1 style={{textDecoration: 'none' }}>#HenryFood</h1>
            </Link>
            <div className={styles.cards}>
                <h2>CREÁ TU RECETA</h2>

                <form id="miForm" onSubmit={(e) => handleSubmit(e)}>
                    <div>
                        <div>
                            <label>Nombre:</label>
                            <input type="text" maxlength="15" id='7' value={input.name} name="name" placeholder='Nombre de tu receta' onChange={(e) => handleChange(e)} style={{width: '300px', fontSize:'15px', textAlign:'center' }}  />
                        </div>
                        
                        <div >
                            <label>Tipos de dietas</label>
                            <select id='8' onChange={(e) => handleSelect(e)} style={{width: '300px', fontSize:'15px', textAlign: 'center'}}>
                                {console.log(diets)}
                                <option value="" hidden name="diets">Elegí los tipos de dietas:</option>
                                {
                                    diets?.map(el => {
                                        return (<option value={el.name} key={el.id}>{el.name}</option>)
                                        
                                    })
                                }
                                 
                            </select>
                            <ul style={{ listStyle: 'none' }}>
                                <li>
                                    {
                                        input.diets.map(el =>
                                            <div>
                                                <h5>
                                                    {diets?.find(p => p.name === el)?.name}
                                                    <button onClick={() => handleDelete(el)}>x</button>
                                                </h5>
                                            </div>
                                        )
                                    }
                                </li>
                            </ul>
                            {
                               
                            }
                        </div>

                        <div>
                            <label>Imagen:</label>
                            <input type="url" id='9' value={input.img} name="img" placeholder='Ingresá el URL de una imagen...' onChange={(e) => handleChange(e)} style={{width: '300px', fontSize:'15px', textAlign:'center' }} />
                        </div>

                    </div>
                    <div>

                        <div>
                            <label>Nivel de "comida saludable" :</label>
                            <input type="number" name="healthScore" onChange={handleChange} style={{ width: '100px', height: '60px', fontSize:'15px', textAlign:'center' }} min="1" max="100"  required />
                        </div>
                        <br />
                        <div>
                            <label>Resumen del plato:</label>
                            <input type="text" name="summary" onChange={handleChange} style={{ width: '300px', height: '100px', fontSize:'15px', textAlign: 'left' }} min="1" max="100"  />
                            
                        </div>
                        <br />
                        <div>
                            <label>Paso a paso:</label>
                            <input type="text" name="steps" onChange={handleChange} style={{ width: '300px', height: '150px', fontSize:'15px' }} min="1" max="100" required/>
  
                        </div>
                    </div>
                </form>
              <button id='submit' type='submit' onClick={(e) => handleSubmit(e)}>CREAR</button>
                <button type="reset" onClick={(e) => handleClear(e)}>LIMPIAR</button>
            </div>
        </div>
    )


}
