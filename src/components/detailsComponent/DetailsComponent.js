import styles from './DetailsComponent.module.css'
import { useParams } from 'react-router-dom'
import { getById, getComments, deletePublication, addComment } from '../../services/api/data'
import { useEffect, useState } from 'react'
import { MainContext } from "../../contexts/mainContext"
import { useContext } from "react"
import { Link, useNavigate } from 'react-router-dom'
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css'


const DetailsComponent = () => {
    const { userData, setChosenPublication } = useContext(MainContext)
    const { id } = useParams();

    const [publication, setPublication] = useState({})
    const [comments, setComments] = useState({})

    const editURL = `/edit/${id}`

    const nav = useNavigate()

    useEffect(() => {
        const fetchPublication = async () => {
            const publication = await getById(id)
            setPublication(publication)
        }

        const fetchComments = async () => {
            const comments = await getComments(id)
            setComments(comments)
        }

        fetchPublication()
        fetchComments()
    }, [])


    const onEdit = (e) => {
        e.preventDefault()
    }

    const submit = () => {
        confirmAlert({
          title: `Publication named "${publication.title}" will be deleted.`,
          message: 'Are you sure you want to proceed?',
          buttons: [
            {
              label: 'Yes',
              onClick: () => {
                deletePublication(id)
                nav("/")
              }
            },
            {
              label: 'Cancel',
                }
          ]
        });
      };
    
    const onDelete = async () => {
        submit()

    }
    const onAdd = async (e) => {
        e.preventDefault()
        console.log("ok")
        const data = new FormData(e.target)
        const comment = data.get("comment")
        const toSend = {
            publicationId: id,
            comment,
            email: userData.email
        }
        await addComment(toSend)
        const comments = await getComments(id)
        setComments(comments)

    }

    return (
        <>
            {publication ?
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
                                <li><span>End: </span>{publication.end}</li>

                                {(publication._ownerId == userData.id) ?
                                    <>
                                        <button onClick={onEdit} className={styles["edit-btn"]}><Link to={editURL}>EDIT</Link></button>
                                        <button className={styles["delete-btn"]} onClick={onDelete}>DELETE</button>
                                    </>
                                    :
                                    null
                                }
                            </ul>
                        </div>
                    </div>
                    <section className={styles["about-section"]}>
                        <div className="divider"></div>
                        <h2>About the publisher</h2>
                        <p>{publication.about}</p>
                        <p><span>Contact information: </span>{publication.contactInfo}</p>
                    </section>

                    <div className={styles["comments-section"]}>
                        <h2 className={styles["comments-title"]}>COMMENTS SECTION</h2>
                        <div className={styles["comments-container"]}>
                            {comments.length > 0 ? comments.map(comment => <p key={comment._id} className={styles.comment}>{comment.email}: {comment.comment} </p>) : <p>No comments yet</p>}
                        </div>
                        <div className={styles["add-comment-container"]}>
                            {userData.token ?
                                <>
                                    <h2>ADD COMMENT</h2>
                                    <form onSubmit={onAdd} className={styles['add-form']}>
                                        <textarea name="comment" rows="6"></textarea>
                                        <input className={styles["add-button"]} type="submit" value="Add" />
                                    </form>

                                </>
                                : <p>Log in to write a comment</p>}

                        </div>
                    </div>

                </div>
                :
                <h1>Loading</h1>
            }
        </>
    );
};

export default DetailsComponent