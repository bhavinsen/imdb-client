import { ActionTypes } from "../types";

const initialState = {
    movies: [],
    movie: {},
    actor: [],
    producer: []
}

export const moviesReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case ActionTypes.GET_MOVIES:
            return { ...state, movies: payload }
        case ActionTypes.ADD_MOVIE:
            return { ...state, movie: payload }
        default:
            return state
    }
}

export const actorReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case ActionTypes.ADD_ACTOR:
            return { ...state, actor: payload }
        default:
            return state
    }
}

export const producerReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case ActionTypes.ADD_PRODUCER:
            return { ...state, producer: payload }
        default:
            return state
    }
}