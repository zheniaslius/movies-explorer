import React from 'react';
import { Route, Switch } from 'react-router-dom';
import MoviesList from './MoviesList';
import MovieDetails from './MovieDetails';

const Content = () => {
    return (
        <Switch>
            <Route path="/movie/:id" render={({ match }) => {
                const { id } = match.params;
                return <MovieDetails id={id} />
            }} />
            <Route exact path="/" component={MoviesList} />
        </Switch>
    );
};

export default Content;