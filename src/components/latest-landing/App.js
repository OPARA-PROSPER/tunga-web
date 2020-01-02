import React, { Component, Suspense } from "react";
import {Redirect, Route, Switch} from "react-router-dom";
import Routes from "./configs/Routes.conf";
import ShowcaseLayout from "../showcase/ShowcaseLayout";

class App extends Component {
    render() {
        const rootProps = this.props;
        return (
            <Switch>
                {Routes.map((route, i) => {
                    return (
                        <Route
                            exact={route.exact}
                            key={i}
                            render={props => (
                                <div className="Home">
                                    <div>
                                        <route.component
                                            name={route.name}
                                            childRoutes={route.childRoutes}
                                            {...rootProps}
                                            {...props}
                                            isMobile={!rootProps.isLargeDevice}
                                        />
                                    </div>
                                </div>
                            )}
                            path={route.path}
                        />
                    );
                })}
                <Redirect from="/signin" to='/login'/>
                <Redirect exact from="/signup" to='/login'/>
                {/*<Redirect from="/reset-password*" to="/password*"/>*/}
                <Route path="*" render={props => <ShowcaseLayout {...rootProps} {...props}/>} />
            </Switch>
        );
    }
}

export default App;
