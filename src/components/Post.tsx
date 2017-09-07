import * as React from 'react';
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

export const Post = (props: PostProps) => {
    const { subreddit, id, starred, onToggle, url, title, num_comments, permalink, author, domain, showSubreddit } = props;
    let link: React.ReactElement<any>;

    function getLink() {
        if (showSubreddit) {
            const sub = `/r/${subreddit}`;
            return <Link to={ sub }>{ sub }</Link>
        }
        return null;
    }
    return (
        <div className="pt-card pt-elevation-0" key={ id }>
            <Button
                className="pt-minimal"
                iconName={ starred ? "star" : "star-empty" }
                onClick={ () => onToggle(subreddit, id) }
            />
            <a href={ url } target="new">{ title }</a>
            <p>
                <small className="pt-text-muted">
                    <a
                        target="new"
                        href={ `https://reddit.com/${permalink}` }
                    >
                        { `${num_comments} comments` }
                    </a> | { author } | { domain }{ showSubreddit ? <span>| { getLink() }</span> : "" }
                </small>
            </p>
        </div>
    )
}
