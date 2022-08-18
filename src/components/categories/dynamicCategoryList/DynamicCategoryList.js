import * as api from "../../../services/api/data"
import { useState, useEffect } from 'react'
import CategoryComponent from '../categoryComponent/CategoryComponent'
import { MainContext } from "../../../contexts/mainContext"
import { useContext } from "react"
import styles from './DynamicCategoryList.module.css'

import { BarLoader, HalfMalf, SlidingPebbles } from 'react-spinner-animated';

import 'react-spinner-animated/dist/index.css';

const DynamicCategoryList = () => {
    const path = window.location.pathname
    const currentView = path.split("/").pop()

    const { currentPublications, setPublications } = useContext(MainContext)
    const [loading, setLoading] = useState(true)
    // useEffect(() => {
    //     const getData = async () => {
    //         let data = {}
    //         if (currentView == "meetups") {
    //             data = await api.getAllPublications("meetups")
    //         } else if (currentView == "learning") {
    //             data = await api.getAllPublications("learning")
    //         }
    //         else if (currentView == "sports") {
    //             data = await api.getAllPublications("sports")
    //         }
    //         else if (currentView == "music") {
    //             data = await api.getAllPublications("music")
    //         }
    //         else if (currentView == "travel") {
    //             data = await api.getAllPublications("travel")
    //         }
    //         else if (currentView == "networking") {
    //             data = await api.getAllPublications("networking")
    //         }
    //         else if (currentView == "other") {
    //             data = await api.getAllPublications("other")
    //         }
    //         setPublications(data)
    //     }
    //     getData()
    // }, []);

    useEffect(() => {
        const getData = async () => {
            const data = await api.getAllPublications()

            let finalData = [{}]

            if (currentView == "meetups") {
                finalData = data.filter(publication => publication.category == "Meetups")
            } else if (currentView == "learning") {
                finalData = data.filter(publication => publication.category == "Learning")
            }
            else if (currentView == "sports") {
                finalData = data.filter(publication => publication.category == "Sports");
            }
            else if (currentView == "music") {
                finalData = data.filter(publication => publication.category == "Music")
            }
            else if (currentView == "travel") {
                finalData = data.filter(publication => publication.category == "Travel")
            }
            else if (currentView == "networking") {
                finalData = data.filter(publication => publication.category == "Networking")
            }
            else if (currentView == "other") {
                finalData = data.filter(publication => publication.category == "other")
            }
            setPublications(currentPublications => finalData)
            setLoading(false)

        }
        getData()
        console.log(currentPublications)
    
    }, []);
    console.log(currentPublications)

    if (loading) {
        console.log("loading")
        return <div className={styles["spinner-container"]}><HalfMalf text={"Loading..."} center={false} width={"200px"} height={"200px"}/></div>
    } 
    return (
        <>
            {currentPublications.length > 0 ?
                <>{currentPublications.map((publication) => <CategoryComponent key={publication._id} publication={publication} currentView={currentView} />)}</>
                :
                <h1>No publications</h1>}
        </>
    );
};

export default DynamicCategoryList