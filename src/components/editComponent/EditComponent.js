import styles from './EditComponent.module.css'
import { getById, editPublication } from '../../services/api/data'
import {useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'
import {useNavigate} from 'react-router-dom'
import Datetime from 'react-datetime';
import moment from 'moment'

const EditComponent = () => {
    const [errors, setErrors] = useState({
        titlePassed: true,
        descriptionPassed: true,
        locationPassed: true,
        contactInfoPassed: true,
        aboutPassed: true,
        datePassed: true
    })
    
    let titlePassed = true
    let descriptionPassed = true
    let locationPassed = true
    let contactInfoPassed = true
    let aboutPassed = true
    let datePassed = true

    const nav = useNavigate()
    const { id } = useParams();
    const [publication, setPublication] = useState()

    const [startingDate, onChangeStart] = useState(new Date())
    const [endDate, onChangeEnd] = useState(new Date())

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
        const newPublication = {...publication, startingDate: firstDate, endDate: secondDate, date: startCombined, time: endCombined}
        console.log(newPublication)
        setPublication(publication => newPublication)

    },[startingDate, endDate])

    useEffect(() => {
        const fetchPublication = async () => {
            const publication = await getById(id)
            setPublication(publication)
            const startingDateMoment = new Date(publication.startingDate)
            const endDateMoment = new Date(publication.endDate)
            onChangeStart(startingDateMoment)
            onChangeEnd(endDateMoment)       
        }
        fetchPublication()
    }, [])



    const changeHandler = (e) => {
        const formData = new FormData(e.target.parentElement);
        const title = formData.get("title")
        const category = formData.get("category")
        const description = formData.get("descr")
        const location = formData.get("location")
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
                        date: startCombined,
                        time: endCombined, 
                        contactInfo,
                        about,
                        category,
                        startingDate,
                        endDate,
                    }
        console.log(data)
        setPublication(publication => data)
    }

    
    const onEdit = async (e) => {
        e.preventDefault();
        console.log(publication)
        console.log(titlePassed)

        setTimeout(async () => {
            console.log("ok")
            if (errors.titlePassed && errors.descriptionPassed && errors.locationPassed && errors.contactInfoPassed && errors.aboutPassed && errors.datePassed) {
                await editPublication(id, publication)
                nav(`/categories/${publication.category}/${id}`)
            } else {
                alert("Incorrectly filled data")
            }
          }, 0)
        }

        const onBlur = () => {

            const startingDateCheck = new Date(publication.startingDate)
            const endDateCheck = new Date(publication.endDate)
            console.log(startingDateCheck.getTime(), endDateCheck.getTime())


            if (publication.title.length < 2) {

                setErrors((errors) => ({...errors, titlePassed: false} ))
            } else {

                setErrors((errors)=>({...errors, titlePassed: true}))
            }

            if (publication.description.length < 10) {

                setErrors((errors) => ({...errors, descriptionPassed: false} ))
            } else {

                setErrors((errors)=>({...errors, descriptionPassed: true}))
            }
            if (publication.location.length < 2) {
                setErrors((errors) => ({...errors, locationPassed: false} ))
            } else {
                setErrors((errors)=>({...errors, locationPassed: true}))
            }

            if (publication.contactInfo.length < 10) {
                setErrors((errors) => ({...errors, contactInfoPassed: false}))
            } else {
                setErrors((errors) => ({...errors, contactInfoPassed: true}))
            }

            if (publication.about.length < 10) {
                setErrors((errors) => ({...errors, aboutPassed: false} ))
            } else {
                setErrors((errors)=>({...errors, aboutPassed: true}))
            }

            if (startingDateCheck > endDateCheck) {
                setErrors((errors) => ({...errors, datePassed: false} ))
            } else {
                setErrors((errors)=>({...errors, datePassed: true}))
            }
        }
       


    return (
        <>
        { publication ? <div className={styles.container}>
        <h1>EDIT PUBLICATION</h1>
        <form onSubmit={onEdit} onChange={changeHandler} className={styles['login-form']}>
                <input type="text" id="title" name="title" placeholder="Title" defaultValue={publication.title} onBlur={onBlur}/>
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
                <textarea id="descr" name="descr" rows="3" placeholder="Description" defaultValue={publication.description} onBlur={onBlur}/>
                {!errors.descriptionPassed ? <p className={styles.error}>Description must be at least 10 characters long</p> : null}
                <input type="text" id="location" name="location" placeholder="Location" defaultValue={publication.location} onBlur={onBlur}/>
                {!errors.locationPassed ? <p className={styles.error}>Location must be at least two characters long</p> : null}
                <div className={styles["date-time"]}>
                    <div className={styles.start}>
                        <label>Start</label>
                        <Datetime className={styles.datetime} onChange={onChangeStart} value={startingDate} onClose={onBlur}/>
                    </div>
                    <div className={styles.end}>
                        <label>End</label>
                        <Datetime className={styles.datetime} onChange={onChangeEnd} value={endDate} onClose={onBlur} />
                    </div>
                </div>
                {!errors.datePassed ? <p className={styles.error}>Ending date cannot precede starting date</p> : null}
                <textarea id="contactInfo" name="contactInfo" rows="3" placeholder="Contact Information" defaultValue={publication.contactInfo} onBlur={onBlur}/>
                {!errors.contactInfoPassed ? <p className={styles.error}>Contact information must be at least 10 characters long</p> : null}
                <textarea id="about" name="about" rows="3" placeholder="Share something about you.." defaultValue={publication.about} onBlur={onBlur}/>
                {!errors.aboutPassed ? <p className={styles.error}>Bio must be at least 10 characters long</p> : null}
            <input className={styles.button} type="submit" value="SUBMIT" />
        </form>
    </div>
            :
            null}
    </>
       
    )
}

export default EditComponent