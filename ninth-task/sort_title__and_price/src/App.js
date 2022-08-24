import './App.css';
import React, { useState, useEffect } from "react";
import axios from "axios";
import Card from './Card';

function App() {
  const [data, setData] = useState([]);
  const [value,setValue] = useState(true);
  useEffect(() => {
    axios.get("https://fakestoreapi.com/products")
      .then(y => {
        setData(y.data)
      })
  }, [])
  const sortTitle = () => {
    setData([...data]
      .sort((a, b) => {
       return a.title > b.title ? 1 : -1;
      })
    )
  }
  const sortPrice = () => {
    setValue(!value);

    !value ?
    
    setData([...data]
      .sort((a,b) => {
        if(a.price > b.price){
          return -1;
        }
      }))
      :
      setData([...data]
      .sort((a,b) => {
        if(a.price < b.price){
          return -1;
        }
      }));
  }
  return (
    <div className="App">
      <div className='container'>
        <div className='row'>{
          data.map((value) => {
            return (
              <Card myData={value} />
            )
          })
        }
        </div>
      </div>
      <div className='container'>
        <div className='row'>

          <div className='col-6'>
            <button onClick={() => { sortTitle() }} className="btn btn-primary">Sort</button>
          </div>
          <div className='col-6'>
            <button onClick={() => { sortPrice() }} className="btn btn-primary">Pricesort</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
