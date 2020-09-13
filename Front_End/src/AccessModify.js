import React,{Component} from 'react'
import web3 from './web3';
import ipfs from './ipfs'
import Access from './Access'
import styles from './css/AccessModify.module.css'
const ecies = require("eth-ecies");
var crypto = require('crypto'),
    algorithm = 'aes-256-ctr';

    
export default class AccessModify extends Component{
    constructor(props)
    {
        super(props)
        this.getHospitals = this.getHospitals.bind(this)
        this.grantaccess = this.grantaccess.bind(this)
        this.revokeaccess = this.revokeaccess.bind(this)
        this.getipfshash = this.getipfshash.bind(this)
        this.state={}
    }

    async getHospitals()
    {
        let response = await fetch(`http://localhost:5000/getHospitals`)
        let response_json = await response.json()
        console.log(response_json.result)
        this.setState({
            hospitals:response_json.result
        })
        console.log(this.props.hashes)
        console.log(this.props.records)
    }  

    async getipfshash(buf)
    {
        var hash = await ipfs.add(buf)
        return hash;
    }
    async grantaccess(e)
    {
        e.preventDefault()
        console.log(this.hosp.value)
        console.log(this.hash.value)
        var hashes = this.props.hashes
        var records = this.props.records
        var hkey = this.hosp.value;
        var rec = JSON.parse(this.hash.value);
        console.log(rec)
        var combkey = this.props.match.params.id+hkey
        var ind = records.findIndex(rec => {rec})
        var rhash = hashes[ind]
        console.log(ind)
        console.log(rhash)
        console.log("hello")
        //var ans = this.encrypt(hkey.toString(),rec.toString())
        var ans = await fetch(`http://localhost:5000/encryptrecord`,{
            method:"POST",
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body:JSON.stringify({"data":rec,
        "pbkey":hkey})
        })
        var ans_json = await ans.json();
        console.log(ans_json.encryptedData)
        var buf = Buffer.from(ans_json.encryptedData, 'utf8');
        var hash = await this.getipfshash(buf)
        var fhash = hash[0].hash
        console.log(fhash)
        Access.GrantAccess(combkey,web3.fromAscii(fhash.substr(0,24)),web3.fromAscii(fhash.substr(24,46)),{from: web3.eth.accounts[2], gas:3000000})
        console.log("success")
    }

    async revokeaccess(e)
    {
        e.preventDefault() 
        var hname = this.hnamerevoke.value;
        var combkey = this.props.match.params.id+hname
        console.log(combkey)
        Access.RevokeAccess(combkey.toString(),{from: web3.eth.accounts[2], gas:3000000})
        console.log("revoke success")

    }

    componentDidMount()
    {
        this.getHospitals()
    }

    renderHosp(hospital)
    {
        return(
            <option value={hospital.pbkey}>{hospital.id}</option>
        )
    }
    renderHash(hash)
    {
        return(
            <option value={JSON.stringify(hash)}>{hash.diagnosis},{hash.date}</option>
        )
    }
    render()
    {
        if(this.state.hospitals!=null)
        {
        return(
            <div className={styles.signup}>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div className={styles.form}>           
                    <form className={styles.insideform} onSubmit={this.grantaccess}>
                       <select className={styles.loginpageinput} id = "dropdown" ref = {(input)=> this.hosp = input}>
                       {this.state.hospitals.map(this.renderHosp)}
                        </select>
                        <select className={styles.loginpageinput} id = "dropdown" ref = {(input)=> this.hash = input}>
                       {this.props.records.map(this.renderHash)}
                        </select>
                        <button className={styles.signuppagebutton}>Grant Access</button>
                    </form>
            </div>
            <div></div>
            <div></div>
            <div className={styles.form}>
                    <form className={styles.insideform} onSubmit={this.revokeaccess}>
                       <select className={styles.loginpageinput} id = "dropdown" ref = {(input)=> this.hnamerevoke = input}>
                       {this.state.hospitals.map(this.renderHosp)}
                        </select>
                        <button className={styles.signuppagebutton}>Revoke Access</button>
                    </form>
            </div>
            </div>
        )
        }
        return(
            <div>
            <h1>Loading</h1>
            </div>
        )
    }
}