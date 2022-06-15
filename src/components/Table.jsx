import React, { useEffect, useState, useCallback } from 'react'
import axios from 'axios'
import { Table } from 'react-bootstrap';
import '../App.css';
import {Icon} from "./Icons";


const columns = ['Name', 'Capital', 'Region', 'Flag']

const BootsTable = () => {
    const [countries, setCountries] = useState([])
    const [filteredCountries, setFilteredCountries] = useState([])

    const fetchCountries = useCallback(async () => {
        try {
            const { data } = await axios('https://restcountries.com/v2/all');
            const items = data?.map((item) => ({
                name: item.name,
                capital: item.capital,
                region: item.region,
                flag: item.flags.png
            }));
            setFilteredCountries(items);
            setCountries(items);
        } catch (error) {
            console.log('error: ', error);
        }
    }, []);

    const handleChange = useCallback(
        ({ target: { value } }) => {
            const filteredValues = countries.filter(country => {
                return country?.name?.toLowerCase().includes(value?.toLowerCase()) ||
                    country?.capital?.toLowerCase().includes(value?.toLowerCase()) ||
                    country?.region?.toLowerCase().includes(value?.toLowerCase())
            }
            )
            setFilteredCountries(filteredValues);
        },
        [countries],
    )

    useEffect(() => {
        fetchCountries();
    }, [fetchCountries]);


    return (
        <div>
            <div className='d-flex  justify-content-between m-4 relative align-items-center'>
               <label htmlFor="search-input" className="position-absolute d-flex justify-content-center ps-3">
               <Icon size={24} name="search" />
               </label>
               <input onChange={handleChange} placeholder="Search in countries" className='form-control w-25 rounded-pill justify-content-between d-flex ps-5'/>
            </div>
            <Table striped bordered hover variant="dark">
                <thead>
                    <tr>
                        {columns.map((columnItem, columnIndex) => (
                            <th key={columnIndex}>{columnItem}</th>
                        ))}
                    </tr>
                </thead>
                <tbody className="align-middle">
                    {filteredCountries?.map((countryItem, countryIndex) => (
                        <tr key={countryIndex}>
                            <td>{countryItem.name}</td>
                            <td>{countryItem.capital}</td>
                            <td>{countryItem.region}</td>
                            <td>
                                <img src={countryItem.flag} width="50" height={50} alt="" />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    )
}

export default BootsTable