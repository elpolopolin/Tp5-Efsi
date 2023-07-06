import React from 'react';


function Paises({paises}) {

return (
  <>
  
    <div className='container h-75 w-75 overflow-auto'>
    <h1 className='text-white bg-pink'>Paises</h1>
      <div className='row'>
    {paises.map((pais) => (     
              <div className='col-4 overflow-hidden'>
                <img src={pais.flag} className="h-75 w-50" ></img>
                <p className='text-white'>{pais.name}</p>
                </div>
              ))}
              </div>
    </div>
  </>
)
}

export default Paises;