import React from 'react'

export default function Temp() {
  return (
    <>
    

<div className="relative overflow-x-auto shadow-md sm:rounded-lg">
    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" className="px-6 py-3">
                    Service ID
                </th>
                <th scope="col" className="px-6 py-3">
                    Name
                </th>
                <th scope="col" className="px-6 py-3">
                    Offered by
                </th>
                <th scope="col" className="px-6 py-3">
                    Hourly rate
                </th> 
                <th scope="col" className="px-6 py-3">
                    State
                </th>
               
            </tr>
        </thead>
        <tbody>
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    55478
                </th>
                <td className="px-6 py-4">
                    java Basic
                </td>
                <td className="px-6 py-4">
                    t7784
                </td>
                <td className="px-6 py-4">
                    Rs.500
                </td>
                <td className="px-6 py-4">
                    <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
                </td>
            </tr>
        </tbody>
    </table>
</div>

    
    </>
  )
}
