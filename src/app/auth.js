// import external modules
import React, { Component, Suspense, lazy } from "react";
import { BrowserRouter, Switch, Redirect } from "react-router-dom";
import Spinner from "../components/spinner/spinner";

// import internal(own) modules
import FullPageLayout from "../layouts/routes/fullpageRoutes";


/** Page Login*/

const LazyLoginPage = lazy( () =>import("../pages/LoginPage"));
const LazyRecoveryPage = lazy(() => import("../pages/RecoveryPage"));
const LazyNewPasswordPage = lazy(() => import("../pages/NewPasswordPage"));

class AuthRouter extends Component {
    render() {
        return (
            // Set the directory path if you are deplying in sub-folder
            <BrowserRouter basename="/">
                <Redirect to='/login'/>
                <Switch>

                    <FullPageLayout
                        exact
                        path="/login"
                        render={matchprops => (
                            <Suspense fallback={<Spinner />}>
                                <LazyLoginPage {...matchprops} />
                            </Suspense>
                        )}
                    />

                    <FullPageLayout
                        exact
                        path="/recovery-password"
                        render={matchprops => (
                            <Suspense fallback={<Spinner />}>
                                <LazyRecoveryPage {...matchprops} />
                            </Suspense>
                        )}
                    />

                    <FullPageLayout
                        exact
                        path="/new-password"
                        render={matchprops => (
                            <Suspense fallback={<Spinner />}>
                                <LazyNewPasswordPage {...matchprops} />
                            </Suspense>
                        )}
                    />
                </Switch>
            </BrowserRouter>
        );
    }
}

export default AuthRouter;
