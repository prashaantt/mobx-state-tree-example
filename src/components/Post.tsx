import * as React from 'react';
import { observer, inject } from 'mobx-react';
import { Button } from '@blueprintjs/core';
import { Story } from '../stores/SubredditStore';
import { FavouritesStore } from '../stores/FavouritesStore';

type PostProps = typeof Story.Type;

interface InjectedProps extends PostProps {
    favouritesStore: typeof FavouritesStore.Type;
}

@inject("favouritesStore")
@observer
export class Post extends React.Component<PostProps> {
    private get injectedProps() {
        return this.props as InjectedProps;
    }

    render() {
        let starred = false;
        const { favouritesStore } = this.injectedProps;
        const { subreddit, id, title, url } = this.props;
        const subStars = favouritesStore.starredInSub.get(subreddit)
        if (subStars) {
            starred = subStars.starredPostIds.find(post => post === id) !== undefined;
        }
        return (
            <div className="pt-card pt-elevation-0" key={ id }>
                <Button
                    className="pt-minimal"
                    iconName={ starred ? "star" : "star-empty" }
                    onClick={ () => favouritesStore.toggleStar(subreddit, id) }
                />
                <a href={ url } target="new">{ title }</a>
            </div>
        )
    }
}
