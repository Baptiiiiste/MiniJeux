import styles from "@/styles/ProfilStatsBlock.module.css"



export default function ProfilStatsBlock({title, statsArray}) {


    return (
        <section className={styles.container}>

            <div className={styles.upperBlock}>
                <h1 className={styles.title}>{title}</h1>
            </div>

            <div className={styles.statsBlock}>
                {/* {statsArray.map((stat, index) => {
                    return (
                        <div key={index} className={styles.statsContent}>
                            <p className={styles.statValue}>test</p>
                        </div>
                    )
                })} */}
            </div>

        </section>
    )
}