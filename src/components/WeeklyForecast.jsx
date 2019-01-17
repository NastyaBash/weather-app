import React from 'react'

function WeeklyForecast({ week }) { 
    let days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    return (
        <div>
            <p className="week-title"><span>Week</span></p>
            <table className="week">
                <tbody>
                    { week.map(el => (
                    <tr key={el.date_epoch}>
                        <td>{days[new Date(el.date).getDay()]}</td>
                        <td>{el.day.condition.text}</td>
                        <td>{el.day.maxtemp_c} C°</td>
                        <td>{el.day.mintemp_c} C°</td>
                    </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default WeeklyForecast