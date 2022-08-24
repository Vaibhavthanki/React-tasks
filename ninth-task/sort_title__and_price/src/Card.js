import React from 'react'

export default function Card(data) {
    return (
        <div className='col-4'>
            <div className="card" style={{ width: "18rem" }}>
                <img src={data.myData.image} className="card-img-top" alt="" />
                <div className="card-body">
                    <h5 className="card-title">{data.myData.title}</h5>
                    <a href="#" className="btn btn-primary">{data.myData.price}</a>
                </div>
            </div>
        </div>
    )
}
