import * as React from 'react';
import { withRouter, RouteComponentProps } from "react-router";

import { RouterParams } from "../routes";

interface NavButtonProps {
    name: string;
    link: string;
    isHeading?: boolean;
    isStarred?: boolean;
}

type InjectedProps = NavButtonProps & RouteComponentProps<RouterParams>;

@withRouter
export class NavButton extends React.Component<NavButtonProps> {
    private get injectedProps() {
        return this.props as InjectedProps;
    }

    onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        this.injectedProps.history.replace(this.props.link);
    }

    render() {
        return (
            <button
                className={ "pt-button pt-minimal"
                    + (this.props.isHeading ? " pt-navbar-heading" : "")
                    + (this.props.isStarred ? " pt-icon-star" : "")
                }
                onClick={ this.onClick }>
                { this.props.name }
            </button>
        )
    }
}
