import React , {Component} from 'react'
export default class Enterrecord extends Component{
    constructor()
    {
        super()
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleSubmit(event) {
        event.preventDefault();
        console.log("Here");
        this.props.history.push(`/hospital/Viewpatient/test`)
    }

    render()
    {
        return(
            <div>
                <form className="loginForm" onSubmit={this.handleSubmit}>
            
                <div className = "er1">
                    Patient ID:
                    <input ref = "patient_id" className = "patient_id" type = "text" placeholder = "" />
                </div>
                <br/>   
                <div className = "er2">
                    Diagnosis:
                    <input ref = "diagnosis" className = "diagnosis" type = "text" placeholder = "" />
                </div>            
                <br/>
                <div className = "er3">
                    Location:
                    <input ref = "location" className = "location" type = "text" placeholder = "" />
                </div>
                <br/>
                <div className = "er4">
                    Medication:
                    <input ref = "medication" className = "medication" type = "text" placeholder = "" />
                </div>
                <br/>
                <div className = "er5">
                    Suggestion:
                    <input ref = "suggestion" className = "suggestion" type = "text" placeholder = "" />
                </div>
                <br/>
                <div className = "er6">
                        Next Review:
                        <input ref = "next_review" className = "next_review" type = "text" placeholder = "" />
                </div>
                <div className = "er7">
                    <button type="button" className = "record_button">Submit</button> 
                </div>
               
                </form>
            </div>
        )
    }
}