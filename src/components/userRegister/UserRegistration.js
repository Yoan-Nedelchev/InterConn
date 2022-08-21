import cx from "classnames"
import styles from './UserRegistration.module.css'
import * as api from '../../services/api/data'
import { MainContext } from "../../contexts/mainContext"
import { useContext, useState } from "react"
import { useNavigate } from 'react-router-dom'

const UserRegistration = () => {
    const [filledData, setFilledData] = useState({
        email: "",
        password: "",
        repass: "",
    })

    const [errors, setErrors] = useState({
        emailPassed: true,
        passwordPassed: true,
        repassPassed: true,
        passwordsMatched: true,
    })

    const { userData, setUserData } = useContext(MainContext);
    const nav = useNavigate();

    const onRegister = async (e) => {
        e.preventDefault();

        if (filledData.email == "") {
            setErrors((errors) => ({ ...errors, emailPassed: false }))
        }  
        if (filledData.password == "") {
            setErrors((errors) => ({ ...errors, passwordPassed: false }))
        } 
        if (filledData.repass == "") {
            debugger
            setErrors((errors) => ({ ...errors, repassPassed: false }))
        }
        
        const allPassed = Object.values(errors).every(
            value => value === true
        )
        
        if (allPassed &&  filledData.email.length > 0 && filledData.password.length > 0 && filledData.repass.length > 0) {
            
            await api.register(filledData.email, filledData.password);
            const storedData = localStorage.getItem("userData");
            setUserData(JSON.parse(storedData));
            nav("/");
        } else {
            
            alert("Incorrectly filled fields")
        }

    }

    const onChange = (e) => {
        const data = new FormData(e.target.parentElement);
 
        const email = data.get("email");
        const password = data.get("password");
        const repass = data.get("password");
        const finalData = {
            email, password, repass
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
        } else if (e.target.id == "repass") {
            if (e.target.value == "") {
                setErrors((errors) => ({ ...errors, repassPassed: false }))
                setErrors((errors) => ({ ...errors, passwordsMatched: true }))
            } else {
                if (e.target.value != filledData.password) { 
                    setErrors((errors) => ({ ...errors, passwordsMatched: false }))
                    setErrors((errors) => ({ ...errors, repassPassed: true }))
                } else {
                    setErrors((errors) => ({ ...errors, passwordsMatched: true }))
                    setErrors((errors) => ({ ...errors, repassPassed: true }))
                }
            }
        }
    }

    return (
        <div className={styles.container}>
            <form onChange={onChange} onBlur={onBlur} className={styles['register-form']}>
                <h1 className={styles.title}>REGISTER</h1>
                {/* <label for="username">Username:</label> */}
                <input type="text" id="email" name="email" placeholder="Email" />
                {!errors.emailPassed ? <p className={styles.error}>Required field</p> : null}
                {/* <label for="password">Password:</label> */}
                <input type="password" id="password" name="password" placeholder="Password" />
                {!errors.passwordPassed ? <p className={styles.error}>Required field</p> : null}
                <input type="password" id="repass" name="repass" placeholder="Repeat Password" />
                {!errors.repassPassed ? <p className={styles.error}>Required field</p> : null}
                {!errors.passwordsMatched ? <p className={styles.error}>Psswords must match</p> : null}
                <input onClick={onRegister} className={styles.button} type="submit" value="SUBMIT" />
            </form>
        </div>
    );
};

export default UserRegistration;