import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Header from './header'

const EditMovie = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const [name, setName] = useState("")
    const [yearOfRelease, setYearOfRelease] = useState("")
    const [poster, setPoster] = useState("")
    const [plot, setPlot] = useState("")
    const [actor, setActor] = useState("")
    const [producer, setProducer] = useState("")

    useEffect(() => {
        const getDataById = async (e) => {
            const { data } = await axios.get(`http://localhost:8080/idmb/movie/${id}`)
            const res = data.result
            setName(res?.name)
            setYearOfRelease(res?.yearOfRelease)
            setPoster(res?.poster)
            setPlot(res?.plot)
            setActor(res?.actor)
            setProducer(res?.producer)
        }
        getDataById()
    }, [id])

    const updateHandler = async (e) => {
        e.preventDefault()
        const formData = new FormData()
        formData.append('name', name)
        formData.append('yearOfRelease', yearOfRelease)
        formData.append('poster', poster)
        formData.append('plot', plot)
        formData.append('actor', actor)
        formData.append('producer', producer)
        await axios.put(`http://localhost:8080/idmb/editmovie/${id}`, formData)
        navigate('/')
    }

    return (
        <div>
        <Header />
            <div className='md:w-[750px] w-auto mx-auto h-screen flex justify-center items-center'>
                <div className="shadow sm:overflow-hidden sm:rounded-md">
                    <form onSubmit={updateHandler} encType='multipart/form-data' className='border-2 space-y-6 bg-white px-4 py-5 sm:p-6'>
                        <div className="flex items-center w-full gap-5">
                            <label htmlFor="company-website" className="block text-sm font-medium text-gray-700 max-w-[80px] whitespace-nowrap">
                                Movie Name:
                            </label>
                            <div className="mt-1 flex rounded-md shadow-sm w-full">
                                <input
                                    type="text"
                                    name="company-website"
                                    id="company-website"
                                    className="block xl:w-[597px] w-full flex-1 px-3 py-2 rounded-md border bg-white/10 border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                    placeholder="Movie Name"
                                    value={name} onChange={(e) => setName(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className='flex items-center w-full gap-5'>
                            <label className="block text-sm font-medium text-gray-700 max-w-[80px] whitespace-nowrap">poster</label>
                            <div className="mt-1 flex justify-center rounded-md border-2 border-dashed border-gray-300 px-6 pt-5 pb-6 xl:w-[597px] w-full md:ml-[35px] ml-0">
                                <div className="space-y-1 text-center">
                                    <svg
                                        className="mx-auto h-12 w-12 text-gray-400"
                                        stroke="currentColor"
                                        fill="none"
                                        viewBox="0 0 48 48"
                                        aria-hidden="true"
                                    >
                                        <path
                                            d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                                            strokeWidth={2}
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                    </svg>
                                    <div className="flex text-sm text-gray-600">
                                        <label
                                            htmlFor="file-upload"
                                            className="relative cursor-pointer rounded-md bg-white font-medium text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:text-indigo-500"
                                        >
                                            <span>Upload a file</span>
                                            <input id="file-upload" name="file-upload" type="file" className="sr-only xl:w-[597px] w-full"
                                                onChange={(e) => setPoster(e?.target?.files[0])}
                                            />
                                        </label>
                                        <p className="pl-1">or drag and drop</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center w-full gap-5">
                            <label htmlFor="company-website" className="block text-sm font-medium text-gray-700 max-w-[80px] whitespace-nowrap">
                                year:
                            </label>
                            <div className="mt-1 flex rounded-md shadow-sm w-full">
                                <input
                                    type="text"
                                    name="company-website"
                                    id="company-website"
                                    className="block w-full flex-1 px-3 py-2 rounded-md border bg-white/10 border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm md:ml-[45px] ml-0"
                                    placeholder="Year of release"
                                    value={yearOfRelease} onChange={(e) => setYearOfRelease(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="flex items-center w-full gap-5">
                            <label htmlFor="company-website" className="block text-sm font-medium text-gray-700 max-w-[80px] whitespace-nowrap">
                                plot:
                            </label>
                            <div className="mt-1 flex rounded-md shadow-sm w-full">
                                <input
                                    type="text"
                                    name="company-website"
                                    id="company-website"
                                    className="block w-full flex-1 px-3 py-2 rounded-md border bg-white/10 border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm md:ml-[45px] ml-0"
                                    placeholder="Plot"
                                    value={plot} onChange={(e) => setPlot(e.target.value)}
                                />
                            </div>
                        </div>
                        <button type='submit' className='ml-3 my-3 inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-11 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'>Update</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default EditMovie