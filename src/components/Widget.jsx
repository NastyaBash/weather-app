import React from 'react'

function Widget(props) {  
    return (
        <div className="widget">
	        <div className="widget__item icon-humidity">{props.humidity} %</div>
            <div className="widget__item icon-wind-dir">{props.wind_dir}</div>
            <div className="widget__item icon-wind-speed">{props.wind_speed} km/h</div>
            <div className="widget__item icon-cloud">{props.cloud} %</div>
        </div>
    )
}

export default Widget