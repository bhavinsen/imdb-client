import React, { useEffect, useState } from 'react'
import axios from "axios";
import { useDispatch, useSelector } from 'react-redux'
import { addMovie, addActor, addProducer } from '../redux/actions/index'
import { useNavigate } from 'react-router-dom';

const AddMovie = () => {
  let movies = useSelector((state) => state?.movies?.movie)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [name, setName] = useState("")
  const [yearOfRelease, setyearOfRelease] = useState("")
  const [plot, setPlot] = useState("")
  const [poster, setPoster] = useState("")
  const [actor, setActor] = useState([])
  const [producer, setProducer] = useState([])
  const [addActors, setAddActors] = useState(false)
  const [addProducers, setaddProducers] = useState(false)
  const [actorName, setActorName] = useState("")
  const [producerName, setProducerName] = useState("")
  const [actordata, setactordata] = useState()
  const [producerdata, setProducerdata] = useState()

  const HandleData = (e) => {
    setactordata({ ...actordata, [e.target.name]: e.target.value })
  }
  const handleProducer = (e) => {
    setProducerdata({ ...producerdata, [e.target.name]: e.target.value })
  }
  
  const handleAddMovie = async (e) => {
    e.preventDefault()
    const actordatas = JSON.stringify(actordata)
    const producedatas = JSON.stringify(producerdata)
    const formData = new FormData()
    formData.append('name', name)
    formData.append('yearOfRelease', yearOfRelease)
    formData.append('poster', poster)
    formData.append('plot', plot)
    formData.append('actor', actordatas)
    formData.append('producer', producedatas);
    const res = await axios.post(`http://localhost:8080/idmb/createmovie`, formData)
    dispatch(addMovie(res))
    navigate('/')
  }

  useEffect(() => {
    const actorData = async () => {
      const data = await axios.get("http://localhost:8080/idmb/actors").catch((err) => console.log(err, "error"))
      setActor(data?.data?.result)

      const producerData = await axios.get("http://localhost:8080/idmb/producers").catch((err) => console.log(err, "error"))
      setProducer(producerData?.data?.result)
    }
    actorData()
  }, [])

  const addhandleActor = async (e) => {
    e.preventDefault()
    const data = await axios.post("http://localhost:8080/idmb/createactor", actorName)
    dispatch(addActor(data))
  }

  const addhandleProducer = async (e) => {
    e.preventDefault()
    const data = await axios.post("http://localhost:8080/idmb/createproducer", producerName)
    dispatch(addProducer(data))
  }

  return (
    <>
      <div className='md:w-[750px] w-auto mx-auto h-screen flex justify-center items-center'>
        <form onSubmit={handleAddMovie} encType='multipart/form-data' className=' border-2 '>
          <div className="shadow sm:overflow-hidden sm:rounded-md">
            <div className="space-y-6 bg-white px-4 py-5 sm:p-6">
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
                    onChange={(e) => setName(e.target.value)}
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
                    <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
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
                    placeholder="Year Of release"
                    value={yearOfRelease} onChange={(e) => setyearOfRelease(e.target.value)}
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
              <div className="flex items-center w-full gap-5">
                <label htmlFor="company-website" className="block text-sm font-medium text-gray-700 max-w-[80px] whitespace-nowrap">
                  Actor:
                </label>
                <div className='flex  md:ml-[15px] ml-0'>
                  {
                    actor.map((data) => {
                      console.log("🚀 ~ file: addMovie.js:147 ~ actor.map ~ data", data)
                      return (
                        <div className='flex h-5 items-center w-[100px] mx-auto'>
                          <div className="flex h-5 items-center">
                            <input
                              id="comments"
                              name={data.name}
                              type="checkbox"
                              value={data.name}
                              onChange={(e) => HandleData(e)}
                              className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                            />
                          </div>
                          <div className="ml-3 text-sm">
                            <label htmlFor="comments" className="font-medium text-gray-700">
                              {data.name}
                            </label>
                          </div>
                        </div>
                      )
                    })
                  }
                </div>
                <button type='button' className='ml-3 inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2' onClick={() => { setAddActors(true); addhandleActor(); }}>add Actor</button>
                {addActors && <input type="text" className='block w-full flex-1 px-3 py-2 rounded-md border bg-white/10 border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm' value={actorName} onChange={(e) => setActorName(e.target.value)} />}

              </div>

              <div className="flex items-center w-full gap-5">
                <label htmlFor="company-website" className="block text-sm font-medium text-gray-700 max-w-[80px] whitespace-nowrap">
                  Producer:
                </label>
                <div className='flex md:ml-[25px] ml-0'>
                  {
                    producer.map((data) => {
                      return (
                        <>
                          <div className="flex items-center ml-3">
                            <input
                              id="push-everything"
                              name={data.name}
                              type="radio"
                              value={data.name}
                              onChange={(e) => handleProducer(e)}
                              className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
                            />
                            <label htmlFor="push-everything" className="ml-3 block text-sm font-medium text-gray-700">
                              {data.name}
                            </label>
                          </div>
                        </>
                      )
                    })
                  }
                </div>
                <button type='button' className='ml-3 inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2' onClick={() => { setaddProducers(true); addhandleProducer(); }}>Add Producer</button>
                {addProducers && <input type="text" className='block w-full flex-1 px-3 py-2 rounded-md border bg-white/10 border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm' value={producerName} onChange={(e) => setProducerName(e.target.value)} />}

              </div>
            </div>
            <button type='submit' className='ml-3 my-3 inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-11 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'>Add</button>
          </div>
        </form>
      </div>
    </>
  )
}

export default AddMovie