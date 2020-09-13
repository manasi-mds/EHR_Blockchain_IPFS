import React , {Component} from 'react';
import {BrowserRouter,Route,Link} from 'react-router-dom';
import Home from './Home'
import Patient from './Patient'
import Hospital from './Hospital'
import Login from './Login'
import Signup from './Signup'
import PatientView from './PatientView'
import AccessModify from './AccessModify'
import Test from './Test'
import HospitalLogin from './HospitalLogin'
import HospitalSignup from './HospitalSignup'
import HospitalView from './HospitalView'
import CreateRecord from './CreateRecord'
import HospitalRecords from './HospitalRecords'

export default class Search extends Component {
    constructor(){
        super()
        this.getRecords = this.getRecords.bind(this)
        // this.getAllRecords = this.getAllRecords.bind(this)
    }
    getRecords(hash,records)
    {
        console.log(hash)
        console.log(records)
        this.setState({
            hash:hash,
            records:records
        })
    }
    // getAllRecords(hash,records)
    // {
    //     console.log(hash)
    //     console.log(records)
    //     this.setState({
    //         all_records:records
    //     })
    // }
    render(){
        return(
            <div>
            <Route exact path='/' component={Home}/>
            <Route exact path='/patient' component={Patient}/>
            <Route exact path='/hospital' component={Hospital}/>
            <Route exact path='/login' component={Login}/>
            <Route exact path='/signup' component={Signup}/>
            <Route exact path='/hospital_login' component={HospitalLogin}/>
            <Route exact path='/hospital_signup' component={HospitalSignup}/>
            <Route exact path='/test' component={Test}/>
            <Route exact path='/hospitalview/:id/:pbkey/:pvtkey' component={HospitalView}/>
            <Route exact path='/createrecord/:id/:pbkey/:pvtkey' component={CreateRecord}/>
            <Route exact path='/hospitalrecords/:id/:pbkey/:pvtkey' component={HospitalRecords}/>
            <Route exact path='/patientview/:id/:pbkey/:pvtkey' render={(props) => <PatientView {...props} getRecords={this.getRecords} />}/>
            <Route exact path='/access/:id/:pbkey/:pvtkey' render={(props) => <AccessModify {...props} hashes = {this.state.hash} records = {this.state.records}/>}/>
            </div>
        )
    }
}