import React,{Component} from 'react'
import styles from './css/Login.module.css';

var crypto = require('crypto'),
    algorithm = 'aes-256-ctr';
export default class Login extends Component{
    constructor()
    {
        super()
        this.handlesubmit2 = this.handlesubmit2.bind(this)
        this.decrypt = this.decrypt.bind(this)
    }
    async handlesubmit2(e)
    {
        e.preventDefault()
        var id = this.refs.patid.value
        var pwd = this.refs.lpwd.value
       // var dpwd = this.refs.dpwd.value
        let response = await fetch(`http://localhost:5000/login/${id}/${pwd}`)
        let response_json = await response.json();
        let result = response_json.result;
        console.log(result)
        if(result!="Error")
        {
            this.props.history.push(`/patientview/${result.id}/${result.pbkey}/${result.pvtkey}`)

        }

    }
    async decrypt(text,password){
        var decipher = crypto.createDecipher(algorithm,password)
        var dec = decipher.update(text,'hex','utf8')
        dec += decipher.final('utf8');
        return dec;
    }
    render(){
        return(
            <div className={styles.signup}>
                <div></div>
                <div></div>
                <div></div>    
                <div></div>
                <div className={styles.form}>        
                    <form className={styles.insideform} onSubmit={this.handlesubmit2}>
                        <input ref="patid" className={styles.loginpageinput} type="text" placeholder="Enter Patient ID" />
                        <input ref="lpwd" className={styles.loginpageinput} type="password" placeholder="Enter Login Password" />
                        <button className={styles.loginpagebutton}>Submit</button>
                        <p className={styles.msg}>Not registered? <a href="/hospital_signup">Create an account</a></p>                                
                    </form>                   
                </div>
                <div></div>
            </div>
            
        )
    }
}