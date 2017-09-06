import * as React from 'react';
import { observer, inject } from 'mobx-react';

import { RouteComponentProps } from "react-router";
import { RouterParams } from "../routes";
import { subredditStore } from '../stores/SubredditStore';
import { Spinner, Button } from '@blueprintjs/core';
import { Post } from './Post';

interface InjectedProps extends RouteComponentProps<RouterParams> {
    subredditStore: typeof subredditStore;
}

@inject("subredditStore")
@observer
export default class Body extends React.Component {
    private get injectedProps() {
        return this.props as InjectedProps;
    }

    componentDidMount() {
        const { subredditStore, match } = this.injectedProps;
        subredditStore.fetchSub(match.params.subreddit);
    }

    renderList() {
        const { subredditStore, match } = this.injectedProps;
        const data = subredditStore.subs.get(match.params.subreddit);
        if (!data) {
            return <Spinner />
        }

        return (
            <div>{data.map(post => <Post key={post.data.id} {...post.data} />)}</div>
        )
    }

    render() {
        const { match } = this.injectedProps;
        return (
            <div className="pt-running-text">
                <h1>{match.url}</h1>
                {this.renderList()}
            </div>
        )
    }
}
