import React, {Component} from 'react';
import axios from 'axios';
import '../AutoCompleteText.css'

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

export default class NameFinder extends Component {

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
      <br/>
      <br/>
          <h3> Welcome to Name Finder Component!!!!</h3>
          <br/>
          <form onSubmit= {this.onSubmit}>
             <div className= "form-group">

             <label> Enter Code: </label>
             <div className= "App-Component">
             <div className= "AutoCompleteText">
             <input type="text"
                    className="form-control"
                    onChange = {this.onTextChangedCode} />
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

             <input type="submit" value=" Find Names" className="btn btn-primary" />
             </div>


             <div className= "form-group">


            </div>
          </form>
      </div>



    )
  }
}
