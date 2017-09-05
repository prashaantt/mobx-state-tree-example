import * as React from 'react';
import Loadable from 'react-loadable';
import { Spinner } from '@blueprintjs/core';
import { Route } from "react-router";

import { Nav } from "./Nav";

export default class App extends React.Component {
    render() {
        return (
            <div>
                <Nav />
                <Route
                    path="/"
                    exact
                    component={
                        Loadable({
                            loader: () => import(/* webpackChunkName: "home" */ './Home'),
                            loading: () => <Spinner />
                        }) } />
                <Route
                    path="/favourites"
                    component={
                        Loadable({
                            loader: () => import(/* webpackChunkName: "favourites" */ './Favourites'),
                            loading: () => <Spinner />
                        }) } />
                <Route
                    path="/r/:subreddit"
                    component={
                        Loadable({
                            loader: () => import(/* webpackChunkName: "body" */ './Body'),
                            loading: () => <Spinner />
                        }) } />
            </div>
        )
    }
}
