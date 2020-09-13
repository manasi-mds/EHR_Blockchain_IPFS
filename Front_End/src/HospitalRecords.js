import React,{Component} from 'react';
import web3 from './web3';
import Storet from './Storet';
import ipfs from './ipfs';
import Access from './Access';
import styles2 from './css/HospitalRecords.module.css'
const ecies = require("eth-ecies");
var Buffer = require('buffer/').Buffer
var crypto = require('crypto'),
    algorithm = 'aes-256-ctr';
var count = 0 
export default class HospitalRecords extends Component{
    constructor(props)
    {
        super(props)
        //this.getPatientList = this.getPatientList.bind(this)
        this.viewrecords = this.viewrecords.bind(this)
        this.decrypt = this.decrypt.bind(this)
        this.keydecrypt = this.keydecrypt.bind(this)
        this.retrieveIpfs = this.retrieveIpfs.bind(this)
        this.handlesubmit = this.handlesubmit.bind(this)
        this.state = {

        }
    }

    async viewrecords(e)
    {
        e.preventDefault()
        console.log("viewing records")
        var arr = new Array()
        var arrhash = new Array()
        const rel = await Access.ViewAccess(this.refs.patid.value+this.props.match.params.pbkey).toString()
        console.log(rel.length)
        if(rel.length==0)
        {
            alert("Access Denied")
            this.props.history.goBack()
        }
        var len = rel.split(',').length
        for(var i=0;i<len;i+=2)
        {
            var ipfsdata
            var hash = web3.toAscii(rel.split(',')[i]).replace(/[^a-zA-Z0-9]/g, "")+web3.toAscii(rel.split(',')[i+1]).replace(/[^a-zA-Z0-9]/g, "")
            console.log(hash)
            arrhash.push(hash)
            var ipfsdata = await this.retrieveIpfs(hash)
            console.log(ipfsdata)
            arr.push(ipfsdata);  
                      
        }
        this.setState({
            ipfsdata:arr,
            hashes:arrhash
        })
    }

    async getPatientList()
    {
        console.log("requesting")
        let response = await fetch(`http://localhost:5000/getPatientList/${this.props.match.params.id}`)
        console.log("data received")
        let response_json = await response.json()
        var arr = response_json.result;
        console.log(arr)
        this.setState({
            list:arr
        })
    }

    async decrypt(privateKey, encryptedData) {
        //console.log(privateKey)
        //console.log(encryptedData)
        let userPrivateKey = new Buffer(privateKey, 'hex');
        let bufferEncryptedData = new Buffer(encryptedData, 'base64');
        console.trace()
        let decryptedData = ecies.decrypt(userPrivateKey,bufferEncryptedData);
        console.trace()
        console.log(decryptedData)
        return decryptedData.toString('utf8');
    }

    async keydecrypt(text,password){
        var decipher = await crypto.createDecipher(algorithm,password)
        var dec = await decipher.update(text,'hex','utf8')
        dec += decipher.final('utf8');
        return dec;
    }

    async retrieveIpfs(hash)
    {
            var idata = await ipfs.cat(hash)
            var ipfsdata = idata.toString('utf8')
            return ipfsdata
    }

    async handlesubmit(e)
    {
        e.preventDefault();
        var farray = new Array()
        var pwd = this.refs.dpwd.value
        var epvtkey = this.props.match.params.pvtkey
        // console.log(epvtkey)
        var pvtkey = await this.keydecrypt(epvtkey,pwd)
        // console.log("here")
        //console.log(pvtkey.substr(7))
        var fpvtkey = pvtkey.substr(7)
        var arr = this.state.ipfsdata
        var hasharr = this.state.hashes
        var len = arr.length
        for(var i = 0;i<len;i++)
        {
            // console.log("in loop")
            // console.log(arr[0])
            // console.log(fpvtkey)
            var fdata = await this.decrypt(fpvtkey.toString(),arr[i].toString())
           console.log(fpvtkey.toString())
           console.log(arr[i].toString())
        console.log(fdata)
            var final_data = JSON.parse(fdata)
            console.log(final_data)
            farray.push(final_data)
        }
        console.log(farray)
        this.setState({
            final_record:farray//array of json objects 
        })

    }

    componentDidMount()
    {
        this.getPatientList()
    }

    renderList(record){
        count++;
        return(
            
            <div key={count} className={styles2.record}>
                <p>Record number: {count}</p> 
                <p>Patient ID: {record.pat_id}</p>      
                <p>Date: {record.date}</p>
                <p>Diagnosis: {record.diagnosis}</p>
                <p>Location: {record.location}</p>
                <p>Medication: {record.medication}</p>
                <p>Suggestion: {record.suggestion}</p>
                <p>Next Review: {record.next_review}</p>
                <p>Notes: {record.notes}</p>
               
            </div>
        )
    }
    render(){
        if(this.state.final_record!=null)
        {
            return(
                <div className={styles2.hospitalviewrecord}>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div>
                        {this.state.final_record.map(this.renderList)}
                    </div>
                </div>
            )
        }
        if(this.state.ipfsdata!=null&&this.state.final_record==null)
        {
            return(
                <div className={styles2.hospRecords}>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div className={styles2.form}>
                        <form className={styles2.insideform} onSubmit={this.handlesubmit}>
                            <input ref="dpwd" className={styles2.loginpageinput} type="password" placeholder="Enter Decryption Password" />
                            <button className={styles2.loginpagebutton}>Decrypt Records</button>
                        </form>
                    </div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
            )
        }
        return(
            <div className={styles2.hospRecords}>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div className={styles2.form}>
                    <form className={styles2.insideform} onSubmit={this.viewrecords}>
                        <input ref="patid" className={styles2.loginpageinput} type="text" placeholder="Enter Patient ID" />
                        <button className={styles2.loginpagebutton}>View Records</button>
                    </form>
                </div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
        )
    }
}