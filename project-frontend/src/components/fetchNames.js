import React, {Component} from 'react';
import axios from 'axios';


export default class fetchNames extends Component {

  constructor(props){
    super(props);
    this.snames=[];
    this.fnames=[];
}

  componentDidMount(){

    console.log(this.state);
    const snames = [];
    const fnames = [];
      axios.get('http://localhost:4000/names/getall/fnames')
      .then((result1) => {
          fnames=({ result1 })

          axios.get('http://localhost:4000/names/getall/snames')
          .then((result2) => {
              snames=({ result2 })
              console.log("Done Fetch");
              console.log(this.state);

            });

        });

  }

}
