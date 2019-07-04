import constants from '../constants';
import { select, takeEvery, call, put } from "redux-saga/effects";

import api from '../api';

export default function* rootSaga() {
    yield takeEvery(constants.GET_MOVIES_REQUEST, moviesWorker);
    yield takeEvery(constants.GET_MOVIE_REQUEST, displayMovieWorker);
}

// Selectors
const getMoviesPage = state => state.movies.page;
const getSelectedMovie = state => state.movie.id;

function getGenreNames(movies, genres) {
    return movies.map(movie => ({
        ...movie,
        genres: genres.filter(genre => movie.genre_ids.includes(genre.id))
    }))
}

function* moviesWorker() {
    try {
        const page = yield select(getMoviesPage);
        const movies = yield call(api.fetchMovies, page);
        const genres = yield call(api.fetchGenres);

        const moviesWithGenres = yield call(getGenreNames, movies, genres);

        yield put({ type: constants.GET_MOVIES_SUCCESS, payload: moviesWithGenres });
    }
    catch (error) {
        yield put({ type: constants.GET_MOVIES_FAILURE, error });
    }
}

function* displayMovieWorker() {
    const movieId = yield select(getSelectedMovie);

    const movieDetails = yield call(api.fetchMovie, movieId);
    const credits = yield call(api.fetchMovieCredits, movieId);

    const creditsSliced = {
        cast: credits.cast.slice(0, 5),
        crew: credits.crew.filter(person => person.department === 'Directing'),
    }
    yield put({ type: constants.GET_MOVIE_SUCCESS, payload: {...movieDetails, ...creditsSliced} });
}

