import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import LTrain from '../../_assets/L.png'
import fourTrain from '../../_assets/4.png'
import fiveTrain from '../../_assets/5.png'
import sixTrain from '../../_assets/6.png'

const Dashboard = () => {
    const [ today, setToday ] = useState(null)
    const [ forecast, setForecast ] = useState(null)
    const [ southBoundL, setSouthBoundL ] =useState(null)
    const [ northBoundL, setNorthBoundL] = useState(null)


    // fetch from weather api and store in P
    useEffect(() => {
        fetch('/api/weather')
            .then((response) => response.json())
            .then((output) => {
                console.log(output)
                setToday(output.current)
                setForecast(output.forecast.forecastday)
            })
    }, [])

    // fetch from train api and store in state and render

    useEffect(() => {
        console.log('using train time effect')
        fetch('/api/trains')
            .then((response) => response.json())
            .then((output) => {
                console.log('THIS IS THE OUTPUT', output)
                const now =  new Date();
                const nNext = new Date (output.L03N[0])
                const sNext = new Date (output.L03S[0])

                const nDiff = Math.floor(((nNext - now) / (1000 * 60)))
                const sDiff = Math.floor(((sNext - now) / (1000 * 60)))
                setNorthBoundL(nDiff)
                setSouthBoundL(sDiff)
            })
    }, [])

    if (!forecast) return null;

    return (
        <div className='mainContainer'>
            <div className='weather'>
                <div className='todayForecast'>
                    <h3>Forecast</h3>
                    <p>Current: {today.temp_f}</p> 
                    <p>High:   {forecast[0].day.maxtemp_f}</p>
                    <p>Low:   {forecast[0].day.mintemp_f}</p>
                    <p>Conditions:   {today.condition.text}</p>
                    <img src={today.condition.icon}></img>
                </div>
                <div className='futureForecast'>
                    <div className='tomorrow'>
                        <h3>Tomorrow</h3>
                        <p>High:   {forecast[1].day.maxtemp_f}</p>
                        <p>Low:   {forecast[1].day.mintemp_f}</p>
                        <p>Average:   {forecast[1].day.avgtemp_f}</p>
                        <p>Conditions:   {forecast[1].day.condition.text}</p>
                        <img src={forecast[1].day.condition.icon}></img>
                    </div>
                    <div className='dayAfter'>
                        <h3>Day After</h3>
                        <p>High:   {forecast[2].day.maxtemp_f}</p>
                        <p>Low:   {forecast[2].day.mintemp_f}</p>
                        <p>Average:   {forecast[2].day.avgtemp_f}</p>
                        <p>Conditions:   {forecast[2].day.condition.text}</p>
                        <img src={forecast[2].day.condition.icon}></img>
                    </div>
                </div>
            </div>
            <div className='trainInfo'>
                <h2>Train Info</h2>
                <h3>14th St - Union Square</h3>
                <div>
                    <img className='trainIcon' src={LTrain}></img>
                    <p> 8 Av: {northBoundL} min</p>
                    <p> Canarsie Rockaway Pkwy: {southBoundL} min</p>
                </div>
                <div>
                    <img className='trainIcon' src={fourTrain}></img>
                    <p> Woodlawn: 4 min</p>
                    <p> Bowling Green: 6 min</p>
                </div>
                <div>
                    <img className='trainIcon' src={fiveTrain}></img>
                    <p> Eastchester Dyre Av: 1 min</p>
                    <p> Bowling Green: 3 min</p>
                </div>
                <div>
                    <img className='trainIcon' src={sixTrain}></img>
                    <p> Pelham Bay Park: 5 min</p>
                    <p> Brooklyn Bridge City Hall: 3 min</p>
                </div>
            </div>
        </div>
    )
}

export default Dashboard;