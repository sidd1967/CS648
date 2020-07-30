import React, {Component} from 'react';
import axios from 'axios';
import '../AutoCompleteText.css'
import { Link, animateScroll as scroll } from "react-scroll";
//import { Redirect } from 'react-router';


const Todo = props => (
    <tr>
        <td>{props.todo.Surname}</td>
        <td>{props.todo.Ref1}</td>


    </tr>
)


const Todo2 = props => (
    <tr>
        <td>{props.todo.Firstname}</td>
        <td>{props.todo.Code}</td>


    </tr>
)

export default class TestNameFinder extends Component {

  constructor(props){
    super(props);
    this.onSubmit = this.onSubmit.bind(this);



    this.state = {
      firstName: [],
      surName: [],
      fnameCode:'',
      snameCode:'',
      finalCode:'',
      isLoadedSnames:false,
      isLoadedFnames:false,
      text1:'',
      text2:''
    };
  }



  onTextChangedCode = (e) => {
      console.log("Changed");
  this.setState({
    finalCode: e.target.value
  });


  }


  onTextChangedFname = (e) => {
    console.log("onTextChangedFname");
    this.setState({
      fnameCode: e.target.value
    })
  }

  onTextChangedSname = (e) => {
    console.log("onTextChangedSname");

    this.setState({
      snameCode: e.target.value
    })
  }

  displaySurname() {
          return this.state.surName.map(function(currentTodo, i){
              return <Todo todo={currentTodo} key={i} />;
          })
      }
  displayFirstname() {
              return this.state.firstName.map(function(currentTodo, i){
                  return <Todo2 todo={currentTodo} key={i} />;
              })
          }


  onSubmit = (e) => {
    e.preventDefault();
    var fincode = this.finCode.value;
    console.log("Fincode Value = " + fincode);
    
    if(fincode === ''){
      var scode = this.soloScode.value;
      var fcode = this.soloFcode.value;
    }
    else{
      var scode = this.scode.value;
      var fcode = this.fcode.value;
    }

      var name = this.state.finalCode;
      
      console.log(scode);
      console.log(fcode);
      

    console.log(`Form Submitted`);
    const codeSet = {
      fnameCode: fcode,
      snameCode: scode
    }

    console.log(codeSet);

  if(scode === '' && fcode ===''){
    window.alert('Please Enter the Codes');


  }
  else if (scode !== '' && fcode !== '') {

    axios.post(`${process.env.REACT_APP_API_URL}/names/get/fnamecode`, codeSet)
        .then((res1) => {
            
            console.log("Firstname Done");
            console.log(res1.data);
            this.setState({
              firstName: res1.data

            });
            axios.post(`${process.env.REACT_APP_API_URL}/names/get/snamecode`, codeSet)
            .then((res2) => {

              if(res1.data.length === '' && res2.data.length === ''){
                window.alert('Invalid Surname and Firstname Codes Please Try again');
              }
              else if(res1.data.length === '' && res2.data.length !== ''){
                window.alert('Invalid Firstname Code Please Try again');
              }
              else if(res1.data.length !== '' && res2.data.length === ''){
                window.alert('Invalid Surname Code Please Try again');
              }
                console.log("Surname Done");
                console.log(res2.data);
                this.setState({
                  surName: res2.data

                });
                console.log(this.state);
              })
              .catch(() => window.alert('Internal Server Error. Please try again Later'));

          })
          .catch(() => window.alert('Internal Server Error. Please try again Later'));


  }
  else if (scode === '' && fcode !== '') {
    axios.post(`${process.env.REACT_APP_API_URL}/names/get/fnamecode`, codeSet)
        .then(res1 => {
          if(res1.data.length === ''){
            window.alert('Invalid Firstname code. Please try again');
          }
          else{
            console.log("Firstname Done");
            console.log(res1.data);
            this.setState({
              firstName: res1.data

            })
          }
            
          })
          .catch(() => window.alert('Internal Server Error PLease Try Again.'));



  }

  else if (scode !== '' && fcode === '') {

    axios.post(`${process.env.REACT_APP_API_URL}/names/get/snamecode`, codeSet)
        .then(res1 => {
          if(res1.data.length === ''){
            window.alert('Invalid Surname Code. Please try again');
          }
          else{
            console.log("Surname Done");
            console.log(res1.data);
            this.setState({
              surName: res1.data

            })
          }
            
          })
          .catch(() => window.alert('Internal Server Error PLease Try Again.'));

  }

  else {
    window.alert('Internal Server Error Please Try Again Later.');
  }



  }
  render(){

    const { finalCode } = this.state;
    //const { firstName } = this.state;
    //const fnameCode =  finalCode.toString().substring(0,4);

      return (

          <div className="form">
        <div className="col-md-6" >
      
        <div className="b">
                    <div className = "bold">Instructions</div> <br/>

     <div className="c">
     The Name Finder Component is used to look-up Names coresponding to the code enetered in the form<br/> It also displays a list of Names with the same code. <br/> - Please Type in the name in the text boxes.
   <br/>- Ideally, you can enter either Surname Code(4 Digits)/Firstname(3 Digits) Code or both(7 Digits).<br/><br/> If you enter<br/>
   <div className= "bold">- Only First Name Code</div>   Returns a list of Firstnames corresponding to the Firstname Code <br/>
   <div className= "bold">- Only Surname Code </div>  Returns a list of Surnames corresponding to the Surname Code<br/>
   <div className= "bold">- Both Firstname and Surname Code</div>  The system displays the Surname Code and he Firstname Code inthe respective Text boxes. Then after form submission, the system returns a list of Surnames and First Names Corresponding tto the  Digit Code given as input in the form.<br/><br/> 
       </div>
      </div>
<br/>
<div className = "smalltitle2"> Welcome to Name Finder Component</div>
          
          
          <form onSubmit= {this.onSubmit} action = "data">
             <div className= "form-group">
               <div className = "bold1">Enter  7 Digit code (Surname and Firstname)</div>
<div className="borderform">


              <label> Enter Code: </label>
              <div className= "App-Component">
              <div className= "AutoCompleteText">
              <input type="text"
                                  className="form-control"
                                  name="finCode"
                                  onChange={this.onTextChangedCode}
                                  ref={(c) => this.finCode = c}
                              />
              </div>
            </div>
            <br/>
            
  
            <div className="colums">
          <div className="item">
          <label className="label">Surname Code:  </label>
             
             <input type="text"
                    value={finalCode.toString().substring(0,4)}
                    onChange = {this.onTextChangedSname}
                    ref={(c) => this.scode = c}
                    name="scode" disabled/>
             



            
             <label className="label2">Firstname Code:</label>
             
             <input type="text"
                     value={finalCode.toString().substring(4,8)}
                     onChange = {this.onTextChangedFname}
                     ref={(c) => this.fcode = c}
                     name="fcode" disabled/>
</div>
</div>
</div>
</div>
<div className = "bold2">Or you can search individual name codes</div>

<div className="borderform">

<label> Surname Code: </label>
              <div className= "App-Component">
              <div className= "AutoCompleteText">
              <input type="text"
                                  className="form-control"
                                  name="soloScode"
                                  ref={(c) => this.soloScode = c}
                              />
              </div>
            </div>
            <label> First Name Code: </label>
              <div className= "App-Component">
              <div className= "AutoCompleteText">
              <input type="text"
                                  className="form-control"
                                  name="soloFcode"
                                  ref={(c) => this.soloFcode = c}
                              />
              </div>
            </div>
            </div>
             <br/>


<Link
type = "submit"
onClick = {this.onSubmit}
activeClass="active"
to="data"
spy={true}
smooth={true}
offset={0}
duration= {500}><button className = "button button-primary">Find Names</button></Link>

           <br/><br/>

           <h3>Surname List</h3>

                           <table className="table table-striped" style={{ marginTop: 20 }} >

                               <thead>
                                   <tr>
                                       <th>Surname</th>
                                       <th>Code</th>

                                   </tr>
                               </thead>
                               <tbody>
                                   { this.displaySurname() }
                               </tbody>
                           </table>
    <div id="data">
            <h3>Firstname List</h3>
                            <table className="table table-striped" style={{ marginTop: 20 }} >
                                               <thead>
                                                   <tr>
                                                       <th>Firstname</th>
                                                       <th>Code</th>

                                                   </tr>
                                               </thead>
                                               <tbody>
                                                   { this.displayFirstname() }
                                               </tbody>
                                           </table>
                                           </div>







             <br/>
             <div className="form-group">


             </div>


             <div className= "form-group">


            </div>
          </form>
          <br/>
          <br/>
          <br/>
      
              </div>
              </div>


    )
  }
}
