"use client"

import React, { useEffect, useState } from "react"

let materialValues = []
const initialValues = {
    "date": "",
    "material": "",
    "thickness": "",
    "length": "",
    "weight": "",
    "sheet_quantity": "",
    "strip_quantity": "",
}

export default function RMEntry() {
    const [values, setValues] = useState(initialValues)

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setValues({ ...values, [name]: value })
    }

    useEffect(() => {
        const getValues = async () => {
            let response = await fetch('http://localhost:5000/values?col=materials')
            materialValues = await response.json()

            let materialEl = document.getElementById("material")
            for (let key in materialValues) {
                let option = document.createElement("option")
                option.setAttribute('key', materialValues[key])
                option.innerHTML = materialValues[key]
                materialEl.appendChild(option)
            }

            setValues({ ...values, material: materialValues[0] })
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
        const response = await fetch('http://localhost:5000/shearing-entries', {
            method: 'POST',
            body: JSON.stringify(values),
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
                New Shearing Entry
            </h2>
            <form>
                <div className="grid grid-cols-2 gap-6 mt-4 sm:grid-cols-2">
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
                        <label className="text-gray-700" htmlFor="material">
                            Material
                        </label>
                        <select id="material" name="material"
                        onChange={handleInputChange}
                        className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md focus:outline-none focus:ring">
                        </select>
                    </div>
                    <div>
                        <label className="text-gray-700" htmlFor="thickness">
                            Thickness
                        </label>
                        <input id="thickness" name="thickness"
                            value={values.thickness}
                            onChange={handleInputChange}
                            type="number"
                            className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md focus:outline-none focus:ring"
                        />
                    </div>
                    <div>
                        <label className="text-gray-700" htmlFor="length">
                            Length
                        </label>
                        <input id="length" name="length"
                            value={values.length}
                            onChange={handleInputChange}
                            type="number"
                            className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md focus:outline-none focus:ring"
                        />
                    </div>
                    <div>
                        <label className="text-gray-700" htmlFor="weight">
                            Weight
                        </label>
                        <input id="weight" name="weight"
                            value={values.weight}
                            onChange={handleInputChange}
                            type="number"
                            className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md focus:outline-none focus:ring"
                        />
                    </div>
                    <div>
                        <label className="text-gray-700" htmlFor="sheet_quantity">
                            Sheet Quantity
                        </label>
                        <input id="sheet_quantity" name="sheet_quantity"
                            value={values.sheet_quantity}
                            onChange={handleInputChange}
                            type="number"
                            className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md focus:outline-none focus:ring"
                        />
                    </div>
                    <div>
                        <label className="text-gray-700" htmlFor="strip_quantity">
                            Strip Quantity
                        </label>
                        <input id="strip_quantity" name="strip_quantity"
                            value={values.strip_quantity}
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