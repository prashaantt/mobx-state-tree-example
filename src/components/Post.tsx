import * as React from 'react';
import { observer } from 'mobx-react';
import { Button } from '@blueprintjs/core';
import { Link } from 'react-router-dom';

interface PostProps {
    starred: boolean;
    subreddit: string;
    id: string;
    onToggle: (subreddit: string, postId: string) => void;
    url: string;
    title: string;
    num_comments: number;
    author: string;
    domain: string;
    permalink: string;
    showSubreddit?: boolean;
}

export const Post = observer((props: PostProps) => {
    function getLink() {
        if (props.showSubreddit) {
            const sub = `/r/${props.subreddit}`;
            return <Link to={ sub }>{ sub }</Link>
        }
        return null;
    }

    return (
        <div className="pt-card pt-elevation-0 post" key={ props.id }>
            <Button
                className="pt-minimal"
                iconName={ props.starred ? "star" : "star-empty" }
                onClick={ () => props.onToggle(props.subreddit, props.id) }
            />
            <div>
                <a href={ props.url } target="_blank">{ props.title }</a>
                <p>
                    <small className="pt-text-muted">
                        <a target="_blank" href={ `https://reddit.com/${props.permalink}` }>
                            { `${props.num_comments} comments` }
                        </a> | { props.author } | { props.domain }{ props.showSubreddit ? <span>| { getLink() }</span> : "" }
                    </small>
                </p>
            </div>
        </div>
    )
});
