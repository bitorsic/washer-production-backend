"use client"

import React, { useEffect, useState } from "react"

const initialValues = {
    date: "",
    invoice_no: "",
    customer_name: "",
    customer_city: "",
    part_no: "",
    quantity: "",
    weight: "",
    rate: "",
    tax_rate: "",
    total_amount: ""
}

export default function DeliveryEntry() {
    const [values, setValues] = useState(initialValues)

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setValues({ ...values, [name]: value })
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
    
    const sendData = async (e) => {
        e.preventDefault()
        const response = await fetch('http://localhost:5000/delivery-entries', {
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
                New Delivery Entry
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
                        <label className="text-gray-700" htmlFor="invoice_no">
                            Invoice No.
                        </label>
                        <input id="invoice_no" name="invoice_no"
                            value={values.invoice_no}
                            onChange={handleInputChange}
                            type="number"
                            className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md focus:outline-none focus:ring"
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
                    <div>
                        <label className="text-gray-700" htmlFor="rate">
                            Rate (/unit)
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