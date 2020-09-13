import React , {Component} from 'react'
import styles from './css/Hospital.module.css'
export default class Patient extends Component{
    constructor()
    {
        super()
        this.hospitallogin = this.hospitallogin.bind(this)
        this.hospitalsignup = this.hospitalsignup.bind(this)
    }

    hospitallogin()
    {
        this.props.history.push(`/hospital_login`)
    }
    hospitalsignup()
    {
        this.props.history.push(`/hospital_signup`)
    }

    render()
    {
        return(
                <div className={styles.container}>
                    <div></div>
                    <div className={styles.select}>
                        <div>
                            <button onClick={this.hospitallogin} className={styles.Hospitallogin}>LOGIN</button>
                        </div>
                        <div>
                            <button onClick={this.hospitalsignup} className={styles.Hospitalsignup}>SIGNUP</button>               
                        </div>
                    </div>
                    <div>
                        <p  className={styles.msg}>Switch to <a href="/Patient">Patient</a></p>      
                    </div>
                </div>
        )
    }
}