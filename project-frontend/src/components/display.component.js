import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';


const Name = props => (
  <tr>
  <td>{props.names.first_name}</td>
  <td>{props.names.surname}</td>
  <td>{props.names.timestamp}</td>

  </tr>
)

export default class displayPage extends Component{

  constructor(props) {
    super(props);
    this.state= {getNames: []};
  }
  componentDidMount() {
    axios.get('http://localhost:4000/names/')
         .then(response => {
           this.setState({getNames: response.data});
         })
         .catch(function (error){
           console.log(error);
         })



  }

  dispPage() {
    return this.state.getNames.map(function(currentName, i){
      return <Name names= {currentName} key={i} />;
    });
  }

  render() {
    return(
      <div>
          <h3>List of Name Codes</h3>
          <table className="table table-striped" style={{ marginTop: 20}}>
             <thead>
                <tr>
                <th> First Name</th>
                <th> Surname </th>
                <th> Timestamp</th>

                </tr>
             </thead>

             <tbody>
                {this.dispPage() }


             </tbody>
          </table>
      </div>


    )
  }
}
