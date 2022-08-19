import styles from './AddPublication.module.css'
import * as api from '../../services/api/data'
import DateTimePicker from 'react-datetime-picker'
import React, { useState, useEffect } from 'react';
import Datetime from 'react-datetime';
import { useNavigate } from 'react-router-dom'

const AddPublication = () => {
    const nav = useNavigate()
    const [startingDate, onChangeStart] = useState(new Date())
    const [endDate, onChangeEnd] = useState(new Date())
    // STATES
    const [publication, setPublication] = useState({
        title: "",
        description: "",
        location: "",
        imageUrl: "",
        contactInfo: "",
        about: "",
        category: "",
    })

    const [errors, setErrors] = useState({
        titlePassed: true,
        descriptionPassed: true,
        locationPassed: true,
        contactInfoPassed: true,
        aboutPassed: true,
        datePassed: true
    })
    // HOOK THAT CHANGES THE PUBLICATION STATE, DEPENDING ON CHANGES IN DATES
    useEffect(() => {
        const firstDate = new Date(startingDate)
        const secondDate = new Date(endDate)

        let filledStartData = firstDate.toString().split(" ")
        const filledStartDate = filledStartData[2] + "/" + filledStartData[1] + "/" + filledStartData[3]
        const filledStartTime = filledStartData[4].slice(0, 5)
        const startCombined = filledStartDate + ", " + filledStartTime + "h"

        let filledEndData = secondDate.toString().split(" ")
        const filledEndDate = filledEndData[2] + "/" + filledEndData[1] + "/" + filledEndData[3]
        const filledEndTime = filledEndData[4].slice(0, 5)
        const endCombined = filledEndDate + ", " + filledEndTime + "h"

        console.log(firstDate)
        const newPublication = { ...publication, startingDate: firstDate, endDate: secondDate, start: startCombined, end: endCombined }
        console.log(newPublication)
        setPublication(publication => newPublication)

    }, [startingDate, endDate])

    // HANDLER THAT CHANGES THE PUBLICATION STATE ON CHANGE IN ANY INPUT FIELD
    const changeHandler = (e) => {
        const formData = new FormData(e.target.parentElement);
        const title = formData.get("title")
        const category = formData.get("category")
        const description = formData.get("descr")
        const location = formData.get("location")
        const imageUrl = formData.get("imageUrl")
        const contactInfo = formData.get("contactInfo")
        const about = formData.get("about")

        let filledStartData = startingDate.toString().split(" ")
        const filledStartDate = filledStartData[2] + "/" + filledStartData[1] + "/" + filledStartData[3]
        const filledStartTime = filledStartData[4].slice(0, 5)
        const startCombined = filledStartDate + ", " + filledStartTime + "h"

        let filledEndData = endDate.toString().split(" ")
        const filledEndDate = filledEndData[2] + "/" + filledEndData[1] + "/" + filledEndData[3]
        const filledEndTime = filledEndData[4].slice(0, 5)
        const endCombined = filledEndDate + ", " + filledEndTime + "h"

        const data = {
            title,
            description,
            location,
            imageUrl,
            start: startCombined,
            end: endCombined,
            contactInfo,
            about,
            category,
            startingDate,
            endDate,
        }
        console.log(data)
        setPublication(() => data)
    }

    // THE SUBMIT HOOK CALLS A VALIDATION FUNCTION
    const onSubmit = async (e) => {
        e.preventDefault();

        submitValidation();

        if (publication.title != "" && publication.title.length >= 2 &&
            publication.description != "" && publication.description.length >= 10 &&
            publication.location != "" && publication.location.length >= 2 &&
            publication.contactInfo != "" && publication.contactInfo.length >= 10 &&
            publication.about != "" && publication.about.length >= 10) {
            const res = await api.createPublication(publication)
            console.log(res)
            nav(`/categories/${res.category}/${res._id}`)
        } else {
            console.log("empty fields")
            alert("Incorrectly filled data")
        }
    }

    // ON BLUR VALIDATES INDIVIDUAL INPUT FIELDS
    const onBlur = (e) => {

        const startingDateCheck = new Date(publication.startingDate)
        const endDateCheck = new Date(publication.endDate)
        console.log(startingDateCheck.getTime(), endDateCheck.getTime())
        if (typeof e.target !== 'undefined') {
            if (e.target.id == 'title') {
                if (publication.title.length < 2) {
                    setErrors((errors) => ({ ...errors, titlePassed: false }))
                } else {
                    setErrors((errors) => ({ ...errors, titlePassed: true }))
                }
            }
            if (e.target.id == 'descr') {
                if (publication.description.length < 10) {
                    setErrors((errors) => ({ ...errors, descriptionPassed: false }))
                } else {
                    setErrors((errors) => ({ ...errors, descriptionPassed: true }))
                }
            }
            if (e.target.id == 'location') {
                if (publication.location.length < 2) {
                    setErrors((errors) => ({ ...errors, locationPassed: false }))
                } else {
                    setErrors((errors) => ({ ...errors, locationPassed: true }))
                }
            }
            if (e.target.id == 'contactInfo') {
                if (publication.contactInfo.length < 10) {
                    setErrors((errors) => ({ ...errors, contactInfoPassed: false }))
                } else {
                    setErrors((errors) => ({ ...errors, contactInfoPassed: true }))
                }
            }
            if (e.target.id == 'about') {
                if (publication.about.length < 10) {
                    setErrors((errors) => ({ ...errors, aboutPassed: false }))
                } else {
                    setErrors((errors) => ({ ...errors, aboutPassed: true }))
                }
            }
        }
        if (startingDateCheck > endDateCheck) {
            setErrors((errors) => ({ ...errors, datePassed: false }))
        } else {
            setErrors((errors) => ({ ...errors, datePassed: true }))
        }
    }

    // submitValidation IS USED TO VALIDATE ALL FIELDS AT ONCE UPON VALIDATION
    const submitValidation = () => {

        const startingDateCheck = new Date(publication.startingDate)
        const endDateCheck = new Date(publication.endDate)
        console.log(startingDateCheck.getTime(), endDateCheck.getTime())

        if (publication.title.length < 2) {
            setErrors((errors) => ({ ...errors, titlePassed: false }))
        } else {
            setErrors((errors) => ({ ...errors, titlePassed: true }))
        }
        if (publication.description.length < 10) {
            setErrors((errors) => ({ ...errors, descriptionPassed: false }))
        } else {
            setErrors((errors) => ({ ...errors, descriptionPassed: true }))
        }
        if (publication.location.length < 2) {
            setErrors((errors) => ({ ...errors, locationPassed: false }))
        } else {
            setErrors((errors) => ({ ...errors, locationPassed: true }))
        }
        if (publication.contactInfo.length < 10) {
            setErrors((errors) => ({ ...errors, contactInfoPassed: false }))
        } else {
            setErrors((errors) => ({ ...errors, contactInfoPassed: true }))
        }
        if (publication.about.length < 10) {
            setErrors((errors) => ({ ...errors, aboutPassed: false }))
        } else {
            setErrors((errors) => ({ ...errors, aboutPassed: true }))
        }
        if (startingDateCheck > endDateCheck) {
            setErrors((errors) => ({ ...errors, datePassed: false }))
        } else {
            setErrors((errors) => ({ ...errors, datePassed: true }))
        }
        console.log(errors)
    }

    return (

        <div className={styles.container}>
            <h1>ADD A PUBLICATION</h1>
            <form onSubmit={onSubmit} onChange={changeHandler} className={styles['login-form']}>
                <input type="text" id="title" name="title" placeholder="Title" defaultValue={publication.title} onBlur={onBlur} />
                {!errors.titlePassed ? <p className={styles.error}>Title must be at least 2 characters long</p> : null}
                <select className={styles.categories} name="category" id="category" value={publication.category}>
                    <option value="Category">Select a category</option>
                    <option value="Meetups">Meetups and Nightlife</option>
                    <option value="Learning">Learning and Education</option>
                    <option value="Sports">Sports</option>
                    <option value="Music">Music</option>
                    <option value="Travel">Travel</option>
                    <option value="Networking">Networking</option>
                    <option value="Other">Other</option>
                </select>
                <textarea id="descr" name="descr" rows="3" placeholder="Description" defaultValue={publication.description} onBlur={onBlur} />
                {!errors.descriptionPassed ? <p className={styles.error}>Description must be at least 10 characters long</p> : null}
                <input type="text" id="location" name="location" placeholder="Location" defaultValue={publication.location} onBlur={onBlur} />
                {!errors.locationPassed ? <p className={styles.error}>Location must be at least two characters long</p> : null}
                <input type="text" id="imageUrl" name="imageUrl" placeholder="imageUrl" defaultValue={publication.imageUrl} />
                <div className={styles["date-time"]}>
                    <div className={styles.start}>
                        <label>Start</label>
                        <Datetime className={styles.datetime} onChange={onChangeStart} onClose={onBlur} />
                    </div>
                    <div className={styles.end}>
                        <label>End</label>
                        <Datetime className={styles.datetime} onChange={onChangeEnd} onClose={onBlur} />
                    </div>
                </div>
                {!errors.datePassed ? <p className={styles.error}>Ending date cannot precede starting date</p> : null}
                <textarea id="contactInfo" name="contactInfo" rows="3" placeholder="Contact Information" defaultValue={publication.contactInfo} onBlur={onBlur} />
                {!errors.contactInfoPassed ? <p className={styles.error}>Contact information must be at least 10 characters long</p> : null}
                <textarea id="about" name="about" rows="3" placeholder="Share something about you.." defaultValue={publication.about} onBlur={onBlur} />
                {!errors.aboutPassed ? <p className={styles.error}>Bio must be at least 10 characters long</p> : null}
                <input className={styles.button} type="submit" value="SUBMIT" />
            </form>
        </div >
    )
}

export default AddPublication