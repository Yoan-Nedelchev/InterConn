import cx from "classnames"
import styles from './UserLogin.module.css'
import * as api from '../../services/api/data'
import { MainContext } from "../../contexts/mainContext"
import {useContext} from "react"
import { useNavigate } from 'react-router-dom'

const UserLogin = () => {
    const { userData, setUserData } = useContext(MainContext);
    const nav = useNavigate();

    const onLogin = async (e) => {
        e.preventDefault();
        const data = new FormData(e.target.parentElement);

        const email = data.get("email");
        const password = data.get("password");

        await api.login(email, password);
        const storedData = localStorage.getItem("userData");
        setUserData(JSON.parse(storedData));
        nav("/");

    }

    return (
        <div className={styles.container}>
            <form className={styles['login-form']}>
                {/* <label for="username">Username:</label> */}
                <input type="text" id="email" name="email" placeholder="Email" />
                {/* <label for="password">Password:</label> */}
                <input type="password" id="password" name="password" placeholder="Password" />
                <input onClick={onLogin} className={styles.button} type="submit" value="SUBMIT"/>
            </form>
        </div>
    );
};

export default UserLogin;