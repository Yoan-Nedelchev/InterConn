import styles from './AddPublication.module.css'
import * as api from '../../services/api/data'
import DateTimePicker from 'react-datetime-picker'
import React, { useState } from 'react';
import Datetime from 'react-datetime';

const AddPublication = () => {
    const [startingDate, onChangeStart] = useState(new Date())
    const [endDate, onChangeEnd] = useState(new Date())
    const onSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target.parentElement);

        const title = formData.get("title")
        const category = formData.get("category")
        const description = formData.get("descr")
        const location = formData.get("location")

        console.log(startingDate)

        let filledStartData = startingDate.toString().split(" ")
        const filledStartDate = filledStartData[2] + "/" + filledStartData[1] + "/" + filledStartData[3]
        const filledStartTime = filledStartData[4].slice(0, 5)
        const startCombined = filledStartDate + ", " + filledStartTime + "h"

        let filledEndData = endDate.toString().split(" ")
        const filledEndDate = filledEndData[2] + "/" + filledEndData[1] + "/" + filledEndData[3]
        const filledEndTime = filledEndData[4].slice(0, 5)
        const endCombined = filledEndDate + ", " + filledEndTime + "h"

        console.log(filledEndDate)

        // const filledEndDate = endDate.split("")[0] 
        // const filledStartTime = startingDate.slice(-6, -13)
        // const filledEndTime = endDate.split(-6, -13)

        // const date = filledStartDate + " " + filledStartTime
        // const time = filledEndDate + " " + filledEndTime

        const contactInfo = formData.get("contactInfo")
        const about = formData.get("about")

        const data = {
            title,
            description,
            location,
            date: startCombined,
            time: endCombined,
            contactInfo,
            about,
            category, 
            startingDate,
            endDate,
        }
        return api.createPublication(data)
    }

    return (

        <div className={styles.container}>
            <h1>ADD A PUBLICATION</h1>
            <form className={styles['login-form']}>
                {/* <label for="username">Username:</label> */}
                <input type="text" id="title" name="title" placeholder="Title" />
                <select className={styles.categories} name="category" id="category">
                    <option value="Category">Select a category</option>
                    <option value="Meetups">Meetups and Nightlife</option>
                    <option value="Learning">Learning and Education</option>
                    <option value="Sports">Sports</option>
                    <option value="Music">Music</option>
                    <option value="Travel">Travel</option>
                    <option value="Networking">Networking</option>
                    <option value="Other">Other</option>
                </select>
                <textarea id="descr" name="descr" rows="3" placeholder="Description" />
                <input type="text" id="location" name="location" placeholder="Location" />
                <div className={styles["date-time"]}>
                    <div className={styles.start}>
                        <label>Start</label>
                        <Datetime className={styles.datetime} onChange={onChangeStart} />
                    </div>
                    <div className={styles.end}>
                        <label>End</label>
                        <Datetime className={styles.datetime} onChange={onChangeEnd} />
                    </div>
                </div>
                <textarea id="contactInfo" name="contactInfo" rows="3" placeholder="Contact Information" />
                <textarea id="about" name="about" rows="3" placeholder="Share something about you.." />
                <input className={styles.button} type="submit" onClick={onSubmit} value="SUBMIT" />
            </form>
        </div>
    )
}

export default AddPublication