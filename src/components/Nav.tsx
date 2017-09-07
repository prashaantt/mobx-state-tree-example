import * as React from 'react';
import { observer, inject } from 'mobx-react';

import { NavButton } from "./NavButton";
import { FavouritesStore } from '../stores/FavouritesStore';

interface InjectedProps {
    favouritesStore: typeof FavouritesStore.Type;
}

export const Nav = inject("favouritesStore")(observer((props: {}) => {
    const injectedProps = props as InjectedProps;
    const anyFavs = injectedProps.favouritesStore.starredInSub.
        entries().some(entry => entry[1].starredPostIds.length > 0);

    return (
        <nav className="pt-navbar pt-fixed-top">
            <div className="pt-navbar-group pt-align-left">
                <NavButton name="React Reddit" link="/" isHeading />
                <NavButton name="Programming" link="/r/programming" />
                <NavButton name="JavaScript" link="/r/javascript" />
                <NavButton name="React" link="/r/reactjs" />
                <NavButton name="TypeScript" link="/r/typescript" />
            </div>
            <div className="pt-navbar-group pt-align-right">
                <NavButton name="Favourites" link="/favourites" isStarred showStarred={ anyFavs } />
            </div>
        </nav>
    )
}));
