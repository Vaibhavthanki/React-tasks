import './App.css';
import React , {useState} from "react";

function App() {
  const [data,setData] = useState("This is app and banan and grap");
  const correctData = () => {
    let obj = {
      app : "apple",
      banan : "banana",
      grap : "graps"
    }
    // [this,is,app,and,banan,and,grap]
    setData(
      data.split(" ").map((element) => {
        if(obj.hasOwnProperty(element)){
          return(obj[element])
        }else{
          return(element)
        }
      }).join(" ")
      )
  }
  return (
    <div className="App">
      {data} 
      <button onClick={() => {correctData()}}>Click</button>
    </div>
  );
}

export default App;
