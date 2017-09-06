import * as React from 'react';
import { AnchorButton } from '@blueprintjs/core';
import { Story } from '../stores/SubredditStore';

type PostProps = typeof Story.Type;

export class Post extends React.Component<PostProps> {
    render() {
        return (
            <div className="pt-card pt-elevation-0" key={ this.props.id }>
                <AnchorButton iconName="star-empty" />
                <a href={ this.props.url }>{ this.props.title }</a>
            </div>
        )
    }
}
