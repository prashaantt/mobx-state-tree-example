import * as React from 'react';
import { observer, inject } from 'mobx-react';
import { FavouritesStore } from '../stores/FavouritesStore';
import { subredditStore, Story } from '../stores/SubredditStore';

interface InjectedProps {
    favouritesStore: typeof FavouritesStore.Type;
    subredditStore: typeof subredditStore;
}

@inject("favouritesStore", "subredditStore")
@observer
export default class Favourites extends React.Component {
    private get injectedProps() {
        return this.props as InjectedProps;
    }

    render() {
        const { starredInSub } = this.injectedProps.favouritesStore;
        const { subs } = this.injectedProps.subredditStore;
        const starredSubs = Array.from(starredInSub.keys())
        type StoryType = typeof Story.Type;
        const starredPosts = [] as StoryType[];
        starredSubs.map(sub => {
            const posts = subs.get(sub)!.map(subreddit => subreddit.data).filter(post => starredInSub.get(sub)!.starredPostIds.includes(post.id))
            starredPosts.push(...posts);
        });
        return (
            <div className="pt-running-text">
                <h1>All your favourites</h1>
                <ul>
                    { starredPosts.map(post => <li key={ post.id }>{ post.title }</li>) }
                </ul>
            </div>
        )
    }
}
