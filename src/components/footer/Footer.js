import styles from "./Footer.module.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebook, faInstagram, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { Link } from 'react-router-dom'

const Footer = () => {
    return (
        <div className={styles.container}>
            <div className={styles["main-contact-container"]}>
                <p className={styles["footer-heading"]}>CONTACT US</p>
                <div className={styles["contact-info"]}>
                    <p>Address: 31 West Fork Drive</p>
                    <p>Phone: +1-202-555-0167</p>
                    <p>Open: Mon-Fri 09:00-18:00</p>
                </div>
            </div>
            <div className={styles["social-media-container"]}>
                <p className={styles["footer-heading"]}>FOLLOW US ON:</p>
                <div className={styles["icon-set"]}>
                    <FontAwesomeIcon icon={faFacebook} size="xl" />
                    <FontAwesomeIcon icon={faInstagram} size="xl" />
                    <FontAwesomeIcon icon={faTwitter} size="xl" />
                </div>
                <button className={styles.about}><Link to="/about">ABOUT US</Link></button>
            </div>

        </div>

    )
}

export default Footer