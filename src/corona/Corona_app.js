import React, { Component } from 'react'
import axios from 'axios'
import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { Grid} from '@material-ui/core/'
import Image from 'material-ui-image'
import Header from './Header';
// import img from '../corona/'
class Corona_app extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             paitentData:{},
             stateData:{},
             display:false,
             pData:null
        }
        this.getPaitentDetails=this.getPaitentDetails.bind(this)
        this.getStateDetails=this.getStateDetails.bind(this)
        


    }
    componentDidMount(){
        
    }
    getPaitentDetails(){
        axios.get('https://api.rootnet.in/covid19-in/unofficial/covid19india.org')
        .then(res => {
            const persons = res.data;
            let arrLast=[]
            console.log('persons',persons.data.rawPatientData[0]);
            // const {pic:'',...persons.data.rawPatientData[0],}=
            if(persons.data.rawPatientData){
                for(let i=persons.data.rawPatientData.length-1;i>=0;i-- ){
                    arrLast.push(persons.data.rawPatientData[i])
                }
            }
            
            this.setState({ paitentData:res.data , display:true,pData:persons.data.rawPatientData});
          })
        .catch(console.log)
       
    }
    getStateDetails(){
        axios.get('https://api.covid19india.org/state_district_wise.json')
        .then(res => {
            const persons = res;
            console.log('persons',persons);
            
            this.setState({ stateData:res,display:false});
          })
        .catch(console.log)
    }
    render() {
        const {paitentData,display,pData}=this.state
        // console.log(paitentData.data.rawPatientData)
        // let mapData1=null
        // pdata?mapData1=paitentData.data.rawPatientData:''
        // pdata=pdata
        let pic=''
        const styles = 
            {

            media: {
            height: 0,
            paddingTop: '56.25%', // 16:9,
            marginTop:'30'
            }
            };
        return (
            <div>
                <Header></Header>
                {/* <button onClick={this.getPaitentDetails}>paitentData</button> */}
        <Button id='1' variant="contained" color="primary" onClick={this.getPaitentDetails}>paitent Data</Button>
        <Button  id ='2' variant="contained" color="secondary" onClick={this.getStateDetails}>state Data </Button>

        {display?<div><h2>Total Paitents : {paitentData.data.summary.total}</h2><div></div></div>:''}
        
       {display? <div>
        
           
           <Grid
       container
       spacing={2}
       direction="row"
       justify="flex-start"
       alignItems="flex-start"
   >
       {pData.map(elem => (
                //    {elem.gender=='male'?pic='': pic='../corona/woman.png'}
           
           <Grid item xs={12} sm={6} md={3} key={paitentData.data.rawPatientData.indexOf(elem)}>
               <Card>
                   <CardHeader
                  avatar={
                <Avatar  src={require('../corona/medical-mask.png')} />
                  } 
                       title={elem.notes}
                       subheader={`Reported On:${elem.reportedOn} `}
                   />
                   
                   <CardContent>
                       <Typography variant="h5" gutterBottom>
                        Age:{elem.ageEstimate},
                        Gender : {elem.gender},<br></br>
                        City : {elem.city},<br></br>
                        {/* District : {paitentData.data.rawPatientData[0].district}, */}
                        State : {elem.state},<br></br>
                        Status : <b> {elem.status}</b>
                       </Typography>
                   </CardContent>
               </Card>
            </Grid>
       ))}
   </Grid></div>:''}
            </div>
        )
    }
}

export default Corona_app
