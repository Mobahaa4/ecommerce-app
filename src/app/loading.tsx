import React from 'react'
import { Oval } from 'react-loader-spinner'

export default function loading() {
    return (

        <div className='bg-gray-200 h-screen flex justify-center items-center'>
            <Oval
            visible={true}
            height="100"
            width="100"
            color="#4fa94d"
            ariaLabel="oval-loading"
            wrapperStyle={{}}
            wrapperClass=""
            />
        </div>
    )
}
