import React from 'react'
import Newcomponent from './Newcomponent';

export default function Readmore(data) {
    return (
        <div className='col-4'>
            <div className="card" style={{ width: "18rem" }}>
                <img src={data.myData.image} className="card-img-top" alt="" />
                <div className="card-body">
                    <h5 className="card-title">{data.myData.name}</h5>
                    <Newcomponent
                    myinfo = {data.myData.info}/>
                    <a href="#" className="btn btn-primary">{data.myData.price}</a>
                </div>
            </div>
        </div>
    )
}

