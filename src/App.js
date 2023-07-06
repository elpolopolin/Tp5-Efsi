import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import React, { useState, useEffect } from "react";
import { BrowserRouter, Link, Routes, Route } from 'react-router-dom';
import Paises from './components/paises';

function App() {

  const [paises, setPaises] = useState([]);
  const [handleIniciar, setHandleIniciar] = useState(false);
  const [rValue, setRValue] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const [inputValue2, setInputValue2] = useState("");
  const [puntos, setPuntos] = useState(0);
  const [timer, setTimer] = useState(15);
  const [ayudaVisible, setAyudaVisible] = useState(false);
  const [mal, setMal] = useState("");
  const [handleNombre, setHandleNombre] = useState(false)
  const [nombre, setNombre] = useState("");

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };
  const handleInputChange2 = (event) => {
    setInputValue2(event.target.value);
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
    setInputValue("");
    setMal("");
    var rand = Math.floor(Math.random()*paises.length);
    setRValue(paises[rand]);
    console.log(paises[rand].name);
    setHandleIniciar(true);
    setTimer(15);
  }

  const verificar = (input) => {
    console.log(input)
    if (input.toLowerCase() == rValue.name.toLowerCase()){
      cargarRandom();
      setMal("");
      if (timer > 10){
        setPuntos(puntos + 2);
      }
      if (timer > 0 && timer <=9){
        setPuntos(puntos + 1);
      }
      if (timer <= 0) {
        setPuntos(puntos + 0.5);
      }
    }
    else { 
      setMal("Incorrecto");
    }
  }

  const ayuda = () => {
    setAyudaVisible(true);
    if (timer > 0){
      setTimer(timer - 2)
    }
   
  };


  useEffect(() => {
    CargarBanderas()
  }, []);

  useEffect(() => { //timer
    if (handleIniciar && timer > 0) {
      const interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [handleIniciar, timer]);

    const Ingreso = (e) => {
      setHandleNombre(true)
      setNombre(e)
    }



  return (
    <div className="App">
      <div className="container ">
        {!handleIniciar && ( //Inicio Juego
        <div>
          <header>
          </header>
          <div className='centrado '>
          <BrowserRouter>
          <Link to='/'><button className='btn btn-light' onClick={() => cargarRandom()}>Comenzar juego</button></Link> 
        <Link to='/paises'> <button className='btn btn-secondary' >Ver Paises</button> </Link> 

          <Routes>
            <Route path='/paises' element={<Paises paises={paises}/>} />
            <Route path='/' element={<></>} />
          </Routes>
          </BrowserRouter>
            
              </div>
        </div>
        )}

      {handleIniciar && (  
        <div>
        {!handleNombre && (
          
        <div className='centrado'>
          <form onSubmit={() => Ingreso(inputValue2)}>
          <input value={inputValue2} onChange={handleInputChange2} placeholder='Nombre'></input>
          </form>
        </div>
        )}

        {handleNombre && (                     
          <div className='container'>
            <b className='text-white'>Puntos: </b> <p className='text-white'>{puntos}</p> <p className="text-danger">Tiempo Restante: {timer} segundos</p>
          
            
            <div className='' style={{height:"500px", width:"auto"}}>
              <img src={rValue.flag} className='h-100 mw-100 ' />
              <br></br> 
              <b className='text-danger mt-1'>{mal}</b>
            </div>
            <br></br>
            <div className='mt-2'>
              <b className='mt-4 mr-4 text-white '>Ingrese el nombre del pais:</b>
              <button onClick={() => ayuda()} className='btn btn-primary'>Ayuda</button>
              <input value={inputValue} onChange={handleInputChange}></input>
                <button onClick={() => cargarRandom()} className='btn btn-danger'>Saltar</button>
                <button onClick={() => verificar(inputValue)} className='btn btn-success'>Ok</button>
            </div>                 

            { ayudaVisible && (
              <div className="modal">
                <div className="modal-content">
                  <b className=''>Ayuda</b>
                  <p>
                    Cantidad de letras: {rValue.name.length}<br />
                    Letra de inicio: <b className='pen'>{rValue.name.charAt(0).toLowerCase()}</b><br />
                    Letra de Final: <b className='pen'>{rValue.name.charAt(rValue.name.length - 1)} </b>
                  </p>
                  
                  <button
                    onClick={() => setAyudaVisible(false)}
                    className="btn btn-primary "
                  >
                    Salir
                  </button>
                </div>
              </div>
              
              )}
            
          </div>
        )}
         
     </div>
         
     )}
    </div>
    </div>
    );
}

export default App;
