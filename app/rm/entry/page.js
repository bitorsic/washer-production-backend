"use client"

import React, { useEffect, useState } from "react"
import ReactDOM from "react-dom/client"

let materialValues = [], formValues = []
const initialValues = {
    date: "",
    lot_no: "",
    material: "",
    form: "",
    thickness: "",
    length: "",
    quantity: "",
    weight: "",
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
            response = await fetch('http://localhost:5000/values?col=forms')
            formValues = await response.json()

            setValues({ ...values, material: materialValues[0], form: formValues[0] })
        }
        getValues()
    }, [])

    useEffect(() => {
        if (values.material !== '') {
            let materialEl = document.getElementById("material")
            materialEl.setAttribute('value', values.material)
        }
    }, [values.material])

    useEffect(() => {
        if (materialValues.length>0) {
            let materialEl = document.getElementById("material")
            for (let key in materialValues) {
                let option = document.createElement("option")
                option.setAttribute('key', materialValues[key])
                option.innerHTML = materialValues[key]
                materialEl.appendChild(option)
            }
        }
    }, [materialValues])

    useEffect(() => {
        if (values.form !== '') {
            let formEl = document.getElementById("form")
            formEl.setAttribute('value', values.form)

            let lengthEl = document.getElementById("length")
            if (values.form == 'Strip') {
                lengthEl.disabled = true
                lengthEl.value = null
                values.length = null
            } else if (values.form == 'Sheet') {
                lengthEl.disabled = false
                lengthEl.value = ""
                values.length = ""
            }
        }
    }, [values.form])

    useEffect(() => {
        if (formValues.length>0) {
            let formEl = document.getElementById("form")
            for (let key in formValues) {
                let option = document.createElement("option")
                option.setAttribute('key', formValues[key])
                option.innerHTML = formValues[key]
                formEl.appendChild(option)
            }
        }
    }, [formValues])
    
    const sendData = async (e) => {
        e.preventDefault()
        const response = await fetch('http://localhost:5000/raw-material/entry', {
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
                New Raw Material Entry
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
                        <label className="text-gray-700" htmlFor="lot_no">
                            Lot No.
                        </label>
                        <input id="lot_no" name="lot_no"
                            value={values.lot_no}
                            onChange={handleInputChange}
                            type="number"
                            className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md focus:outline-none focus:ring"
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
                        <label className="text-gray-700" htmlFor="form">
                            Form
                        </label>
                        <select id="form" name="form"
                        onChange={handleInputChange}
                        className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md focus:outline-none focus:ring">
                            {/* {formValues.map((val) => <option key={val}>{val}</option>)} */}
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
                        <label className="text-gray-700" htmlFor="quantity">
                            Quantity
                        </label>
                        <input id="quantity" name="quantity"
                            value={values.quantity}
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