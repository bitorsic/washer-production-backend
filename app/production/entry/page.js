"use client"

import React, { useEffect, useState } from "react"

let materialValues = [], formValues = [], scrapValues = [], scrapObj = {}
const initialValues = {
    date: "",
    material: "",
    form: "",
    thickness: "",
    length: "",
    size: "",
    part_no: "",
    rm_quantity: "",
    rm_weight: "",
    return_rm_quantity: "",
    return_rm_weight: "",
    washer_quantity: "",
    washer_weight: "",
    total_scrap: ""
}

export default function RMEntry() {
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

            response = await fetch('http://localhost:5000/values?col=forms')
            formValues = await response.json()
            setOptions("form", formValues)

            response = await fetch('http://localhost:5000/values?col=scrap_types')
            scrapValues = await response.json()

            for (let key in scrapValues) {
                scrapObj = {...scrapObj, [scrapValues[key]]: ""}
            }

            setValues({ ...values, material: materialValues[0], form: formValues[0] })

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

    useEffect(() => {
        if (values.form !== '') {
            let formEl = document.getElementById("form")
            formEl.setAttribute('value', values.form)

            let lengthEl = document.getElementById("length")
            if (values.form == 'Sheet') {
                lengthEl.disabled = true
                lengthEl.value = null
                values.length = null
            } else if (values.form == 'Strip') {
                lengthEl.disabled = false
                lengthEl.value = ""
                values.length = ""
            }
        }
    }, [values.form])
    
    const sendData = async (e) => {
        e.preventDefault()
        let sum = 0
        for (let key in scrapValues) {
            let input = document.getElementById(scrapValues[key])
            sum += Number(input.value)
        }

        let obj = {...values, scrap: scrapObj, total_scrap: sum}
        const response = await fetch('http://localhost:5000/production-entries', {
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
                New Production Entry
            </h2>
            <form>
                <div id="grid" className="grid grid-cols-5 gap-6 mt-4 sm:grid-cols-3">
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
                        <label className="text-gray-700" htmlFor="form">
                            Form
                        </label>
                        <select id="form" name="form"
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
                        <label className="text-gray-700" htmlFor="size">
                            Size
                        </label>
                        <input id="size" name="size"
                            value={values.size}
                            onChange={handleInputChange}
                            type="number"
                            className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md focus:outline-none focus:ring"
                        />
                    </div>
                    <div>
                        <label className="text-gray-700" htmlFor="part_no">
                            Part No.
                        </label>
                        <input id="part_no" name="part_no"
                            value={values.part_no}
                            onChange={handleInputChange}
                            type="number"
                            className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md focus:outline-none focus:ring"
                        />
                    </div>
                    <div>
                        <label className="text-gray-700" htmlFor="rm_quantity">
                            Raw Material Quantity
                        </label>
                        <input id="rm_quantity" name="rm_quantity"
                            value={values.rm_quantity}
                            onChange={handleInputChange}
                            type="number"
                            className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md focus:outline-none focus:ring"
                        />
                    </div>
                    <div>
                        <label className="text-gray-700" htmlFor="rm_weight">
                            Raw Material Weight
                        </label>
                        <input id="rm_weight" name="rm_weight"
                            value={values.rm_weight}
                            onChange={handleInputChange}
                            type="number"
                            className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md focus:outline-none focus:ring"
                        />
                    </div>
                    <div>
                        <label className="text-gray-700" htmlFor="return_rm_quantity">
                            Raw Material Quantity Returned
                        </label>
                        <input id="return_rm_quantity" name="return_rm_quantity"
                            value={values.return_rm_quantity}
                            onChange={handleInputChange}
                            type="number"
                            className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md focus:outline-none focus:ring"
                        />
                    </div>
                    <div>
                        <label className="text-gray-700" htmlFor="return_rm_weight">
                            Raw Material Weight Returned
                        </label>
                        <input id="return_rm_weight" name="return_rm_weight"
                            value={values.return_rm_weight}
                            onChange={handleInputChange}
                            type="number"
                            className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md focus:outline-none focus:ring"
                        />
                    </div>
                    <div>
                        <label className="text-gray-700" htmlFor="washer_quantity">
                            Washer Quantity
                        </label>
                        <input id="washer_quantity" name="washer_quantity"
                            value={values.washer_quantity}
                            onChange={handleInputChange}
                            type="number"
                            className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md focus:outline-none focus:ring"
                        />
                    </div>
                    <div>
                        <label className="text-gray-700" htmlFor="washer_weight">
                            Washer Weight
                        </label>
                        <input id="washer_weight" name="washer_weight"
                            value={values.washer_weight}
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