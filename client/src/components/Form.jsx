import React, { useState, useEffect } from 'react';
// import { postRecipe, getDiets } from '../actions'
import { useDispatch, useSelector } from 'react-redux';
import NavBar from './NavBar';
import styles from './Form.module.css'
import { Link } from 'react-router-dom';


export default function PokeCreate() {
    const dispatch = useDispatch();
    const allTypes = useSelector((state) => state.pokemonsTypes)

    const [input, setInput] = useState({
        name: "",
        hp: 0,
        attack: 0,
        defense: 0,
        speed: 0,
        height: 0,
        weight: 0,
        types: [],
        img: ""
    })

    // useEffect(() => {
    //     dispatch(getDiets())
    // }, [dispatch])

    function handleChange(e) {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
    }
    
    function handleSelect(e) {
        setInput({
            ...input,
            types: [...input.types, e.target.value]
        })
    }

    function handleSubmit(e) {
      
        if (!input.name || input.name.length <= 2 || input.name.length > 15) {
            e.preventDefault();
            return alert("Debe ingresar un nombre que contenga entre 2 y 15 caracteres")
        } else if (!input.types.length) {
            e.preventDefault();
            return alert('Selecciona al menos un tipo de dieta')
        } else if (input.img.length === 0){
            e.preventDefault();
            return alert('Debe ingresar la URL de la imagen')
        }else if(!(/https:\/\/[a-zA-Z./-]+/gm).test(input.img)) {
            e.preventDefault();
            return alert('Debes ingresar una URL válida')
        } else if(!input.hp || input.hp.length <= 0 || input.hp.length > 100){
            e.preventDefault();
            return alert('Debes asignar un nivel de vida entre 1 y 100!')
        }else if(!input.attack || input.attack.length <= 0 || input.attack.length > 100){
            e.preventDefault();
            return alert('Debes asignar un nivel de ataque entre 1 y 100!')
        }else if(!input.defense || input.defense.length <= 0 || input.defense.length > 100){
            e.preventDefault();
            return alert('Debes asignar un nivel de defensa entre 1 y 100!')
        }else if(!input.speed || input.speed.length <= 0 || input.speed.length > 100){
            e.preventDefault();
            return alert('Debes asignar un nivel de velocidad entre 1 y 100!')
        }else if(!input.height || input.height.length <= 0 || input.height.length > 100){
            e.preventDefault();
            return alert('Debes asignar una altura entre 1 y 100!')
        }else if(!input.weight || input.weight.length <= 0 || input.weight.length > 100){
            e.preventDefault();
            return alert('Debes asignar un peso entre 1 y 100!')
        }
        dispatch((input))
        alert("Tu Pokemon ha sido creado con éxito!")
        setInput({
            name: "",
            hp: 0,
            attack: 0,
            defense: 0,
            speed: 0,
            height: 0,
            weight: 0,
            types: [],
            img: ""
        })
    }

    function handleClear(){
        document.getElementById("miForm").reset();
    }

    let handleDelete = (type) => {
        setInput({
            ...input,
            types: input.types.filter(el => el !== type)
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
                                <option value="" hidden name="types">Elegí los tipos de dietas:</option>
                                {
                                    allTypes?.map(el => {
                                        return (<option value={el.name} key={el.id}>{el.name}</option>)
                                    })
                                }
                            </select>
                            <ul style={{ listStyle: 'none' }}>
                                <li>
                                    {
                                        input.types.map(el =>
                                            <div>
                                                <h5>
                                                    {allTypes?.find(p => p.name === el)?.name}
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
                            <input type="number" name="hp" onChange={handleChange} style={{ width: '100px', height: '60px', fontSize:'15px', textAlign:'center' }} min="1" max="100"  required />
                        </div>
                        <br />
                        <div>
                            <label>Resumen del plato:</label>
                            <input type="text" name="attack" onChange={handleChange} style={{ width: '300px', height: '100px', fontSize:'15px', textAlign: 'left' }} min="1" max="100"  />
                            
                        </div>
                        <br />
                        <div>
                            <label>Paso a paso:</label>
                            <input type="text" name="defense" onChange={handleChange} style={{ width: '300px', height: '150px', fontSize:'15px' }} min="1" max="100" required/>
  
                        </div>
                    </div>
                </form>
              <button id='submit' type='submit' onClick={(e) => handleSubmit(e)}>CREAR</button>
                <button type="reset" onClick={(e) => handleClear(e)}>LIMPIAR</button>
            </div>
        </div>
    )


}
