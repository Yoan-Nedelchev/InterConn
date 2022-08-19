import * as api from "../../services/api/data"
import { useState, useEffect } from 'react'
import CategoryComponent from '../categories/categoryComponent/CategoryComponent'
import { MainContext } from "../../contexts/mainContext"
import { useContext } from "react"

const UserPublications = () => {

    const { userData, currentPublications } = useContext(MainContext);

    const [userPublications, setUserPublications] = useState()

    useEffect(() => {
        const getData = async () => {
            const data = await api.getAllPublications()
            setUserPublications(() => data.filter(publication => publication._ownerId == userData.id))
            console.log(userPublications)
        }

        const getUserPublications = async () => {
            const userPublicationsFromServer = await api.getUserPublications()
            setUserPublications(() => userPublicationsFromServer)
        }

        if (currentPublications) {
            getData()
        } else {
            getUserPublications()
        }

        console.log(currentPublications)
    }, []);

    console.log(userPublications)
    return (
        <>
            {userPublications ?
                <div className="container">
                   <h1>MY PUBLICATIONS</h1>
                    <>{userPublications.map((publication) => <CategoryComponent key={publication._id} publication={publication} />)}</>
                </div>
                :
                <h1>Loading</h1>}
        </>
    )
}

export default UserPublications;