import React from "react";
import Data from "./Data";

export default function Home(){
    return ( <div>
        {
            Data.map((value) => {
                return(
                <div>
                {value.id}{value.name}{value.age}
                <img src={value.image}/>
                </div>)
            })
        }
    </div>)
}