import React,{Component} from 'react'
import styles from './css/Signup.module.css';

const util = require('ethereumjs-util')
const ecies = require("eth-ecies");
var crypto = require('crypto'),
    algorithm = 'aes-256-ctr';

export default class HospitalSignup extends Component{
    constructor()
    {
        super()
        this.handlesubmit = this.handlesubmit.bind(this)
        this.encrypt = this.encrypt.bind(this)
    }
    async encrypt(text,password){
        var cipher = crypto.createCipher(algorithm,password)
        var crypted = cipher.update(text,'utf8','hex')
        crypted += cipher.final('hex');
        console.log(crypted)
        return crypted;
    }

    async handlesubmit(e)
    {
        e.preventDefault();
        let temp = "0x"+this.refs.pvtkey.value;
        console.log(temp)
        let pbkey = util.privateToPublic(temp).toString('hex');
        console.log(pbkey);
        var password = this.refs.pwd.value;
        var lpassword = this.refs.lpwd.value;
        var str = "pvtkey"+":"+this.refs.pvtkey.value
        var encrypted = await this.encrypt(str,password)
        console.log(encrypted)
        fetch(`http://localhost:5000/storehospitalkeys/${this.refs.patid.value}/${lpassword}`,{
            method:"POST",
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body:JSON.stringify({"value":encrypted,
        "pbkey":pbkey})
        })

    }
    render()
    {
        return(
            <div className={styles.signup}>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div>
                    <form className={styles.SignupForm} onSubmit={this.handlesubmit}>
                        <input ref="patid" className={styles.signuppageinput} type="text" placeholder="Enter Patient ID" />
                        <input ref="pvtkey" className={styles.signuppageinput} type="text" placeholder="Enter Private Key" />
                        <input ref="pwd" className={styles.signuppageinput} type="text" placeholder="Enter Access Password" />
                        <input ref="lpwd" className={styles.signuppageinput} type="text" placeholder="Enter Login Password" />
                        <button className={styles.signuppagebutton}>Submit</button>
                        <p class="message" className={styles.msg}>Already Registered? <a href="/Login">Login</a></p>      
                    </form>
                </div>
            </div>
        )
    }
}