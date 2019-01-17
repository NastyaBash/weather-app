import React from 'react'

function Title(props) {  

    const dayTime = new Date(props.time).getHours();

    return (
        <div className={'title ' + (dayTime < 12 ? 'day' : 'night')}> 
            <div className="location">
                {props.city}
                <span>{props.country}</span>
            </div>
            { props.city &&
            <div className="currentTemp">
                {Math.round(props.temperature)}<b>°</b>
                <span className="conditions">{props.condition}</span>
            </div>
            }
        </div>
    )
}

export default Title