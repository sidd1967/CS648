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
        console.log(this.state.data[0].__rowNum__);

    };
    if (rABS) {
      reader.readAsBinaryString(this.state.file);
    } else {
      reader.readAsArrayBuffer(this.state.file);
    };



  }

  handleEncoding = () => {
    const data = this.state.data;
    const totalProps = data.reduce((a, obj) => a + Object.keys(obj).length, 0);
      const length = totalProps / 3;
      console.log("LENGTH = " + length);
    const requestOptions = {
      body: this.state.data,
      length: length
    };
    //  console.log(this.state.data);
      axios.post('http://localhost:4000/names/get/filenames', requestOptions)
      .then(res => {
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

  displayFinal() {

      return this.state.finalValues.map(function (currentTodo, i) {

              return <Todo todo={currentTodo}  key={i} />;
          })

      }


  render() {

    return(
        <div class="container">
    	<div class="row">
    	  <div class="col-md-6">





                  <div class="form-group files">
                    <label htmlFor="file">Upload Your File </label>
                     <input type="file" className="form-control" id="file" accept={SheetJSFT} onChange={this.handleChange} />
                  </div>
                  <br />
                  <thead>
                      <tr>
                          <th><input type='submit'
                            value="Upload"
                            onClick={this.handleFile} className="btn btn-primary"/></th>
                          <th>         </th>
                          <th>  <Link
                            type = "submit"
                            onClick = {this.handleEncoding}
                            activeClass="active"
                            to="data"
                            className="btn btn-primary"
                            style={{float : 'left', paddingRight : '15px', marginLeft: '10px', color: 'white'}}
                            spy={true}
                            smooth={true}
                            offset={0}
                            duration= {500}>Find Names</Link></th>



                      </tr>
                  </thead>





                      <br/>




                </div>
                <aside>
                <br/>

                  <code> Format of the File to be uploaded <br/><br/><img src = {instructs} width="220" height="160" alt="Soundex Project" /> </code>
                </aside>
                <div class="col-md-8">
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
        </div>

    )

  }
}

export default ExcelReader;
