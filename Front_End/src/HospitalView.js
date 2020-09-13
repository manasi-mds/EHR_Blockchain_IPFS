import React,{Component} from 'react';
import web3 from './web3';
import Storet from './Storet';
import ipfs from './ipfs';
import styles from './css/Hospitalview.module.css'
const ecies = require("eth-ecies");
var Buffer = require('buffer/').Buffer
var crypto = require('crypto'),
    algorithm = 'aes-256-ctr';
var toBuffer = require('typedarray-to-buffer')

export default class PatientView extends Component{
    constructor(props)
    {
        super(props);
        this.viewrecords = this.viewrecords.bind(this)
        this.createrecord = this.createrecord.bind(this)
    
    }

    viewrecords(e)
    {
        e.preventDefault()
        this.props.history.push(`/hospitalrecords/${this.props.match.params.id}/${this.props.match.params.pbkey}/${this.props.match.params.pvtkey}`)
    }

    createrecord(e)
    {
        e.preventDefault()
        this.props.history.push(`/createrecord/${this.props.match.params.id}/${this.props.match.params.pbkey}/${this.props.match.params.pvtkey}`)
    }
    render()
    {
        return(
            <div className={styles.container}>
            <div></div>
            <div className={styles.select}>
                <div>
                <button onClick={this.viewrecords} className={styles.viewrec1}>View Patient Records</button>
                </div>
                <div>
                <button onClick={this.createrecord} className={styles.viewrec2}>Create new Record</button>
                </div>
            </div>
            <div></div>
            </div>
        )
    }
}