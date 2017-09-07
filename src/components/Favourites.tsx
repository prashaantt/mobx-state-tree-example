import * as React from 'react';
import { observer, inject } from 'mobx-react';
import { FavouritesStore } from '../stores/FavouritesStore';
import { subredditStore, Story } from '../stores/SubredditStore';
import { Post } from './Post';

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

    onToggle = (subreddit: string, postId: string) => {
        this.injectedProps.favouritesStore.toggleStar(subreddit, postId);
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
                <div>
                    {
                        starredPosts.length > 0 ?
                            starredPosts.map(post =>
                                <Post
                                    key={ post.id }
                                    {...post}
                                    starred
                                    onToggle={ this.onToggle }
                                    showSubreddit
                                />)
                            : <p>Nothing here yet, favourite some posts first!</p>
                    }
                </div>
            </div>
        )
    }
}
