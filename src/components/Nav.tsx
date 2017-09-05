import * as React from 'react';

import { NavButton } from "./NavButton";

export const Nav = () => {
    return (
        <nav className="pt-navbar pt-fixed-top">
            <div className="pt-navbar-group pt-align-left">
                <NavButton name="React Reddit" link="/" isHeading />
                <NavButton name="Programming" link="/r/programming" />
                <NavButton name="JavaScript" link="/r/javascript" />
                <NavButton name="TypeScript" link="/r/typescript" />
                <NavButton name="React" link="/r/react" />
            </div>
            <div className="pt-navbar-group pt-align-right">
                <NavButton name="Favourites" link="/favourites" isStarred />
            </div>
        </nav>
    )
}
