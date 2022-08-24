import './App.css';
import React, { useEffect, useState } from 'react';

function App() {
  const [data, setApiData] = useState([]);
  const [reload,reloadData] = useState(false);
  useEffect(() => {
    fetch("https://course-api.com/react-tours-project")
      .then(y => y.json())
      .then(y => {
        console.log(y);
        setApiData(y)
      })
  }, [reload])
  const removeRow = (id) => {
    setApiData(data.filter((value,index) => {
      if(id != index){
        return true
      }
    }))
  }
  const reloadAll = () => {
    reloadData(!reload)
  }
  return (
    <div className="App">{
      data.map((element, index) => {
        return (
          <div className='container my-2' key={index} id={index}>
            <div className="d-flex">
              <div className="card" style={{ width: "18rem" }}>
                <img src={element.image} className="card-img-top" alt="..." />
                <div className="card-body">
                  <h5 className="card-title">{element.name}</h5>
                  <p className="card-text">{element.info}</p>
                  <a href="#" className="btn btn-primary">{element.price}</a>,
                </div>
              </div>
              <div>
                <button onClick={() => {removeRow(index)}}>Remove</button>
              </div>
            </div>
          </div>
        )
      })
    }
    <button className='mx-auto btn btn-primary' onClick={() => {reloadAll()}}>Reload all</button>
    </div>
  );
}

export default App;
