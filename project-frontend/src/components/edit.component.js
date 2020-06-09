import React, {Component} from 'react';
import axios from 'axios';
import '../AutoCompleteText.css'
import Fnames from "./fnames";


export default class EditPage extends Component {

  constructor(props){
    super(props);




    this.state = {
      firstName: '',
      surName:'',
      fnameCode:'',
      snameCode:'',
      finalCode:'',
      allsnames:[],
      allfnames:[],
      isLoadedSnames:false,
      isLoadedFnames:false,
      suggestions1: [],
      suggestions2:[],
      text1:'',
      text2:''
    };
  }

  onTextChangedSname = (e) => {


    const { snames } = this.props;
    const value = e.target.value;

    let suggestions = [];
    if(value.length > 0) {
      const regex = new RegExp(`^${value}`, 'i');
      suggestions = snames.sort().filter(v => regex.test(v));
    }
    this.setState(() => ({ suggestions1: suggestions, text1: value}));

 }

  onTextChangedFname = (e) => {

    const { fnames } = this.props;
    const value = e.target.value;

    let suggestions = [];
    if(value.length > 0) {
      const regex = new RegExp(`^${value}`, 'i');
      suggestions = fnames.sort().filter(v => regex.test(v));
    }
    this.setState(() => ({ suggestions2: suggestions, text2: value}));

  }

  renderSuggestionsSname() {
    const { suggestions1 } = this.state;
    if(suggestions1.length === 0) {
      return null;
    }
    return(
      <ul>
           {suggestions1.map((item) => <li onClick={()=> this.suggestionSelectedSname(item)}>{item} </li>)}
      </ul>
    );
  }

  renderSuggestionsFname() {
    const { suggestions2 } = this.state;
    if(suggestions2.length === 0) {
      return null;
    }
    return(
      <ul>
           {suggestions2.map((item) => <li onClick={()=> this.suggestionSelectedFname(item)}>{item} </li>)}
      </ul>
    );
  }

 suggestionSelectedSname (value1) {
   this.setState(()=> ({
     surName: value1,
     text1: value1,
     suggestions1:[],
   }))
 }
 suggestionSelectedFname (value2) {
   this.setState(()=> ({
     firstName: value2,
     text2: value2,
     suggestions2:[],
   }))
 }



  async componentDidMount() {


      axios.get('http://localhost:4000/names/getall/fnames')
      .then((result1) => {


          this.setState({
            allfnames: result1,
            isLoadedSnames:true
          })

          axios.get('http://localhost:4000/names/getall/snames')
          .then((result2) => {
              this.setState({
                allsnames: result2,
                isLoadedFnames:true
              })


            });

        });


  }

  onSubmit = (e) => {
    e.preventDefault();

    console.log(`Form Submitted`);
    console.log(`firstName : ${this.state.firstName}`);
    console.log(`surName : ${this.state.surName}`);


    console.log(this.state);


    const newNameSet = {
      firstName: this.state.firstName,
      surName: this.state.surName
    }

    console.log(newNameSet);

    axios.post('http://localhost:4000/names/get/sname', newNameSet)
         .then(res => {
           console.log("sname here");

           console.log(res.data.Ref1);
           this.setState({
             snameCode:res.data.Ref1,
             snameCompl: true
           })
          console.log(this.state.snameCode);
          console.log(this.state);
          axios.post('http://localhost:4000/names/get/fname', newNameSet)
                .then(res => {
                  console.log("fname here");
                  console.log(res.data);
                  this.setState({
                    fnameCode:res.data.Code,
                    fnameCompl: true
                  })

                  console.log(this.state.fnameCode);
                  console.log(this.state);
                  this.setState({
                    finalCode: this.state.snameCode +" "+ this.state.fnameCode
                  })

                    });
         });











  }
  render(){

    const { text1 } = this.state;
    const { text2 } = this.state;
    return(
      <div style ={{marginTop: 20}}>
          <h3> Welcome to Code Generator Component!!!!</h3>
          <form onSubmit= {this.onSubmit}>
             <div className= "form-group">

             <label> Surname: </label>
             <div className= "App-Component">
             <div className= "AutoCompleteText">
             <input type="text"
                    value={text1}
                    className="form-control"
                    onChange = {this.onTextChangedSname} />
                    {this.renderSuggestionsSname()}


            </div>
            </div>
            <br/>
             <label> First Name: </label>
             <div className= "App-Component">
             <div className= "AutoCompleteText">
             <input type="text"
                     value={text2}
                     className="form-control"
                     onChange = {this.onTextChangedFname} />
                     {this.renderSuggestionsFname()}

             </div>
             </div>
             </div>




             <br/>
             <div className="form-group">

             <input type="submit" value=" Generate Code" className="btn btn-primary" />
             </div>


             <div className= "form-group">
             <label> Result Code: </label>
             <div className= "App-Component">
             <div className= "AutoCompleteText">
             <input type="text"
                    className="form-control"
                    value={this.state.finalCode}
                    onChange = {this.onChangeCode} />
            </div>
            </div>

            </div>
          </form>
      </div>



    )
  }
}
