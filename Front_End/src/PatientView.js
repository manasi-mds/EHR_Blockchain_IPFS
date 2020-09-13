import React,{Component} from 'react';
import web3 from './web3';
import Storet from './Storet';
import ipfs from './ipfs';
import styles from './css/patientview.module.css';
import { Accordion, AccordionItem } from 'react-sanfona';
const ecies = require("eth-ecies");
var Buffer = require('buffer/').Buffer
var crypto = require('crypto'),
    algorithm = 'aes-256-ctr';
var toBuffer = require('typedarray-to-buffer')
var count = 0 

export default class PatientView extends Component{
    constructor(props)
    {
        super(props);
        this.viewrecords = this.viewrecords.bind(this)
        this.accessmodify = this.accessmodify.bind(this)
        this.retrieveIpfs = this.retrieveIpfs.bind(this)
        this.keydecrypt = this.keydecrypt.bind(this)
        this.handlesubmit = this.handlesubmit.bind(this)
        this.decrypt = this.decrypt.bind(this)
        this.state={}
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
    async viewrecords()
    {
        console.log("viewing records")
        var arr = new Array()
        var arrhash = new Array()
        console.log(this.props.match.params.id)
        
        const rel = Storet.getPatientHash(this.props.match.params.id).toString()
        
        
        console.log(rel)
        var len = rel.split(',').length
        for(var i=0;i<len;i+=2)
        {
            var ipfsdata
            var hash = web3.toAscii(rel.split(',')[i]).replace(/[^a-zA-Z0-9]/g, "")+web3.toAscii(rel.split(',')[i+1]).replace(/[^a-zA-Z0-9]/g, "")
            console.log(hash)
            arrhash.push(hash)
            var t0 = performance.now();
            var ipfsdata = await this.retrieveIpfs(hash)
            var t1 = performance.now();
            console.log(t1-t0);
            console.log(ipfsdata)
            arr.push(ipfsdata);  
                      
        }
        this.setState({
            ipfsdata:arr,
            hashes:arrhash
        })
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
        //  var fdata = await fetch(`http://localhost:5000/decryptrecord/`,{
        //     method:"POST",
        //       headers: {
        //         'Accept': 'application/json',
        //         'Content-Type': 'application/json',
        //     },
        //     body:JSON.stringify({"data":arr[i],
        // "pvtkey":fpvtkey})
        // })
        // var fdata_json = await fdata.json()
            // console.log(fdata_json)
        //     var result = fdata_json.decryptedData
        //  console.log(result)
        console.log(fdata)
            var final_data = JSON.parse(fdata)
            console.log(final_data)
            farray.push(final_data)
        }
        console.log(farray)
        this.props.getRecords(hasharr,farray)
        this.setState({
            final_record:farray//array of json objects 
        })

    }
    accessmodify()
    {
        this.props.history.push(`/access/${this.props.match.params.id}/${this.props.match.params.pbkey}/${this.props.match.params.pvtkey}`)
    }
    renderList = (record)=>
    {
        count++;
        return(
            
            <div key={count} className={styles.record}>
                <p>Record number: {count}</p>        
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
    render()
    {
        if(this.state.ipfsdata!=null&&this.state.final_record==null)
        {
            return(
                <div className={styles.signup}>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div className={styles.form}>
                        <form className={styles.insideform} onSubmit={this.handlesubmit}>
                            <input ref="dpwd" className={styles.decryptionpassword} type="password" placeholder="Enter Decryption Password" />
                            <button className={styles.signuppagebutton}>Decrypt Records</button>
                        </form>
                    </div>
                    <div></div>
                </div>
            )
        }
        if(this.state.final_record!=null)
        {
            return(
                <div className={styles.patientviewdetails}>
                    <div></div>
                    
                    <div className={styles.buttoncontainer}>
                        <button onClick={this.accessmodify} className={styles.accessgrant}>Modify Access</button>
                    </div>
                    <div></div>
                    <div></div>
                    <div>
                        {this.state.final_record.map(this.renderList)}
                    </div>
                
                </div>
            )
        }
        return(
            <div className={styles.patientview}>
            <div></div>
            <div className={styles.buttoncontainer}>
            <div>
                <button onClick={this.viewrecords} className={styles.viewrec}>View Records</button>
            </div>
            </div>
            <div></div>
            </div>
        )
    }
}