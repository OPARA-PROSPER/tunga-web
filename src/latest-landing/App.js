import React from "react";
import {Redirect, Route, Switch} from "react-router-dom";
import {childRoutes} from "./configs/Routes.conf";
import ShowcaseLayout from "../components/showcase/ShowcaseLayout";
import BootLogo from "../components/core/BootLogo";

const App = props => {
    const rootProps = props;
    return (
        <React.Suspense fallback={<BootLogo/>}>
            <Switch>
                {childRoutes.map((route, i) => {
                    return (
                        <Route
                            exact={route.exact}
                            key={i}
                            render={props => (
                                <route.component
                                    name={route.name}
                                    childRoutes={route.childRoutes}
                                    {...rootProps}
                                    {...props}
                                />
                            )}
                            path={route.path}
                        />
                    );
                })}
                <Redirect from="/signin" to='/login'/>
                <Redirect exact from="/signup" to='/login'/>
                <Route path="*" render={props => <ShowcaseLayout {...rootProps} {...props}/>} />
            </Switch>
        </React.Suspense>
    );
};

export default App;
