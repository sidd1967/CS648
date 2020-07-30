import React, {Component} from 'react';
import CodeToFirstname from "../CodeToFirstName.PNG"
import CodeToSurname from "../CodeToSurname.PNG"
import FirstnameToCode from "../FirstnameToCode.PNG"
import SurnameToCode from "../SurnameToCode.PNG"
import '../WebServiceDemo.css'



export default  class Webservice extends Component {
  render(){
      return (

          <div className="form">
      <div>
      <br/>
     
          <h3> Welcome to Webservice Demo </h3>
          <div className="subtitle">Webservice for Retrieving Soundex Code for given Names</div>
          <div className ="normaltext">Webservice Request Body and the Expected Response is shown in the Image</div>
          <div className ="normaltextul">For Surname:</div>
          
          <div className= "Link"> Webservice Link: http://localhost:4000/names/get/sname</div>
          <img src = {SurnameToCode} className = "center2" alt="Soundex Project" />
          
          
          <div className= "normaltextul">For Firstname:</div>
          <div className= "Link">Webservice Link: http://localhost:4000/names/get/fname</div>
          <img src = {FirstnameToCode} className = "center2" alt="Soundex Project" />
          <br/>
          

          

          <div className="subtitle">Webservice for Retrieving Names for given codes</div>
          <div className ="normaltext">Webservice Request Body and the Expected Response is shown in the Image</div>

          <div className= "normaltextul">For Surname Code:</div>
          <div className= "Link">Webservice Link: http://localhost:4000/names/get/snamecode</div>
          <img src = {CodeToSurname} className = "center2" alt="Soundex Project" />
          
          
          <div className= "normaltextul">For Firstname Code:</div>          <div className= "Link"> Webservice Link: http://localhost:4000/names/get/fnamecode</div>
          <img src = {CodeToFirstname} className = "center2" alt="Soundex Project" />    
         
          <br/>
          <br/>
          <br/>

              </div>
          </div>
          


    )
  }
}
