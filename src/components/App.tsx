import * as React from 'react';
import Loadable from 'react-loadable';
import { Route } from "react-router";
import { Provider } from 'mobx-react';

import { Nav } from "./Nav";
import { subredditStore } from '../stores/SubredditStore';
import { favouritesStore } from '../stores/FavouritesStore';

export default class App extends React.Component {
    render() {
        return (
            <Provider subredditStore={ subredditStore } favouritesStore={ favouritesStore }>
                <div>
                    <Nav />
                    <Route
                        path="/"
                        exact
                        component={
                            Loadable({
                                loader: () => import(/* webpackChunkName: "home" */ './Home'),
                                loading: () => null
                            }) } />
                    <Route
                        path="/favourites"
                        component={
                            Loadable({
                                loader: () => import(/* webpackChunkName: "favourites" */ './Favourites'),
                                loading: () => null
                            }) } />
                    <Route
                        path="/r/:subreddit"
                        component={
                            Loadable({
                                loader: () => import(/* webpackChunkName: "body" */ './Body'),
                                loading: () => null
                            }) } />
                </div>
            </Provider>
        )
    }
}
