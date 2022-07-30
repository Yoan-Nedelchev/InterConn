import cx from "classnames"
import styles from './UserRegistration.module.css'
import * as api from '../../services/api/data'
import { UserContext } from "../../contexts/userContext"
import {useContext} from "react"
import { useNavigate } from 'react-router-dom'

const UserRegistration = () => {
    const { userData, setUserData } = useContext(UserContext);
    const nav = useNavigate();

    const onRegister = async (e) => {
        e.preventDefault();
        const data = new FormData(e.target.parentElement)

        const email = data.get("email");
        const password = data.get("password");
        const repass = data.get("repass");

        await api.register(email, password);
        const storedData = localStorage.getItem("userData");
        setUserData(JSON.parse(storedData));
        nav("/");
        
    }

    return (
        <div className={styles.container}>
            <form className={styles['register-form']}>
                {/* <label for="username">Username:</label> */}
                <input type="text" id="email" name="email" placeholder="Email" />
                {/* <label for="password">Password:</label> */}
                <input type="password" id="password" name="password" placeholder="Password" />
                <input type="password" id="re-pass" name="password" placeholder="Repeat Password" />
                <input onClick={onRegister} className={styles.button} type="submit" value="SUBMIT"/>
            </form>
        </div>
    );
};

export default UserRegistration;