import * as React from 'react';

import { RouteComponentProps } from "react-router";
import { RouterParams } from "../routes";

export default class Body extends React.Component {
    private get injectedProps() {
        return this.props as RouteComponentProps<RouterParams>;
    }

    render() {
        return (
            <div className="pt-running-text">
                <h1>{ this.injectedProps.match.url }</h1>
            </div>
        )
    }
}
