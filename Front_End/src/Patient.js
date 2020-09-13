import React , {Component} from 'react'
import styles from './css/Patient.module.css'

export default class Patient extends Component{
    constructor()
    {
        super()
        this.patientlogin = this.patientlogin.bind(this)
        this.patientsignup = this.patientsignup.bind(this)
    }
    patientlogin()
    {
        this.props.history.push(`/login`)
    }
    patientsignup()
    {
        this.props.history.push(`/signup`)
    }

    render()
    {
        return(
            
                <div className={styles.container}>
                    <div></div>
                    <div className={styles.select}>
                        <div>
                            <button onClick={this.patientlogin} className={styles.Patientlogin}>LOGIN</button>
                        </div>
                        <div>   
                            <button onClick={this.patientsignup} className={styles.Patientsignup}>SIGNUP</button>               
                        </div>
                    </div>
                    <div>
                        <p  className={styles.msg}>Switch to <a href="/Hospital">Hospital</a></p>      
                    </div>
                </div>
            
        )
    }
}