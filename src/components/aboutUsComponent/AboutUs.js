import styles from "./AboutUsComponent.module.css"

const AboutUs = () => {
    return (
        <>
            <h1 className={styles.title}>ABOUT US</h1>
            <div className={styles["main-container"]}>
                <div className={styles["image-container"]}>
                    <img className={styles.image} src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1184&q=80"></img>
                </div>
                <div className={styles["text-container"]}>
                    <h2>Who are we?</h2>
                    <p>We are a team of young graduates. We currently have two Software Developers, two Marketing agents, and one UX/UI designer. If you want to learn more about us, please check our social media page.</p>
                    <h2>Why did we start Interconn?</h2>
                    <p>The pandemic cause some serious distrurbance in the way people normally communicate. We want to fill in that gap and further enable everyone to be themselves by doing the things they love with like-minded people.</p>
                </div>
            </div>
        </>
    )
}

export default AboutUs