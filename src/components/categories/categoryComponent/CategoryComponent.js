import styles from './CategoryComponent.module.css'
import { Link, Navigate } from 'react-router-dom'

const CategoryComponent = ({
    publication, 
    currentView
}) => {
    const Details = (e) => {
        e.preventDefault()
    }
    console.log(currentView)
    const detailsURL = `${publication._id}`
    

    return (

        <div className={styles.container}>
            <h2 className={styles.title}>{publication.title}</h2>
            <div className={styles["main-container"]}>
                <div className={styles["image-container"]}>
                    <img className={styles.image} src={publication.imageUrl}></img>
                </div>
                <div className={styles["data-container"]}>

                    <ul className={styles.data}>
                        <li><span>Description: </span>{publication.description}</li>
                        <li><span>Location: </span>{publication.location}</li>
                        <li><span>Start: </span>{publication.start}</li>
                        <li><span>End: </span> {publication.end}</li>
                        <button onClick={Details} className={styles["details-button"]}><Link className={styles.button} to={detailsURL}>Details</Link></button>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default CategoryComponent