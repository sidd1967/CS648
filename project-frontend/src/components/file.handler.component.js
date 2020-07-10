import React, { Component } from 'react';
import { Fabric } from 'office-ui-fabric-react/lib/Fabric';
import { DefaultButton } from 'office-ui-fabric-react/lib/Button';
import XLSX from 'xlsx';
import { make_cols } from './MakeColumns';
import { SheetJSFT } from './types';
import axios from 'axios';
import '../fileHandler.css';

const Todo = props => (
    <tr>
        <td>{props.todo.Surname}</td>
        <td>{props.todo.Firstname}</td>
        <td>{props.todo.Ref1}{props.todo.Code}</td>


    </tr>
)


class FileHandler extends Component {
  constructor(props) {
    super(props);
    this.state = {
      file: {},
      data: [],
      cols: [],
      sresp: [],
      fresp: [],
      final: [],
      students: [
            { id: 1, name: 'Wasif', age: 21, email: 'wasif@email.com' },
            { id: 2, name: 'Ali', age: 19, email: 'ali@email.com' },
            { id: 3, name: 'Saad', age: 16, email: 'saad@email.com' },
            { id: 4, name: 'Asad', age: 25, email: 'asad@email.com' }
         ]
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
    const totalProps = data.reduce((a, obj) => a + Object.keys(obj).length, 0);
    const length = totalProps/2;
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
       var finalObj = res.data.fnamecodes.concat(res.data.snamecodes);

       this.setState({
         fresp: res.data.fnamecodes,
         sresp: res.data.snamecodes,
         final: finalObj
       });


       console.log(this.state);
       this.setState({
         final: this.joinObjects(this.state.fresp, this.state.sresp)
       });
       //console.log("after Process");
       //console.log(this.state);




     })

  }
  joinObjects(json1, json2) {
    console.log("COMES TO JOIN OBEJCTS");
    var newAr = [];
    for(var i = 0; i<json1.length;i++)
    {
      console.log(json1[i]);
      console.log(json2[i]);

    }

}



    renderTableHeader() {

      let header = Object.keys(this.state.students[0])
      return header.map((key, index) => {
         return <th key={index}>{key.toUpperCase()}</th>
      })
   }
   renderTableData() {

      return this.state.students.map((code, index) => {
        //console.log("renderTable Data");
        //console.log(code);
         const { _id, Surname, Firstname, Code, Ref1 } = code //destructuring
         return (
            <tr key={_id}>
               <td>{_id}</td>
               <td>{Firstname}</td>
               <td>{Surname}</td>
               <td>{Code}{Ref1}</td>

            </tr>
         )
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
                  <input type='submit'
                    value="Upload"
                    onClick={this.handleFile} />
                    <input type='Button'
                      value="Request"
                      onClick={this.handleEncoding} />





                      <br/>
                      <div>
            <h1 id='title'>React Dynamic Table</h1>
            <table id='students'>
               <tbody>
                  <tr>{this.renderTableHeader()}</tr>
                  {this.renderTableData()}
               </tbody>
            </table>
         </div>



                        </div>

    	  </div>
        </div>

    )

  }
}

export default FileHandler;
