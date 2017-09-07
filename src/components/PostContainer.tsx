import * as React from 'react';
import { observer, inject } from 'mobx-react';
import { Button } from '@blueprintjs/core';
import { Story } from '../stores/SubredditStore';
import { FavouritesStore } from '../stores/FavouritesStore';
import { Post } from './Post';

type PostProps = typeof Story.Type;

interface InjectedProps extends PostProps {
    favouritesStore: typeof FavouritesStore.Type;
}

@inject("favouritesStore")
@observer
export class PostContainer extends React.Component<PostProps> {
    private get injectedProps() {
        return this.props as InjectedProps;
    }

    render() {
        let starred = false;
        const { favouritesStore } = this.injectedProps;
        const { subreddit, id, title, url, author, domain, num_comments, permalink } = this.props;
        const subStars = favouritesStore.starredInSub.get(subreddit)
        if (subStars) {
            starred = subStars.starredPostIds.find(post => post === id) !== undefined;
        }
        return (
            <Post {...this.props} starred={ starred } onToggle={ favouritesStore.toggleStar } />
        )
    }
}
