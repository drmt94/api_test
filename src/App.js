import logo from './logo.svg';
import './App.css';
import * as React from "react";
import axios from "axios";
class App extends React.Component{
    state = {
        selectedCoin : "Unknown",
        date : undefined,
        value: 0,
        money: 0,
        symbols: [{
            value: "ILS",
            name : "\u20AA-Israeli Shekels"
        },
            {
               value: "AUD",
                name: "$-Australian"
            }
            ,
            {
                value: "USD",
                name: "$-American"
            }
            ,
            {
                value: "GBP",
                name: "£-Pound"
            }
            ]
    };


    onChange = (event) => {
        this.setState({
            [event.target.name] : event.target.value
        },()=>{
            this.getExchangeRate()
        })


    };

    getExchangeRate = () =>
    {
        if (this.hasAllRequiredData()) {
            axios.get('http://data.fixer.io/api/' + this.state.date, {
                params: {
                    access_key: "537f313b8f4515d1306ab136ccdc070c",
                    symbols: this.state.selectedCoin,
                    format: 1
                }

            })

                .then((response) => {
                    this.setState({
                        value: response.data.rates[this.state.selectedCoin]
                    })
                })
        }
    };
    hasAllRequiredData = ()=>
    {
        return this.state.date && this.state.selectedCoin != "Unknown"

    }


    render() {
    return (
        <div className="App">
          <h1>Converter: {this.hasAllRequiredData() &&
          <span>({this.state.selectedCoin}) - ({this.state.date})</span> }</h1>
          <select name={"selectedCoin"} onChange={this.onChange} value={this.state.selectedCoin}>
            <option value={"Unknown"} disabled={true}>Choose Coin</option>
              {
                  this.state.symbols.map((option)=>{
                      return(
                          <option value={option.value}>{option.name}</option>
                      )
                  })
              }
          </select> <br/>
            <input type={"date"} name={"date"} value={this.state.date} onChange={this.onChange}/>
            <input value={this.state.value}  disabled={true}/>
            <br/>
            <br/>
            {this.hasAllRequiredData() &&
                <div>

                   how much Euro? <input name={"money"} value={this.state.money} onChange={this.onChange} type={"number"}/>
                    <br/>
                    your money equals to : {(this.state.value * this.state.money)}{this.state.selectedCoin}
            </div>
                }

        </div>
    );
  }
}

export default App;
