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

    //const { snames } = this.props;
    const sna = this.state.allsnames
    const value = e.target.value;

    var output1 = sna.map(function(obj) {
    return Object.keys(obj).sort().map(function(key) {
    return obj[key];
  });
});

    let suggestions = [];
    if(value.length > 0) {
      const regex = new RegExp(`^${value}`, 'i');
      suggestions = output1.sort().filter(v => regex.test(v));
    }
    this.setState(() => ({ suggestions1: suggestions, text1: value}));

 }

  onTextChangedFname = (e) => {

    //const { fnames } = this.props;
    const fna = this.state.allfnames;

    const value = e.target.value;

    var output = fna.map(function(obj) {
  return Object.keys(obj).sort().map(function(key) {
    return obj[key];
  });
});


    let suggestions = [];
    if(value.length > 0) {
      const regex = new RegExp(`^${value}`, 'i');
      suggestions = output.sort().filter(v => regex.test(v));
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
        console.log("START");

            this.setState({
            allfnames: result1.data,
            isLoadedSnames:true
          })

          axios.get('http://localhost:4000/names/getall/snames')
          .then((result2) => {

              this.setState({
                allsnames: result2.data,
                isLoadedFnames:true
              })
               console.log(this.state);

            });

        });


  }

  onSubmit = (e) => {
    e.preventDefault();

    console.log(`Form Submitted`);
    console.log(`firstName : ${this.state.firstName}`);
    console.log(`surName : ${this.state.surName}`);


  //  console.log(this.state);


    const newNameSet = {
      firstName: this.state.firstName,
      surName: this.state.surName
    }

    //console.log(newNameSet);


    if (this.state.firstName ==='' & this.state.surName === '') {

      window.alert('Name Not Found');

    }
    else if (this.state.firstName === '' && this.state.surName != '') {
      axios.post('http://localhost:4000/names/get/sname', newNameSet)
      .then(res => {
      //  console.log("sname here");

    //  console.log(res.data.Ref1);
        this.setState({
          snameCode:res.data.Ref1,
          snameCompl: true,
          finalCode: res.data.Ref1
        })
      // console.log(this.state);

     })
     .catch(() => window.alert('Please refresh and Try again'));


    }
    else if (this.state.firstName !='' && this.state.surName === '') {

      axios.post('http://localhost:4000/names/get/fname', newNameSet)
            .then(res => {
              console.log("fname here");
              console.log(res.data);
              this.setState({
                fnameCode:res.data.Code,
                fnameCompl: true,
                finalCode: res.data.Code
              })

              console.log(this.state.fnameCode);
              console.log(this.state);
                })
            .catch(() => window.alert('Please refresh and Try again'));


    }

    else {
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
                      finalCode: this.state.snameCode + this.state.fnameCode
                    })

                      })
                      .catch(() => window.alert('Please refresh and Try again'));
           })
           .catch(() => window.alert('Please refresh and Try again'));

    }
  }
  render(){

    const { text1 } = this.state;
    const { text2 } = this.state;
    return(
      <div style ={{marginTop: 20}}>
          <h3> Welcome to Code Generator Component!!!!</h3>
          <p> The Code Generator Component is used to look-up the 7-Digit Soundex Code for the Names given in theform Below. <br/> - Please Type in the name in the text boxes.<br/> - The Auto Suggestion Feature suggests a list of names with the correct spelling.<br/> - Select one of the names.<br/> And Click Generate Code to get the 7 Digit Soundex Code.<br/> Note: You can also generate Codes for Surname or Firstname Only. </p>
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
