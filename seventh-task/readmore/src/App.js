import './App.css';
import React, { useState,useEffect } from "react";
import Readmore  from './Readmore';
import axios from 'axios'

function App() {
  const [data,setData] = useState([])
    useEffect(() => {
      axios.get("https://course-api.com/react-tours-project")
      .then(y => {
        setData(y.data)
      })
    },[])
  return (
    <div className="App">
      <div className='container'>
        <div className='row'>
        {
        data.map((value) => {
          return (
          <Readmore 
          myData={value}/>
          
          )
        })
      }
        </div>
      </div>
    </div>
  );
}

export default App;
