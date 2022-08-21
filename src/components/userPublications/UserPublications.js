import * as api from "../../services/api/data"
import { useState, useEffect } from 'react'
import CategoryComponent from '../categories/categoryComponent/CategoryComponent'
import { MainContext } from "../../contexts/mainContext"
import { useContext } from "react"

const UserPublications = () => {

    const { userData } = useContext(MainContext);

    const [userPublications, setUserPublications] = useState()

    useEffect(() => {
        // const getData = async () => {
        //     setUserPublications(() => currentPublications.filter(publication => publication._ownerId == userData.id))
        //     console.log(userPublications)
        // }

        const getUserPublications = async () => {
            const userPublicationsFromServer = await api.getUserPublications(userData.id)
            console.log(userPublicationsFromServer)
            setUserPublications(() => userPublicationsFromServer)
        // }

        // if (currentPublications.length > 0) {
        //     getData()
        // } else {
        }
        getUserPublications()
    }, []);

    return (
        <>
            {userPublications ?
                <div className="container">
                   <h1>MY PUBLICATIONS</h1>
                    <>{userPublications.length > 0 ? userPublications.map((publication) => <CategoryComponent key={publication._id} publication={publication} />) : <h2>No publications yet.</h2>}</>
                </div>
                :
                <h1>Loading</h1>}
        </>
    )
}

export default UserPublications;