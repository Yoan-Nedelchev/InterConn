import logo from './INTERCONN.png'
import cx from "classnames"
import styles from './Navigation.module.css'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { UserContext } from "../../contexts/userContext"
import { useContext } from "react"
import * as api from '../../services/api/data'

const Navigation = () => {
    const { userData, setUserData } = useContext(UserContext);
    const nav = useNavigate();

    useEffect(() => {
        if (!userData.token) {
            nav("/");
        }
    }, [userData]);
    
    const onLogout = async (e) => {
        e.preventDefault();
        await api.logout();
        setUserData({});
    }


    return (
        <ul className={cx(styles["nav-bar"])}>

            <li className={styles["nav-img"]} ><Link to="/"><img src={logo}></img></Link></li>
            <li ><Link className={styles.button} to="/">CATEGORIES</Link></li>
            <li ><Link className={styles.button} to="/profile">PROFILE</Link></li>
            {userData.token ?
                <>
                    <p className={styles['greeting']}>Welcome, {userData.email}</p>
                    <li onClick={onLogout} className={cx(styles.button, styles.register)}>LOGOUT</li>
                </> :
                <>
                    <li><Link className={cx(styles.button, styles.register)} to="/register">REGISTER</Link></li>
                    <li><Link className={cx(styles.button, styles.login)} to="/login">LOGIN</Link></li>
                </>}
        </ul>
    );
};

export default Navigation;