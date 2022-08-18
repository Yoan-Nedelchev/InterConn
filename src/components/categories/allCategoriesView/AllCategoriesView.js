import styles from './AllCategoriesView.module.css';
import cx from 'classnames';
import { Link, Outlet } from 'react-router-dom';


const Categories = () => {

    return (
        <>
        <div>
            <h1>Categories</h1>
            <ul className={styles.container}>
                <li className={cx(styles.category, styles.meetups)}><Link to="meetups">Meetups and Nightlife</Link></li>
                <li className={cx(styles.category, styles.learning)}><Link to="learning">Learning and Education</Link></li>
                <li className={cx(styles.category, styles.sports)}><Link to="sports">Sports</Link></li>
                <li className={cx(styles.category, styles.music)}><Link to="music">Music</Link></li>
                <li className={cx(styles.category, styles.travel)}><Link to="travel">Travel</Link></li>
                <li className={cx(styles.category, styles.networking)}><Link to="networking">Networking</Link></li>
                <li className={cx(styles.category, styles.other)}><Link to="other">Other</Link></li>
            </ul>
        </div>
        <Outlet />
        </>
    )
}

export default Categories