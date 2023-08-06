import './App.css';
import {useEffect, useState} from "react";
import axios from "axios";


function CountryList({countries,handleShow}){
    return <ul>
        {countries.map(country=>
            <li>{country.name.common}{' '} <button onClick={()=>{handleShow(country.name.common)}}>show</button></li>
        )}
    </ul>
}

function Country({country}){
    let style = {

    }

    console.log(country)
    return (
        <>
            <h2>{country.name.common}</h2>
            <table>
                <tr>
                    <td >Capital:</td><td>{country.capital[0]}</td>
                </tr>
                <tr>
                    <td>Area:</td><td>{country.area}</td>
                </tr>
            </table>
            <h3>languages</h3>
            <ul>
                {Object.values(country.languages)
                    .map(language=>
                        <li key={language}>{language}</li>
                    )
                }
            </ul>
            <img
                style={{marginTop: '20px'}}
                src={country.coatOfArms.svg}
                alt="" width='200px'/>
        </>
    )
}

function App() {
    const [filter, setFilter] = useState('')
    const [countries,setCountries]= useState([])

    console.log(countries[0])

    const filteredCountries = countries.filter(country=> {
        const substring = filter.trim().toLowerCase()
        const countryName = country.name.common.toLowerCase()

        return countryName.includes(substring)
    })

    function handleShow(name){
        setFilter(name)
    }


    useEffect(()=>{
        axios.get('https://studies.cs.helsinki.fi/restcountries/api/all')
            .then(res=>setCountries(res.data))
            .catch(err=>{
                console.error('there was an error fetching countries from api: ',err)
            })
    },[])

    function handleFormChange(e){
        setFilter(e.target.value)
    }

    return (
        <div className="App">
            <label htmlFor='search' >
                find countries:{' '}
            </label>
            <input name='search' onChange={handleFormChange} value={filter}/>
            {
                filteredCountries.length>10  && <p>Too many matches define another filter</p>
                ||
                filteredCountries.length===0  && <p>there were no matches, try a different search term</p>
                ||
                filteredCountries.length===1 && <Country country={filteredCountries[0]} handleShow={handleShow}/>
                ||
                <CountryList countries={filteredCountries}  handleShow={handleShow}/>
            }
        </div>
    );
}

export default App;
