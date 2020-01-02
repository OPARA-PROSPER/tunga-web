import React, { Component } from 'react';
import { kebabCase } from 'lodash';

class SideNav extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        const {pages, currentPage, theme, goToPage} = this.props;

        return (
            <div className={`side-bar side-bar--${theme || 'dark'}`}>
                <ul>
                    {pages.map(page => {
                        const isActive = currentPage && currentPage.id == page.id;
                        return (
                            <li className="side-bar-item" key={page.id} onClick={(e) => goToPage(`#${page.id}`, e)}>
                                <div className={`side-bar-tab side-bar-tab-${isActive ? "active" : "hidden"}`}>
                                </div>
                                <a style={{ width: `${page.title.length * 8}px` }} 
                                    id={`${page.id}-nav`}
                                    className={`side-bar-label font-weight-bold side-bar-label-${isActive ? "active": "hidden"}`}
                                    href={`#${page.id}`}
                                    data-value={page.id}
                                    onClick={(e) => goToPage(`#${page.id}`, e)}
                                >
                                    {page.title}
                                </a>
                            </li>
                        );
                    })}
                </ul>
            </div>
        );
    }
}

export default SideNav;
