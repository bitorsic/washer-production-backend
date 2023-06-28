'use client'
 
import { useRouter } from 'next/navigation'

export default function Dashboard() {
    const router = useRouter()

    return (
        <div className="container px-6 py-10 mx-auto">
            <h1 className="text-3xl font-bold text-gray-800 mx-auto w-48 h-2">Dashboard</h1>

            <div className="grid grid-cols-1 gap-8 mt-8 xl:mt-12 xl:gap-12 sm:grid-cols-2 xl:grid-cols-4 lg:grid-cols-3">
                <div className="flex flex-col max-w-xs gap-y-5">
                    <h2 className="flex justify-center font-semibold text-xl">Raw Material</h2>
                    <button
                    onClick={() => router.push('/rm/entry')} 
                    className="bg-black flex items-center text-white justify-center gap-x-3  rounded-lg hover:bg-gray-700 duration-300 transition-colors border px-8 py-2.5">
                        <span>New RM Entry</span>
                    </button>
                    <button 
                    className="bg-black flex items-center text-white justify-center gap-x-3  rounded-lg hover:bg-gray-700 duration-300 transition-colors border px-8 py-2.5">
                        <span>RM Entry History</span>
                    </button>
                    <button 
                    className="bg-black flex items-center text-white justify-center gap-x-3  rounded-lg hover:bg-gray-700 duration-300 transition-colors border px-8 py-2.5">
                        <span>RM Inventory</span>
                    </button>
                </div>

                <div className="flex flex-col max-w-xs gap-y-5">
                    <h2 className="flex justify-center font-semibold text-xl">Shearing</h2>
                    <button 
                    onClick={() => router.push('/shearing/entry')} 
                    className="bg-black flex items-center text-white justify-center gap-x-3  rounded-lg hover:bg-gray-700 duration-300 transition-colors border px-8 py-2.5">
                        <span>New Shearing Entry</span>
                    </button>
                    <button className="bg-black flex items-center text-white justify-center gap-x-3  rounded-lg hover:bg-gray-700 duration-300 transition-colors border px-8 py-2.5">
                        <span>Shearing Entry History</span>
                    </button>
                </div>

                <div className="flex flex-col max-w-xs gap-y-5">
                    <h2 className="flex justify-center font-semibold text-xl">Production</h2>
                    <button 
                    onClick={() => router.push('/production/entry')}
                    className="bg-black flex items-center text-white justify-center gap-x-3  rounded-lg hover:bg-gray-700 duration-300 transition-colors border px-8 py-2.5">
                        <span>New Production Entry</span>
                    </button>
                    <button 
                    className="bg-black flex items-center text-white justify-center gap-x-3  rounded-lg hover:bg-gray-700 duration-300 transition-colors border px-8 py-2.5">
                        <span>Production Entry History</span>
                    </button>
                    <button 
                    className="bg-black flex items-center text-white justify-center gap-x-3  rounded-lg hover:bg-gray-700 duration-300 transition-colors border px-8 py-2.5">
                        <span>Washer Inventory</span>
                    </button>
                </div>

                <div className="flex flex-col max-w-xs gap-y-5">
                    <h2 className="flex justify-center font-semibold text-xl">Scrap</h2>
                    <button className="bg-black flex items-center text-white justify-center gap-x-3  rounded-lg hover:bg-gray-700 duration-300 transition-colors border px-8 py-2.5">
                        <span>Scrap Entry History</span>
                    </button>
                    <button className="bg-black flex items-center text-white justify-center gap-x-3  rounded-lg hover:bg-gray-700 duration-300 transition-colors border px-8 py-2.5">
                        <span>Scrap Inventory</span>
                    </button>
                </div>

                <div className="flex flex-col max-w-xs gap-y-5">
                    <h2 className="flex justify-center font-semibold text-xl">Melting</h2>
                    <button 
                    onClick={() => router.push('/melting/entry')}
                    className="bg-black flex items-center text-white justify-center gap-x-3  rounded-lg hover:bg-gray-700 duration-300 transition-colors border px-8 py-2.5">
                        <span>New Melting Entry</span>
                    </button>
                    <button className="bg-black flex items-center text-white justify-center gap-x-3  rounded-lg hover:bg-gray-700 duration-300 transition-colors border px-8 py-2.5">
                        <span>Melting Entry History</span>
                    </button>
                </div>

                <div className="flex flex-col max-w-xs gap-y-5">
                    <h2 className="flex justify-center font-semibold text-xl">Delivery</h2>
                    <button 
                    onClick={() => router.push('/delivery/entry')}
                    className="bg-black flex items-center text-white justify-center gap-x-3  rounded-lg hover:bg-gray-700 duration-300 transition-colors border px-8 py-2.5">
                        <span>New Delivery Entry</span>
                    </button>
                    <button className="bg-black flex items-center text-white justify-center gap-x-3  rounded-lg hover:bg-gray-700 duration-300 transition-colors border px-8 py-2.5">
                        <span>Delivery Entry History</span>
                    </button>
                </div>

                <div className="flex flex-col max-w-xs gap-y-5">
                    <h2 className="flex justify-center font-semibold text-xl">Customers</h2>
                    <button className="bg-black flex items-center text-white justify-center gap-x-3  rounded-lg hover:bg-gray-700 duration-300 transition-colors border px-8 py-2.5">
                        <span>Customers List</span>
                    </button>
                </div>
            </div>
        </div>
    )
}