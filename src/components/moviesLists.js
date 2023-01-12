import React, { useEffect } from 'react'
import axios from "axios";
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { getMovies } from '../redux/actions/index'
import Header from './header';

const MoviesLists = () => {
    const navigate = useNavigate()
    let movies = useSelector((state) => state?.movies?.movies?.data?.result)
    const dispatch = useDispatch();
    const getMoviesF = async () => {
        const result = await axios.get('http://localhost:8080/idmb/movie').catch((err) => console.log(err, "error"))
        dispatch(getMovies(result))
    }
    useEffect(() => {
        getMoviesF()
    }, [])
    return (
        <div>
            <Header />
            {
                movies && movies?.map((movie) => {
                    let data = []
                    let producerdata = []
                    try {
                        const myString = JSON.parse(movie.actor);
                        data.push(Object.keys(myString))
                    } catch (error) {
                        if (error instanceof SyntaxError) {
                            console.error('Invalid JSON:', error.message);
                        } else {
                            throw error;
                        }
                    }
                    try {
                        const producerString = JSON.parse(movie.producer);
                        producerdata.push(Object.keys(producerString))
                    } catch (error) {
                        if (error instanceof SyntaxError) {
                            console.error('Invalid JSON:', error.message);
                        } else {
                            throw error;
                        }
                    }
                    return <div>
                        <div className="mt-4">
                            <div className="rounded-lg drop-shadow-xl  border-2  border-indigo-300 bg-white max-w-[429px] mx-auto py-6">
                                <a href="#!" data-mdb-ripple="true" data-mdb-ripple-color="light">
                                    <img src={`http://localhost:8080/public/${movie.poster}`} className="mx-auto" />
                                </a>
                                <div className="p-6">
                                    <h5 className="text-gray-900 text-xl font-medium mb-2">Name: {movie.name}</h5>
                                    <h3>Year Of Release: {movie.yearOfRelease}</h3>
                                    <p className="text-gray-700 text-base mb-4">
                                        Plot: {movie.plot}
                                    </p>
                                    <p className="text-gray-700 text-base mb-4">
                                        Actor: {data[0] + ','}
                                    </p>
                                    <p className="text-gray-700 text-base mb-4">
                                        Producer: {producerdata[0]}
                                    </p>
                                    <button className=" inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out" type='button' onClick={() => navigate(`/${movie._id}`)}>Edit</button>
                                </div>
                            </div>
                        </div>

                    </div>
                }
                )
            }
        </div>
    )
}

export default MoviesLists