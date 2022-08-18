import styles from './HomePage.module.css'
import { useState, useEffect } from 'react'
import WeatherComponent from '../weatherComponent/WeatherComponent';


const HomePage = () => {
    const [weatherData, setWeatherData] = useState([])

    useEffect(() => {
        const getData = async () => {
            const response =
                await fetch("https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/sofia?unitGroup=metric&include=days&key=96YF6XLPP8756GDEAW8J23LVC&contentType=json")
                let result = await response.json()
                let finalData = []
                result = result.days.slice(0, 5)
                for (const value of Object.values(result)) {
                    finalData.push(value)
                }
   
                setWeatherData(finalData)       
        }
        getData()
    }, [])

    return (
        <div className={styles["weather-items"]}>
      
            {weatherData.length > 0 ? 
            Object.entries(weatherData).map(([key, value]) => <WeatherComponent key={key} value={value}/>)
            : 
            null}
        </div>
    );
};

export default HomePage;