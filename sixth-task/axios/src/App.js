import './App.css';
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import ReactStars from "react-rating-stars-component";

function App() {
  const [data, setData] = useState([])
  useEffect(() => {
    axios.get("https://fakestoreapi.com/products")
      .then(y => {
        setData(y.data);
      })
  }, [])
  return (
    <div className="App">
      <div className="container">
        <div className="row">
          {
            data.map((value) => {
              return (
                <div className="col-xl-3">
                  <div className="card" style={{ width: "18rem" }}>
                    <img src={value.image} className="card-img-top" alt="" />
                    <div className="card-body">
                      <p className="card-text">{value.rating.rate}</p>
                      <ReactStars count={5} size={24} activeColor={"#ffd700"} isHalf={true} value={value.rating.rate}></ReactStars>
                    </div>
                  </div>
                </div>
              )
            })
          }
        </div>
      </div>
    </div>
  );
}

export default App;
