import * as React from 'react';
import { Button } from '@blueprintjs/core';
import { observer } from 'mobx-react';

import { favouritesTimeTraveler } from '../stores/FavouritesStore';

interface StateNavigatorProps {
    direction: "left" | "right";
}

@observer
export class StateNavigator extends React.Component<StateNavigatorProps> {
    onClick = () => {
        if (this.props.direction === "left") {
            favouritesTimeTraveler.previousState();
        } else if (this.props.direction === "right") {
            favouritesTimeTraveler.nextState();
        }
    }

    getDisabled = () => {
        if (this.props.direction === "left") {
            return !favouritesTimeTraveler.hasPrevious();
        } else {
            return !favouritesTimeTraveler.hasNext();
        }
    }

    render() {
        return (
            <Button
                className="pt-minimal"
                iconName={this.props.direction === "left" ? "pt-icon-circle-arrow-left" : "pt-icon-circle-arrow-right"}
                onClick={this.onClick}
                disabled={this.getDisabled()}
            />
        )
    }
}
