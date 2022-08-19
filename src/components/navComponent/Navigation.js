import logo from './INTERCONN.png'
import cx from "classnames"
import styles from './Navigation.module.css'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { MainContext } from "../../contexts/mainContext"
import { useContext } from "react"
import * as api from '../../services/api/data'
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css'

const Navigation = () => {
    const { userData, setUserData } = useContext(MainContext);
    const nav = useNavigate();

    useEffect(() => {
        if (!userData.token) {
            nav("/");
        }
    }, [userData]);
    

    const submit = () => {
        confirmAlert({
          title: `LOG-OUT`,
          message: 'Are you sure you want log-out?',
          buttons: [
            {
              label: 'Yes',
              onClick: () => {
                api.logout();
                setUserData({});
              }
            },
            {
              label: 'Cancel',
                }
          ]
        });
      };

    const onLogout = async (e) => {
        submit()
        

    }


    return (
        <ul className={cx(styles["nav-bar"])}>

            <div className={styles["public-btns"]}>
            <li className={styles["nav-img"]} ><Link to="/"><img src={logo}></img></Link></li>
            <li ><Link className={cx(styles.button, styles["categories-btn"])} to="/categories">CATEGORIES</Link></li>
            </div>
           
            
            {userData.token ?
                <>
                    <p className={styles['greeting']}>Welcome, {userData.email}</p>
                    <li ><Link className={styles.button} to="/mypublications">MY PUBLICATIONS</Link></li>
                    <li ><Link className={cx(styles.button, styles.login)} to="/add">ADD PUBLICATION</Link></li>
                    <li onClick={onLogout} className={cx(styles.button, styles.register)}>LOG-OUT</li>
                </> :
                <>
                    <li><Link className={cx(styles.button, styles.register)} to="/register">REGISTER</Link></li>
                    <li><Link className={cx(styles.button, styles.login)} to="/login">LOGIN</Link></li>
                </>}
        </ul>
    );
};

export default Navigation;