import * as React from 'react';
import { withRouter, RouteComponentProps } from "react-router";

import { RouterParams } from "../routes";
import { observer } from 'mobx-react';

interface NavButtonProps {
    name: string;
    link: string;
    isHeading?: boolean;
    isStarred?: boolean;
    showStarred?: boolean;
}

type InjectedProps = NavButtonProps & RouteComponentProps<RouterParams>;

@withRouter
@observer
export class NavButton extends React.Component<NavButtonProps> {
    private get injectedProps() {
        return this.props as InjectedProps;
    }

    onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        this.injectedProps.history.replace(this.props.link);
    }

    render() {
        const { isHeading, isStarred, showStarred, name } = this.props;
        return (
            <button
                className={ "pt-button pt-minimal"
                    + (isHeading ? " pt-navbar-heading" : "")
                    + (isStarred ? (showStarred ? " pt-icon-star" : " pt-icon-star-empty") : "")
                }
                onClick={ this.onClick }>
                { name }
            </button>
        )
    }
}
