import { ActionTypes } from "../types";

export const getMovies = (movies) => {
    return {
        type: ActionTypes.GET_MOVIES,
        payload: movies
    }
}

export const addMovie = (movie) => {
    return {
        type: ActionTypes.ADD_MOVIE,
        payload: movie
    }
}

export const addActor = (actor) => {
    return {
        type: ActionTypes.ADD_ACTOR,
        payload: actor
    }
}

export const addProducer = (producer) => {
    return {
        type: ActionTypes.ADD_PRODUCER,
        payload: producer
    }
}