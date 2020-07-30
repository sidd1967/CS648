import React, { Component } from 'react';
import { Fabric } from 'office-ui-fabric-react/lib/Fabric';
import { DefaultButton } from 'office-ui-fabric-react/lib/Button';
import XLSX from 'xlsx';
import { make_cols } from './MakeColumns';
import { SheetJSFT } from './types';
import axios from 'axios';
import '../fileHandler.css';
import '../AutoCompleteText.css'
import { Link, animateScroll as scroll } from "react-scroll";
import instructs from "../demo.PNG";



const Todo = props => (
    <tr>
        <td>{props.todo.ID}</td>
        <td>{props.todo.Surname}</td>
        <td>{props.todo.Firstname}</td>
        <td>{props.todo.FinalCode}</td>


    </tr>
)



class ExcelReader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      file: {},
      data: [],
      cols: [],
      finalValues: [],
      fresp: []
    }
    this.handleFile = this.handleFile.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    console.log("comes to handleChange");
    const files = e.target.files;
    if (files && files[0]) this.setState({ file: files[0] });
  };

  handleFile() {
    /* Boilerplate to set up FileReader */
    const reader = new FileReader();
    const rABS = !!reader.readAsBinaryString;

    reader.onload = (e) => {
      /* Parse data */
      const bstr = e.target.result;

      try{
        const wb = XLSX.read(bstr, { type: rABS ? 'binary' : 'array', bookVBA : true });
        const wsname = wb.SheetNames[0];
        const ws = wb.Sheets[wsname];
        /* Convert array of arrays */
          const data = XLSX.utils.sheet_to_json(ws);
          this.setState({ data: data, cols: make_cols(ws['!ref']) }, () => {
            // console.log(JSON.stringify(this.state.data, null, 2));
             console.log(this.state);
             this.handleEncoding();
           });
      }
      catch(err){
        window.alert('Invalid File Uploaded');
        window.location.reload(false);
      }
      
      /* Get first worksheet */
     

      /* Update state */

      
      
      

      
     
       // console.log(this.state.data[0].__rowNum__);

    };
    if (rABS) {
      reader.readAsBinaryString(this.state.file);
    } else {
      reader.readAsArrayBuffer(this.state.file);
    };



  }
  

  handleEncoding = () => {
    const data = this.state.data;
    console.log(data)
    const totalProps = data.reduce((a, obj) => a + Object.keys(obj).length, 0);
   const length = data.reduce((max, x) =>  (x.ID > max) ? x.ID : max, 0)
   var isSnamePresent=false;
   var isFnamePresent= false;
   var isIDPresent =false;
   console.log(length);
   if(length){
    for(var p= 0; p<length; p++){
      if(data[p].hasOwnProperty("Surname"))
      {
         isSnamePresent = true;
      }
     if(data[p].hasOwnProperty("Firstname"))
      {
         isFnamePresent = true;
      }
     if(data[p].hasOwnProperty("ID"))
      {
         isIDPresent =true;
      }
    }
   }
   else{
    window.alert('Upload Failed.\nThis is due to Incorrect syntax of the Uploaded File.');
    window.location.reload(false);

   }
     
     console.log(isSnamePresent);
     console.log(isFnamePresent);
     console.log(isIDPresent);  

    if((isIDPresent === true) && data !== ''){

      if(isSnamePresent === false && isFnamePresent === false){
        window.alert('Upload Failed.\nThis is due to: \n1) Incorrect syntax of the Uploaded File.\n2)Empty File Uploaded');
        window.location.reload(false);
      }
      else{
        console.log("LENGTH = " + length);
        const requestOptions = {
          body: this.state.data,
          length: length
        };
        //  console.log(this.state.data);
          axios.post(`${process.env.REACT_APP_API_URL}/codes/fileget/filenames`, requestOptions)
          .then(res => {
            if(res.data.length === ''){
              window.alert('Operation Failure.\n This is due to: \n 1) Incorrect syntax of the Uploaded File. \n 2) The Uploaded Name records could not be found in Database');
              window.location.reload(false);
            }
          //  console.log("sname here");
           console.log("DATA RECEIVED FROM SERVER");
              console.log(res);
              res.data.sort((a, b) => a.ID - b.ID);
              this.setState({
                  finalValues: res.data
    
           });
    
    
              console.log(this.state.finalValues);
    
         })
  
      }
       
      }

    else{
      window.location.reload(false);


      

  }
}

  displayFinal() {

      return this.state.finalValues.map(function (currentTodo, i) {

              return <Todo todo={currentTodo}  key={i} />;
          })

      }
  

  render() {

      return (
          <div className="form">
        <div className="container">
    	<div className="row">
      
    	  <div className="col-md-6">

        <div className="b">
        Format of the File to be uploaded <br/><br/><img src = {instructs} className = "center3" alt="Soundex Project" /> <br/>
        
        <div className="c">
     The file to be uploaded can be of the formats:
     <div className="textbox"> <br/> .xlsx, .xlsb, .xlsm, .xls, .xml, .csv, .txt,<br/> .ods, .fods, .uos, .sylk, .dif, .dbf, .prn, <br/>.qpw .wb*, .wq*, .html, .htm <br/><br/></div>
   <br/>- The file must contain atleast 2 columns: "ID"(Mandatory fields), "Surname", "Firstname".<br/> - ID is just a serial Number. <br/>
   - Ideally, the file must contain either Surname/FirstnameFields or Both.<br/> If the Uploade file Contains<br/>
   <div className= "bold">- Only First Name Field</div>   Returns a list of 3 digit code corresponding to the Firstnames<br/>
   <div className= "bold">- Only Surname Field</div>  Returns a list of 4 digit code corresponding to the Surname<br/>
   <div className= "bold">- Both Firstname and Surname Fields</div>    Returns a 7 Digit code in the Format "4 Digit Surname Code" followed by "3 Digit" Firstname code<br/><br/><br/> </div>
    
        
        
          </div>

         
                            <div class="form-group files">
                            <div className = "smalltitle"> Welcome to File Handler Code Generator Component</div>
                    <label htmlFor="file"><div className = "smalltitle3">Upload Your File</div> </label>
                     <input type="file" className="form-control" id="file" accept={SheetJSFT} onChange={this.handleChange} />
                  </div>
                  <br />
                  <thead>
                      <tr>
                          
                          <th>         </th>
                          <th>  <Link
                            type = "submit"
                            onClick = {this.handleFile}
                            activeClass="active"
                            to="data"
                            spy={true}
                            smooth={true}
                            offset={0}
                            duration= {500}><button class = "button button-primary">Find Codes</button></Link></th>



                      </tr>
                  </thead>





                      <br/>




                </div>
                

                

                
                <div className ="col-md-8">
                    <div id="data">

                        <p>The table below displays the 7 Digit Soundex Code corresponding to the Surname and First Names in the uploaded files.</p>
                        <table className="table table-striped" style={{ marginTop: 20 }} >
                            <thead>
                                <tr>
                                    <th>SNo.</th>
                                    <th>Surname</th>
                                    <th>Firstname</th>
                                    <th>Code</th>

                                </tr>
                            </thead>
                            <tbody>
                                {this.displayFinal()}
                            </tbody>
                        </table>


                    </div>
                    </div>
                    </div>
                    <br/>
          <br/>
          <br/>
    	  </div>
              </div>

    )

  }
}

export default ExcelReader;
