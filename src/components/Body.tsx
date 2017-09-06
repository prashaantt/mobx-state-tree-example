import * as React from 'react';
import { observer, inject } from 'mobx-react';

import { RouteComponentProps } from "react-router";
import { RouterParams } from "../routes";
import { subredditStore } from '../SubredditStore';
import { Spinner } from '@blueprintjs/core';

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
            <ul>
                {
                    data.map(child => <li key={child.data.id}>{child.data.title}</li>)
                }
            </ul>
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
