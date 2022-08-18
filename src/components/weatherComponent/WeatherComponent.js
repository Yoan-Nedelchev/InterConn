import styles from './WeatherComponent.module.css'
import image from './icons/partlyCloudy.png'

const WeatherComponent = ({ value }) => {
    console.log(value)
    let dateTime = Date(value.dateTimeEpoch).split(" ").slice(0, 4)
    dateTime = `${dateTime[0]}, ${dateTime[2]} ${dateTime[1]} ${dateTime[3]}`
    console.log(dateTime)
    return (
        <div className={styles["main-container"]}>
            <p className={styles.date}>{value.datetime}</p>
            <p className={styles.description}>{value.description}</p>
            <div className={styles["weather-container"]}>
                <div className={styles["image-container"]}>
                    <img src={image} />
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