import logo from './logo.svg';
import './App.css';
import CurrencyInput from "./CurrencyInputApp";
import {useEffect, useState} from "react";
import axios from "axios";
// import * as url from "url"; axios;
function App() {

    const [amount1,setAmount1] = useState(1);
    const [amount2,setAmount2] = useState(1);
    const [currency1, setCurrency1] = useState("GBP");
    const [currency2, setCurrency2] = useState("EUR");
    const [rates, setRates] = useState([]);

     useEffect(()=>{
            axios.get('https://api.frankfurter.app/latest?from=USD')
                .then(response => {
                    setRates(response.data.rates);
                })
        }, []);

     useEffect( () =>
     {
         if(!!rates){
             handleAmount1Change(1);
         }
     }, [rates]);

     function format(number) {
         return number.toFixed(4);
     }

     function  handleAmount1Change(amount1){
         setAmount2(format(amount1 * rates[currency2] / rates[currency1]));
         setAmount1(amount1);
     }

     function handleCurrency1Change(currency1){
         setAmount2(format(amount1 * rates[currency2] / rates[currency1]));
         setCurrency1(currency1);
     }

    function  handleAmount2Change(amount2){
        setAmount1(format(amount2 * rates[currency1] / rates[currency2]));
        setAmount2(format(amount2));
    }

    function handleCurrency2Change(currency2){
        setAmount1(amount2 * rates[currency1] / rates[currency2])
        setCurrency2(currency2);
    }

  return (
    <div>
        <h1>Valiutos skaičiuoklė</h1>
       <CurrencyInput
           onAmountChange={handleAmount1Change}
           onCurrencyChange={handleCurrency1Change}
           currencies={Object.keys(rates)}
           amount={amount1}
           currency={currency1}>

       </CurrencyInput>

        <CurrencyInput
            onAmountChange={handleAmount2Change}
            onCurrencyChange={handleCurrency2Change}
            currencies={Object.keys(rates)}
            amount={amount2}
            currency={currency2}>

        </CurrencyInput>
    </div>
  );
}

export default App;
