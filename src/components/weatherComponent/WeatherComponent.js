import styles from './WeatherComponent.module.css'

import snow from './icons/snow.png'
import rain from './icons/rain.png'
import fog from './icons/fog.png'
import wind from './icons/wind.png'
import cloudy from './icons/cloudy.png'
import partlyCloudyDay from './icons/partly-cloudy-day.png'
import partlyCloudyNight from './icons/partly-cloudy-night.png'
import ClearDay from './icons/clear-day.png'
import ClearNight from './icons/clear-night.png'

const WeatherComponent = ({ value }) => {
    console.log(value)
    let icon
    
    if (value.icon == "snow") {
        icon = snow
    }
    if (value.icon == "rain") {
        icon = rain
    }
    if (value.icon == "fog") {
        icon = fog
    }
    if (value.icon == "wind") {
        icon = wind
    }
    if (value.icon == "cloudy") {
        icon = cloudy
    }
    if (value.icon == "partly-cloudy-day") {
        icon = partlyCloudyDay
    }
    if (value.icon == "partly-cloudy-night") {
        icon = partlyCloudyNight
    }
    if (value.icon == "clear-day") {
        icon = ClearDay
    }
    if (value.icon == "clear-night") {
        icon = ClearNight
    }

    let dateTime = Date(value.dateTimeEpoch).split(" ").slice(0, 4)
    dateTime = `${dateTime[0]}, ${dateTime[2]} ${dateTime[1]} ${dateTime[3]}`
    console.log(dateTime)
    return (
        <div className={styles["main-container"]}>
            <p className={styles.date}>{value.datetime}</p>
            <p className={styles.description}>{value.description}</p>
            <div className={styles["weather-container"]}>
                <div className={styles["image-container"]}>
                    <img src={icon} />
                </div>
                <div className={styles["weather-data"]}>
                    <div className={styles["max-temp"]}>
                        <p className={styles.title}>Max</p>
                        <p className={styles.secondary}>{value.tempmax} C</p>
                    </div>
                    <div className={styles["min-temp"]}>
                        <p className={styles.title}>Min</p>
                        <p className={styles.secondary}>{value.tempmin} C</p>
                    </div>
                    <div className={styles["rain"]}>
                        <p className={styles.title}>Precip.</p>
                        <p className={styles.secondary}>{value.precip} %</p></div>
                    <div className={styles["wind"]}>
                        <p className={styles.title}>Wind</p>
                        <p className={styles.secondary}>{value.windspeed} km/h</p>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default WeatherComponent