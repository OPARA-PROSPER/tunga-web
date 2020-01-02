import React, { Component } from "react";
import { withRouter } from 'react-router-dom';
import _, { kebabCase } from 'lodash';
import SideNav from "../../../sidenav";
import JumpToTop from "./JumpToTop/JumpToTop";

const getPageId = ({id, hash, title}) => {
    return id || kebabCase(title || hash);
};

export const Page = ({children, ...otherProps}) => {
    return (
        <div id={getPageId(otherProps)}>
            {children}
        </div>
    );
};

class PageScroll extends Component {

    constructor(props) {
        super(props);

        this.scrollerRef = React.createRef();

        const {children, pages, location: {hash}} = props;

        let cleanedPages = [], 
            cleanedChildren = [];

        if(pages && Array.isArray(pages)) {
            React.Children.toArray(children).forEach((child, idx) => {
                if(pages[idx]) {
                    const props = pages[idx], 
                        id = getPageId(props);
                    if(id && props.title) {

                        const cleanedProps = {id, ...props};
                        cleanedPages.push(cleanedProps);
                        cleanedChildren.push(
                            <Page key={`key-${id}`} {...cleanedProps}>
                                {child}
                            </Page>
                        )
                    }
                }
            });
        }

        const currentPage = _.filter(cleanedPages || [], page => `#${page.id}` == hash)[0] || (cleanedPages || [])[0] || null;
        
        this.state = {pages: cleanedPages, currentPage, children: cleanedChildren};

        this.currentIdx = 0;
        const topPage = cleanedPages && cleanedPages[0];
        this.topSelector = topPage && topPage.id?`#${topPage.id}`:null;
        
        this.wheelTimeout = null;
    }

    componentDidMount() {
        window.addEventListener('keydown', this.onKeyDown);
        const {currentPage} = this.state;
        if(currentPage) {
            this.goToPage(`#${currentPage.id}`);
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if(!_.isEqual(this.props.location, prevProps.location)) {
            const {location: {hash}} = this.props;
            if(hash || this.topSelector) {
                this.goToPage(hash || this.topSelector);
            }
        }
    }

    componentWillUnmount() {
        window.removeEventListener('keydown', this.onKeydown);
    }

    goToPage = (selector, e) => {
        if(e) {
            e.preventDefault();
        }

        const {pages} = this.state, 
            {history} = this.props;
        const page = document.querySelector(selector);
        const pageIdx = _.findIndex(pages, page => `#${page.id}` === selector);

        if(page && pageIdx > -1 && pages[pageIdx]) {
            //page.scrollIntoView({behavior: 'smooth'}); // results inconsistent when called inside other event handlers
            this.scrollerRef.current.scrollTo({ top: page.offsetTop, behavior: 'smooth' }); // always works

            this.setState({currentPage: pages[pageIdx]});
            this.currentIdx = pageIdx;
        }
    };

    nextPage = (direction) => {
        const {pages, currentPage} = this.state;
        if(direction && currentPage && pages) {
            let currentIdx = _.findIndex(pages, page => page.id === currentPage.id), 
                nextIdx = currentIdx + direction;

            if(currentIdx > -1 && nextIdx >= 0 && nextIdx < pages.length && pages[nextIdx]) {
                this.goToPage(`#${pages[nextIdx].id}`);
            }
        }
    };

    onKeyDown = (e) => {
        let direction = 0; 
        if (parseInt(event.keyCode) === 38) {
            direction = -1; //up
        } else if (parseInt(event.keyCode) === 40) {
            direction = 1; //down
        }
        this.nextPage(direction);
    };

    onWheel = (e) => {
        if(this.wheelTimeout) {
            // Clear timeout throughout the wheeling
            clearTimeout(this.wheelTimeout);
        } else {
            // Wheel move start signalled by timeout being null
            const delta = parseInt(e.deltaY || (e.wheelDelta * -1)); // +n => down, -n => up
            if(delta) {
                this.nextPage(delta > 0?1:-1);
            }
        }

        // Set a timeout to run after scrolling ends
        const self = this;
        this.wheelTimeout = setTimeout(function() {
            // Wheel move ended
            self.wheelTimeout = null;
        }, 50);
    };

    render() {
        // {children} = this.props, 
        const {pages, currentPage, children} = this.state;

        return (
            <div className="PageScroller" ref={this.scrollerRef} onWheel={(e) => {
                e.persist();
                this.onWheel(e);
            }}>
                <div id="scroller-top"/>
                {children}
                <SideNav currentPage={currentPage} theme={currentPage && currentPage.theme || 'dark'} pages={pages} goToPage={this.goToPage}/>
                {this.currentIdx && (
                    <JumpToTop goToPage={this.goToPage} topSelector={this.topSelector}/>
                )}
            </div>
        );
    }
}

export default withRouter(PageScroll);
