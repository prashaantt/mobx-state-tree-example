import * as React from 'react';
import { observer, inject } from 'mobx-react';

import { NavButton } from "./NavButton";
import { FavouritesStore } from '../stores/FavouritesStore';
import { StateNavigator } from './StateNavigator';

interface InjectedProps {
    favouritesStore: typeof FavouritesStore.Type;
}

export const Nav = inject("favouritesStore")(observer((props: {}) => {
    const injectedProps = props as InjectedProps;

    return (
        <nav className="pt-navbar pt-fixed-top">
            <div className="pt-navbar-group pt-align-left">
                <NavButton name="React Reddit" link="/" isHeading />
                <span className="pt-navbar-divider"></span>
                <NavButton name="Programming" link="/r/programming" />
                <NavButton name="JavaScript" link="/r/javascript" />
                <NavButton name="React" link="/r/reactjs" />
                <NavButton name="TypeScript" link="/r/typescript" />
                <span className="pt-navbar-divider"></span>
                <NavButton name="Favourites" link="/favourites" isStarred showStarred={ injectedProps.favouritesStore.anyStarred } />
            </div>
            <div className="pt-navbar-group pt-align-right">
                <StateNavigator direction="left" />
                <StateNavigator direction="right" />
            </div>
        </nav>
    )
}));
