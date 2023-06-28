"use client"

import React, { useEffect, useState } from "react"

let materialValues = [], scrapValues = [], scrapObj = {}
const initialValues = {
    date: "",
    customer_name: "",
    customer_city: "",
    material: "",
    rate: "",
    tax_rate: "",
    total_amount: "",
    total_scrap: ""
}

export default function MeltingEntry() {
    const [values, setValues] = useState(initialValues)

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setValues({ ...values, [name]: value })
    }

    const createField = (fieldName, fieldLabel) => {
        let element = document.getElementById("grid")
        let div = document.createElement("div")

        let label = document.createElement("label")
        label.setAttribute('class', "text-gray-700")
        label.setAttribute('for', fieldName)
        label.innerHTML = fieldLabel
        
        let input = document.createElement("input")
        input.setAttribute('id', fieldName)
        input.setAttribute('class', "block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md focus:outline-none focus:ring")
        input.setAttribute('name', fieldName)
        input.setAttribute('type', "number")

        div.appendChild(label)
        div.appendChild(input)
        element.appendChild(div)
    }

    const createFields = () => {
        for (let key in scrapValues) {
            createField(scrapValues[key], scrapValues[key] + " Scrap")
            let input = document.getElementById(scrapValues[key])
            input.addEventListener("change", (e) => {
                const { name, value } = e.target
                scrapObj[name] = value
            })
        }
    }

    const setOptions = (id, array) => {
        let element = document.getElementById(id)
            for (let key in array) {
                let option = document.createElement("option")
                option.setAttribute('key', array[key])
                option.innerHTML = array[key]
                element.appendChild(option)
            }
    }

    useEffect(() => {
        const getValues = async () => {
            let response = await fetch('http://localhost:5000/values?col=materials')
            materialValues = await response.json()
            setOptions("material", materialValues)

            response = await fetch('http://localhost:5000/values?col=scrap_types')
            scrapValues = await response.json()

            for (let key in scrapValues) {
                scrapObj = {...scrapObj, [scrapValues[key]]: ""}
            }

            setValues({ ...values, material: materialValues[0] })

            createFields()
        }
        getValues()
    }, [])

    useEffect(() => {
        if (values.material !== '') {
            let materialEl = document.getElementById("material")
            materialEl.setAttribute('value', values.material)
        }
    }, [values.material])
    
    const sendData = async (e) => {
        e.preventDefault()
        let sum = 0
        for (let key in scrapValues) {
            let input = document.getElementById(scrapValues[key])
            sum += Number(input.value)
        }

        let obj = {...values, scrap: scrapObj, total_scrap: sum}
        const response = await fetch('http://localhost:5000/melting-entries', {
            method: 'POST',
            body: JSON.stringify(obj),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const data = await response.json()
        alert(data.msg)
    }
    
    return (
        <section className="max-w-6xl p-6 mx-auto bg-white rounded-md shadow-xl">
            <h2 className="text-lg font-semibold text-gray-700 capitalize">
                New Melting Entry
            </h2>
            <form>
                <div id="grid" className="grid grid-cols-2 gap-6 mt-4 sm:grid-cols-2">
                    <div>
                        <label className="text-gray-700" htmlFor="date">
                            Date
                        </label>
                        <input id="date" name="date"
                            value={values.date}
                            onChange={handleInputChange}
                            type="date"
                            className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring"
                            />
                    </div>
                    <div>
                        <label className="text-gray-700" htmlFor="customer_name">
                            Customer Name
                        </label>
                        <input id="customer_name" name="customer_name"
                            value={values.customer_name}
                            onChange={handleInputChange}
                            type="text"
                            className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring"
                            />
                    </div>
                    <div>
                        <label className="text-gray-700" htmlFor="customer_city">
                            Customer City
                        </label>
                        <input id="customer_city" name="customer_city"
                            value={values.customer_city}
                            onChange={handleInputChange}
                            type="text"
                            className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring"
                            />
                    </div>
                    <div>
                        <label className="text-gray-700" htmlFor="material">
                            Material
                        </label>
                        <select id="material" name="material"
                        onChange={handleInputChange}
                        className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md focus:outline-none focus:ring">
                        </select>
                    </div>
                    <div>
                        <label className="text-gray-700" htmlFor="rate">
                            Rate (/kg)
                        </label>
                        <input id="rate" name="rate"
                            value={values.rate}
                            onChange={handleInputChange}
                            type="number"
                            className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md focus:outline-none focus:ring"
                        />
                    </div>
                    <div>
                        <label className="text-gray-700" htmlFor="tax_rate">
                            Tax Rate (%)
                        </label>
                        <input id="tax_rate" name="tax_rate"
                            value={values.tax_rate}
                            onChange={handleInputChange}
                            type="number"
                            className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md focus:outline-none focus:ring"
                        />
                    </div>
                    <div>
                        <label className="text-gray-700" htmlFor="total_amount">
                            Total Amount
                        </label>
                        <input id="total_amount" name="total_amount"
                            value={values.total_amount}
                            onChange={handleInputChange}
                            type="number"
                            className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md focus:outline-none focus:ring"
                        />
                    </div>
                </div>
                <div className="flex justify-end mt-6">
                    <button
                        className="px-8 py-2.5 leading-5 text-white transition-colors duration-300 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600"
                        onClick={sendData}>
                        Save
                    </button>
                </div>
            </form>
        </section>
    )
}