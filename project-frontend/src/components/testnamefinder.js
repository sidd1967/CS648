import React, {Component} from 'react';
import axios from 'axios';
import '../AutoCompleteText.css'
import { Link, animateScroll as scroll } from "react-scroll";
import { Redirect } from 'react-router';


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
    var scode = this.scode.value;
    var fcode = this.fcode.value;

      var name = this.state.finalCode;
      var finCode = this.finCode.value;
      console.log(finCode);
      console.log(name);
      var test = name.toString().substring(0, 2);
      console.log("TEst ==== " + test);

    console.log(`Form Submitted`);
    const codeSet = {
      fnameCode: fcode,
      snameCode: scode
    }

    console.log(codeSet);

  if(scode === '' && fcode ===''){
    window.alert('Code Not Found');


  }
  else if (scode != '' && fcode != '') {

    axios.post('http://localhost:4000/names/get/fnamecode', codeSet)
        .then((res) => {
            console.log("Firstname Done");
            console.log(res.data);
            this.setState({
              firstName: res.data

            });
            axios.post('http://localhost:4000/names/get/snamecode', codeSet)
            .then((res) => {
                console.log("Surname Done");
                console.log(res.data);
                this.setState({
                  surName: res.data

                });
                console.log(this.state);
              })
              .catch(() => window.alert('Problem with Surname'));

          })
          .catch(() => window.alert('Problem With Firstname'));


  }
  else if (scode === '' && fcode != '') {
    axios.post('http://localhost:4000/names/get/fnamecode', codeSet)
        .then(res => {
            console.log("Firstname Done");
            console.log(res.data);
            this.setState({
              firstName: res.data

            })
          })
          .catch(() => window.alert('Problem With Firstname'));



  }

  else if (scode != '' && fcode === '') {

    axios.post('http://localhost:4000/names/get/snamecode', codeSet)
        .then(res => {
            console.log("Surname Done");
            console.log(res.data);
            this.setState({
              surName: res.data

            })
          })
          .catch(() => window.alert('Problem With Surname'));

  }

  else {
    window.alert('Please Try Again Later!!!!');
  }



  }
  render(){

    const { finalCode } = this.state;
    const { firstName } = this.state;
    const fnameCode =  finalCode.toString().substring(0,4);

    return(
      <div style ={{marginTop: 20}}>

          <h3> Welcome to Name Finder Component!!!!</h3>
          <br/>
<p> The Name Finder Component is used to look-up the List of Names corresponding to the 7-Digit Soundex Code filled in the form Below. <br/> - Please Type in the code in the text box.<br/> - The Name Encoding system automatically detects and displays the Surname Code and the First Name Code in the corresponding Text Boxes.<br/> - And Click "Find Names" to get the list of names with the same code entered in the Text Box.<br/>  </p>
          <form onSubmit= {this.onSubmit} action = "data">
             <div className= "form-group">

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
             <label> Surname Code: </label>
             <div className= "App-Component">
             <div className= "AutoCompleteText">
             <input type="text"
                    value={finalCode.toString().substring(0,4)}
                    className="form-control"
                    onInputChange = {this.onTextChangedSname}
                    ref={(c) => this.scode = c}
                    name="scode"/>



            </div>
            </div>
            <br/>
             <label> First Name Code: </label>
             <div className= "App-Component">
             <div className= "AutoCompleteText">
             <input type="text"
                     value={finalCode.toString().substring(4,8)}
                     className="form-control"
                     onInputChange = {this.onTextChangedFname}
                     ref={(c) => this.fcode = c}
                     name="fcode"/>


             </div>
             </div>
             <br/>


<Link
type = "submit"
onClick = {this.onSubmit}
activeClass="active"
to="data"
className="btn btn-primary"
style={{float : 'left', paddingRight : '15px', marginLeft: '0px', color: 'white'}}
spy={true}
smooth={true}
offset={0}
duration= {500}>Find Names</Link>

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



             </div>




             <br/>
             <div className="form-group">


             </div>


             <div className= "form-group">


            </div>
          </form>
      </div>


    )
  }
}
