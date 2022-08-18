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
            setUserPublications(data.filter(publication => publication._ownerId == userData.id))
            console.log(userPublications)
        }
        if (currentPublications) {
            getData()
        }

        console.log(currentPublications)
    }, []);

    console.log(userPublications)
    return (
        //   {  userPublications ?
        // <div className="container">
        //     <div>
        //         <img className="image" src="https://www.thefashionisto.com/wp-content/uploads/2021/03/Attractive-Man-Selfie-Sunglasses-Smiling.jpg" />
        //     </div>
        //     <p className="email">yoan.nedelchev@yahoo.com</p>
        //     <>{userPublications.map((publication) => <CategoryComponent key={publication._id} publication={publication} />)}</>
        // </div>
        //     :
        //    <h1>No publication</h1>}
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