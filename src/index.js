// import external modules
import React, { Suspense, lazy } from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";

// import internal(own) modules
import registerServiceWorker from "./registerServiceWorker";
import { store } from "./redux/storeConfig/store";
import ReduxToastr from 'react-redux-toastr'

import "font-awesome/css/font-awesome.min.css";

import "./index.scss";
import Spinner from "./components/spinner/spinner";
import {Cookies} from "react-cookie";
import AuthRouter from "./app/auth";

const LazyApp = lazy(() => import("./app/App"));

const AppWrapper =()=>{
    const cookies = new Cookies();
    if(cookies.get('token')) {
        if ((parseInt(cookies.get('tokenExpire'))*1000) <= Math.floor(Date.now()/1000)) {
           return <AuthRouter/>
        }else{
            return <MainApp/>
        }
    }

    if(!cookies.token) {
       return <AuthRouter/>
    }
    return <AuthRouter/>
}

const MainApp = () =>(
    <Provider store={store}>
        <Suspense fallback={<Spinner />}>
            <LazyApp />
            <ReduxToastr
                timeOut={4000}
                newestOnTop={false}
                preventDuplicates
                position="top-left"
                transitionIn="fadeIn"
                transitionOut="fadeOut"
                progressBar
                closeOnToastrClick/>
        </Suspense>
    </Provider>
)

ReactDOM.render(
  <AppWrapper/>
   ,
   document.getElementById("root")
);
registerServiceWorker();
