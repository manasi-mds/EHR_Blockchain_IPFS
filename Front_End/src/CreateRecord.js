import React,{Component} from 'react'
import ipfs from './ipfs';
import web3 from './web3';
import Storet from './Storet';
import styles from './css/CreateRecord.module.css'
export default class CreateRecord extends Component{
    constructor()
    {
        super()
        this.handlesubmit = this.handlesubmit.bind(this)
    }
    
    async getipfshash(buf)
    {
        var hash = await ipfs.add(buf)
        return hash;
    }
    async handlesubmit(e)
    {
        e.preventDefault();
        
        var pat = new Object();
        pat.pat_id = this.refs.patient_id.value;
        pat.diagnosis = this.refs.diagnosis.value;
        pat.location = this.refs.location.value;
        pat.medication = this.refs.medication.value;
        pat.suggestion = this.refs.suggestion.value;
        pat.next_review = this.refs.next_review.value;
        pat.notes = this.refs.notes.value;
        pat.date = this.refs.date.value
        console.log(pat);
        let response = await fetch(`http://localhost:5000/hospitalencrypt/${this.refs.patient_id.value}/${this.props.match.params.id}`,{
            method:"POST",
            mode:"cors",
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            cache: 'default',
            body:JSON.stringify({"pat":pat})
        })
        let response_json = await response.json()
        console.log(response_json.result)
        console.log(response)
        var buf = Buffer.from(response_json.result, 'utf8');
        var hash = await this.getipfshash(buf)
        console.log(hash)
        var fhash = hash[0].hash
        console.log(fhash)
        Storet.storeHash(pat.pat_id,web3.fromAscii(fhash.substr(0,24)),web3.fromAscii(fhash.substr(24,46)),{from: web3.eth.accounts[2], gas:3000000});
        console.log(pat.pat_id)
        var l2 = Storet.getPatientHash(pat.pat_id,{from: web3.eth.accounts[2], gas:3000000}).toString();
        console.log(l2)
        //this.props.history.replace(`/hospitalview/${this.props.match.params.id}/${this.props.match.params.pbkey}/${this.props.match.params.pvtkey}`)
        this.props.history.goBack()
    }

    
    render(){
        return(
            <div className={styles.createRecord}>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div className={styles.form}>
                    <form className={styles.insideform} onSubmit={this.handlesubmit}>
                        <input ref = "patient_id" className = {styles.tbox} type = "text" placeholder = "Enter Patient ID" />
                        <input ref = "diagnosis" className = {styles.tbox} type = "text" placeholder = "Enter Diagnosis" />
                        <input ref = "date" className = {styles.tbox} type = "text" placeholder = "Enter Date" />
                        <input ref = "location" className = {styles.tbox} type = "text" placeholder = "Enter Location" />
                        <input ref = "medication" className = {styles.tbox} type = "text" placeholder = "Enter Medication" />
                        <input ref = "suggestion" className = {styles.tbox} type = "text" placeholder = "Enter Suggestion" />
                        <input ref = "next_review" className = {styles.tbox} type = "text" placeholder = "Enter Next Review" />
                        <input ref = "notes" className = {styles.tbox} type = "text" placeholder = "Enter Additional Notes" />
                        <button className={styles.submitForm}>Submit</button>
                    </form>
                </div>
            <div></div>
            </div>
        )
    }
}