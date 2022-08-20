import cx from "classnames"
import styles from './UserLogin.module.css'
import * as api from '../../services/api/data'
import { MainContext } from "../../contexts/mainContext"
import { useContext, useState } from "react"
import { useNavigate } from 'react-router-dom'

const UserLogin = () => {
    const { userData, setUserData } = useContext(MainContext);
    const [filledData, setFilledData] = useState({
        email: "",
        password: ""
    })
    const [errors, setErrors] = useState({
        emailPassed: true,
        passwordPassed: true
    })
    const nav = useNavigate();

    const onLogin = async (e) => {
        e.preventDefault();
        console.log(filledData)
        if (filledData.email == "") {
            setErrors((errors) => ({ ...errors, emailPassed: false }))
        }
        if (filledData.password == "") {
            setErrors((errors) => ({ ...errors, passwordPassed: false }))
        }
        if (filledData.email.length > 0 && filledData.password.length > 0) {
            await api.login(filledData.email, filledData.password);
            const storedData = localStorage.getItem("userData");
            setUserData(JSON.parse(storedData));
            nav("/");
        } else {
            alert("All fields are required")
        }
    }

    const onChange = (e) => {
        const data = new FormData(e.target.parentElement);
 
        const email = data.get("email");
        const password = data.get("password");
        const finalData = {
            email, password
        }
        setFilledData(() => finalData)
        console.log(filledData)
    }

    const onBlur = (e) => {
        if (e.target.id == "email") {
            if (e.target.value == "") {
                setErrors((errors) => ({ ...errors, emailPassed: false }))
            } else {
                setErrors((errors) => ({ ...errors, emailPassed: true }))
            }
        } else if (e.target.id == "password") {
            if (e.target.value == "") {
                setErrors((errors) => ({ ...errors, passwordPassed: false }))
            } else {
                setErrors((errors) => ({ ...errors, passwordPassed: true }))
            }
        }
    }

    return (
        <div className={styles.container}>
            <form onChange={onChange} onBlur={onBlur} className={styles['login-form']}>
                {/* <label for="username">Username:</label> */}
                <input type="text" id="email" name="email" placeholder="Email" defaultValue={filledData.email} />
                {!errors.emailPassed ? <p className={styles.error}>Required field</p> : null}
                {/* <label for="password">Password:</label> */}
                <input type="password" id="password" name="password" placeholder="Password" defaultValue={filledData.password} />
                {!errors.passwordPassed ? <p className={styles.error}>Required field</p> : null}
                <input onClick={onLogin} className={styles.button} type="submit" value="SUBMIT" />
            </form>
        </div>
    );
};

export default UserLogin;