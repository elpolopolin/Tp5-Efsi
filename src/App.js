import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import React, { useState, useEffect } from "react";

function App() {

  const [paises, setPaises] = useState([]);
  const [handleIniciar, setHandleIniciar] = useState(false);
  const [rValue, setRValue] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const [puntos, setPuntos] = useState(0);
  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const CargarBanderas = async () => {
    axios
      .get("https://countriesnow.space/api/v0.1/countries/flag/images")
      .then((result) => {
        const Data = result.data.data;
        setPaises(Data);
      })
      .catch((error) => {
        console.log(error);
      });
      
  };

  const cargarRandom = () => {
    var rand = Math.floor(Math.random()*paises.length);
    setRValue(paises[rand]);
    console.log(paises[rand]);
    setHandleIniciar(true);
  }

  const verificar = (input) => {
    console.log(input)
    if (input == rValue.name){
      cargarRandom();
      setPuntos(puntos + 1);
    }
    else {

    }
    setInputValue("");
  }

  useEffect(() => {
    CargarBanderas()
  }, []);


  return (
    <div className="App">
      <div className="container ">
        {!handleIniciar && ( //Inicio Juego
        <div>
          <header>
            <h1 className='text-white'>Juego De Adivinar Bandera</h1>
            <br></br>
          </header>
          <button onClick={() => cargarRandom()}>Comenzar juego</button>
            {paises.map((pais) => (     
              <div className=''> 
                </div>
              ))}; 
        </div>
        )}
      {handleIniciar && (                        //Juego
          <div>
            <p className='text-white'>{puntos}</p>
            <br></br>
            <img src={rValue.flag} style={{height: "500px", width: "auto"}} />
            <p className='text-white'>Ingrese el nombre del pais:</p>
            <input value={inputValue} onChange={handleInputChange}></input> <button onClick={() => cargarRandom()} className='btn btn-danger'>Saltar</button><button onClick={() => verificar(inputValue)} className='btn btn-success'>Ok</button> 
          </div>
      )}
    </div>
    </div>
    );
}

export default App;
