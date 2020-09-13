import React,{Component} from 'react'


export default class Enterrecord extends Component{
    constructor()
    {
        super()
        this.handlesubmit = this.handlesubmit.bind(this)
    }
    

    async handlesubmit(e)
    {
        e.preventDefault();
        
        var pat = new Object();
        console.log("Hello")
        pat.pat_id = this.refs.patient_id.value;
        pat.diagnosis = this.refs.diagnosis.value;
        pat.location = this.refs.location.value;
        pat.medication = this.refs.medication.value;
        pat.suggestion = this.refs.suggestion.value;
        pat.next_review = this.refs.next_review.value;
        pat.notes = this.refs.notes.value;
        console.log(pat);
        let response = await fetch(`http://localhost:5000/hospital/${this.refs.patient_id.value}`,{
            method:"POST",
            mode: 'cors',
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            cache: 'default',
            body:JSON.stringify({"pat":pat})
        })

       // let response = await fetch(`http://localhost:5000/hospital/grecord`)
        console.log(response)

          
    }

    
    render(){
        return(
            <div className="Signup">
                <div className="Signup-form">
                    <form onSubmit={this.handlesubmit}>
                        <input ref = "patient_id" className = "patient_id" type = "text" placeholder = "Enter Patient ID" />
                        <br/>
                        <input ref = "diagnosis" className = "diagnosis" type = "text" placeholder = "Enter Diagnosis" />
                        <br/>
                        <input ref = "location" className = "location" type = "text" placeholder = "Enter Location" />
                        <br/>
                        <input ref = "medication" className = "medication" type = "text" placeholder = "Enter Medication" />
                        <br/>
                        <input ref = "suggestion" className = "suggestion" type = "text" placeholder = "Enter Suggestion" />
                        <br/>
                        <input ref = "next_review" className = "next_review" type = "text" placeholder = "Enter Next Review" />
                        <br/>
                        <input ref = "notes" className = "notes" type = "text" placeholder = "Enter Additional Notes" />
                        <br/>
                        <button className="signup-page_button">Submit</button>
                    </form>
                </div>
            </div>
        )
    }
}

