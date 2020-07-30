import React, {Component} from 'react';
import axios from 'axios';
import '../AutoCompleteText.css'
import instructs from "../demo.PNG";


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

    console.log(process.env.REACT_APP_API_URL);
      axios.get(`${process.env.REACT_APP_API_URL}/allnames/getall/fnames`)
      .then((result1) => {
        console.log("START");

            this.setState({
            allfnames: result1.data,
            isLoadedSnames:true
          })

          axios.get(`${process.env.REACT_APP_API_URL}/allnames/getall/snames`)
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
      axios.post(`${process.env.REACT_APP_API_URL}/codes/get/sname`, newNameSet)
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

      axios.post(`${process.env.REACT_APP_API_URL}/codes/get/fname`, newNameSet)
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
      axios.post(`${process.env.REACT_APP_API_URL}/codes/get/sname`, newNameSet)
           .then(res => {
             console.log("sname here");

             console.log(res.data.Ref1);
             this.setState({
               snameCode:res.data.Ref1,
               snameCompl: true
             })
            console.log(this.state.snameCode);
            console.log(this.state);
            axios.post(`${process.env.REACT_APP_API_URL}/codes/get/fname`, newNameSet)
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
      return (
          
          <div className="form">
     <div class="col-md-6">
                  
                     
                      
                  <div className="b">
                    <div className = "bold">Instructions</div> <br/>

     <div className="c">
     The Code Generator Component is used to look-up the 7-Digit Soundex Code for the Names given in the form below. <br/> - Please Type in the name in the text boxes.
   <br/>- Ideally, you can enter either Surname/Firstname or both only from the list of suggestions that will be displayed once you start typing the names in the input text boxes.<br/><br/> If you enter<br/>
   <div className= "bold">- Only First Name </div>   Returns a  3 digit code corresponding to the Firstname<br/>
   <div className= "bold">- Only Surname </div>  Returns a 4 digit code corresponding to the Surname<br/>
   <div className= "bold">- Both Firstname and Surname </div>    Returns a 7 Digit code in the Format "4 Digit Surname Code" followed by "3 Digit" Firstname code<br/><br/> 
   For example, Abby Wynn is represented as 1158002.<br/>
   Here "1158" - Corresponds to Surname(Wynn) Code<br/>
   And "002" - Corresponds to Firstname(Abby) Code<br/><br/>

       
       
       </div>
      </div>
         
                  <br/>


                  <div className = "smalltitle2"> Welcome to Code Generator Component</div>
                  <div className = "bold1">Enter  Names to Find Indexes</div>
                  <div className="borderform">
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

             <input type="submit" value=" Generate Code" className="button button-primary" />
             </div>


             <div className= "form-group">
             <label> Result Code: </label>
             <div className= "App-Component">
             <div className= "AutoCompleteText">
             <input type="text"
                    className="form-control"
                    value={this.state.finalCode}
                                          onChange={this.onChangeCode} />
            </div>
            </div>

            </div>
                      </form></div><br /> 
                      
                      
                      <br/>
          <br/>
          <br/>
              </div>
          </div>



    )
  }
}
