import logo from './logo.svg';
import './App.css';
import React, { useState } from 'react';
function App() {
  const[data,address] = useState({
    city:"Porbandar",
    State:"Gujarat",
    pincode:360579
  });
  const checkadress = () => {
    address({...data,fulladress: data.State+","+data.city+","+data.pincode})
  }
  return (
    <div className="App">
      {data.fulladress} {data.State} {data.city} {data.pincode}
      <button onClick={checkadress}>Show Adress</button>
    </div>
  );
}
export default App;
