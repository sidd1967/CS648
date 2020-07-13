import React, { Component } from 'react';
import { Fabric } from 'office-ui-fabric-react/lib/Fabric';
import { DefaultButton } from 'office-ui-fabric-react/lib/Button';
import XLSX from 'xlsx';
import { make_cols } from './MakeColumns';
import { SheetJSFT } from './types';
import axios from 'axios';
import '../fileHandler.css';
import { Link, animateScroll as scroll } from "react-scroll";
import instructs from "../inst.PNG";

const Todo = props => (
    <tr>

        <td>{props.todo.ID}</td>
        <td>{props.todo.SurnameCode}</td>
        <td>{props.todo.Surname}</td>
        <td>{props.todo.FirstnameCode}</td>
        <td>{props.todo.Firstname}</td>

    </tr>
)



class FileNameFinder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      file: {},
      data: [],
      cols: [],
      finalSet: [],
      genCode: []
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
      const wb = XLSX.read(bstr, { type: rABS ? 'binary' : 'array', bookVBA : true });
      /* Get first worksheet */
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];
      /* Convert array of arrays */
      const data = XLSX.utils.sheet_to_json(ws);
      /* Update state */
      this.setState({ data: data, cols: make_cols(ws['!ref']) }, () => {
        console.log(JSON.stringify(this.state.data, null, 2));
        console.log(this.state);
      });

    };
    if (rABS) {
      reader.readAsBinaryString(this.state.file);
    } else {
      reader.readAsArrayBuffer(this.state.file);
    };



  }

  handleEncoding = () => {
      const data = this.state.data;

      console.log("COMES TO HANDLE ENCODING");
    const totalProps = data.reduce((a, obj) => a + Object.keys(obj).length, 0);
      const length = totalProps/2;
      console.log("Length == " + length);



      var scode;
      var fcode;
      var code;
      var fullCode = [];
     //var name = "123456789"
     //var test = name.toString().substring(0, 2);


     for(var i =0; i<length;i++){

         code = data[i].Code

         if (code.toString().length < 7) {

             switch (code.toString().length) {
                 case 0:
                     break;
                 case 1: code = "000000" + code;
                     break;
                 case 2: code = "00000" + code;
                     break;
                 case 3: code = "0000" + code;
                     break;
                 case 4: code = "000" + code;
                     break;
                 case 5: code = "00" + code;
                     break;
                 case 6: code = "0" + code;
                     break;

             }

         }
         console.log(code);
         scode = code.toString().substring(0, 4);
         fcode = code.toString().substring(4, 8);
         fullCode.push(({ "ID": data[i].ID, "Scode": scode, "Fcode": fcode }))
         // console.log(fullCode)


      }

      const requestOptions = {
          body: fullCode,
          length: length
      };
      console.log(requestOptions.body)
      axios.post('http://localhost:4000/names/get/filecodes', requestOptions)
      .then(res => {
      //  console.log("sname here");
       console.log("DATA RECEIVED FROM SERVER");
          console.log(res.data);
          res.data.sort((a, b) => a.ID - b.ID);
       this.setState({
         finalSet: res.data
       });


       console.log(this.state);

     })

  }
   
  displayNames() {

          return this.state.finalSet.map(function(currentTodo, i){

              return <Todo todo={currentTodo}  key={i} />;
          })

      }

      


  render() {
   

      return (
          <div className="form">
        <div class="container">
            <div class="row">

    	  <div class="col-md-6">
        

        
        <div className="b">
    Format of the File to be uploaded <br/><br/><img src = {instructs} className = "center" alt="Soundex Project" /> <br/><br/>
     <div className="c">
     The file to be uploaded can be of the formats:
     <div className="textbox"> <br/> .xlsx, .xlsb, .xlsm, .xls, .xml, .csv, .txt,<br/> .ods, .fods, .uos, .sylk, .dif, .dbf, .prn, <br/>.qpw .wb*, .wq*, .html, .htm <br/><br/></div>
   <br/>- The file must contain 2 columns: "ID" and "Code".<br/> - ID is just a serial Number. <br/>
   - Ideally, the code must be a 7 digit integer, but the excel files eliminate the leading zeros.<br/> - For Example if the correct structure of Soundex code is 0001023, but excel saves it as 1023 which is not correct.
     <br/>- The system is designed to acknowledge this problem and convert the code from "1023" to "0001023"<br/><br/>

       
       
       </div>
      </div>
        <br/>
        
          

                    <br />

                  <div class="form-group files">
                    <label htmlFor="file"><h3>Upload Your File</h3> </label>
                     <input type="file" className="form-control" id="file" accept={SheetJSFT} onChange={this.handleChange} />
                  </div>
                  <br />
                    <thead>
                        <tr>
                            <th><input type='submit'
                                value="Upload"
                                onClick={this.handleFile} className="btn btn-primary" /></th>
                            <th>         </th>
                            <th>  <Link
                                type="submit"
                                onClick={this.handleEncoding}
                                activeClass="active"
                                to="data"
                                className="btn btn-primary"
                                style={{ float: 'left', paddingRight: '15px', marginLeft: '10px', color: 'white' }}
                                spy={true}
                                smooth={true}
                                offset={0}
                                duration={500}>Find Code</Link></th>



                        </tr>
                    </thead>





                      <br/>




                </div>

                

                <div class="col-md-8">
                    <div id="data">
                    <p>The table below displays the Surname and Firstnames corresponding to the 7 Digit Soundex Code in the uploaded files.</p>
                <table className="table table-striped" style={{ marginTop: 30 }} >
                    <thead>
                        <tr>
                            <th>SNo.</th>
                            <th>Surname Code</th>
                            <th>Surname</th>
                            <th>Firstname Code</th>
                            <th>Firstname</th>



                        </tr>
                    </thead>
                    <tbody>

                        {this.displayNames()}
                    </tbody>
                    </table>
                    </div>
                </div>



    	  </div>
              </div>

          </div>

    )

  }
}

export default FileNameFinder;
