import React, { useState } from 'react'

export default function Newcomponent(pera) {
    const [infoData, setInfoData] = useState(false);
    const togleBtn = () => {
        setInfoData(y => !y)
    }
    if (pera.myinfo.length > 532) {
        return (
            <div>
                <p className="card-text">{infoData ? pera.myinfo : pera.myinfo.substr(0, 475)}</p>
                <button onClick={() => { togleBtn() }}>Readmore</button>
            </div>
        )
    } else {
        return (
            <div>
                <p className="card-text">{infoData ? pera.myinfo : pera.myinfo.substr(0, 475)}</p>
            </div>
        )
    }
}
