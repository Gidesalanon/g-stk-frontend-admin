// import external modules
import React, {
  Component,
  lazy,
  Suspense,
} from 'react';

import {
  BrowserRouter,
  Switch,
  Route
} from 'react-router-dom';

import Spinner from '../components/spinner/spinner';
import FullPageLayout from '../layouts/routes/fullpageRoutes';
// import internal(own) modules
import MainLayoutRoutes from '../layouts/routes/mainRoutes';
import { Cookies } from "react-cookie";

var md5 = require('md5');
const cookies = new Cookies();

const ROOT = md5('root');
const ADMIN = md5('admin');
const DATA_MANAGER = md5('data_manager');
var userRole = '';

if(cookies.get('userRole')) 
{ 
  userRole = cookies.get('userRole');
}

// Page components
const NotFound = lazy(() => import("../components/empty"));
const LazyDashboard = lazy(() => import("../pages/DashboardPage"));
const LazyLoginPage = lazy(() => import("../pages/LoginPage"));
const LazyRecoveryPage = lazy(() => import("../pages/RecoveryPage"));
const LazyNewPasswordPage = lazy(() => import("../pages/NewPasswordPage"));

const LazyLogout = lazy( () =>import("./Logout"));
const LazyProfil = lazy( () =>import("../pages/utilisateurs/Profil"));
const LazySetting = lazy( () =>import("../pages/utilisateurs/Setting"));
const LazyUtilisateur = lazy( () =>import("../pages/User"));
const LazyCategorieProduit = lazy( () =>import("../pages/CategorieProduitPage"));
const LazyApplication = lazy( () =>import("../pages/ApplicationPage"));
const LazyMedia = lazy( () =>import("../pages/MediaPage"));
const LazyMediatheque = lazy( () =>import("../pages/Mediatheque"));
const LazyIconography = lazy( () =>import("../pages/support/Iconography"));
const LazyGuide = lazy( () =>import("../pages/support/Guide"));

class Router extends Component {
   render() {
      return (
         <BrowserRouter basename="/">
            <Switch>

{/* MANAGER */}

               <MainLayoutRoutes
                  exact
                  path="/medias"
                  render={matchprops => (
                     <Suspense fallback={<Spinner />}>
                        <LazyMedia {...matchprops} />
                     </Suspense>
                  )}
               />
               
               <MainLayoutRoutes
                  exact
                  path="/albums"
                  render={matchprops => (
                     <Suspense fallback={<Spinner />}>
                        <LazyMediatheque {...matchprops} />
                     </Suspense>
                  )}
               />

               <MainLayoutRoutes
                  exact
                  path="categories/products"
                  render={matchprops => (
                     <Suspense fallback={<Spinner />}>
                        <LazyCategorieProduit {...matchprops} />
                     </Suspense>
                  )}
               />

{/* ADMIN */}
   
               <MainLayoutRoutes
                  exact
                  path="/settings"
                  render={matchprops => (
                     <Suspense fallback={<Spinner />}>
                        {(userRole===ADMIN||userRole===ROOT) && <LazySetting {...matchprops} />}
                        {!(userRole===ADMIN||userRole===ROOT) && <NotFound title="Désolé vous n'avez pas le droit d'accès à ce contenu" />}
                     </Suspense>
                  )}
               />
   
{/* ROOT */}

               <MainLayoutRoutes
                  exact
                  path="/applications"
                  render={matchprops => (
                     <Suspense fallback={<Spinner />}>
                        {(userRole===ROOT) && <LazyApplication {...matchprops} />}
                        {(userRole!==ROOT) && <NotFound title="Désolé vous n'avez pas le droit d'accès à ce contenu" />}
                     </Suspense>
                  )}
               />

               <MainLayoutRoutes
                  exact
                  path="/users"
                  render={matchprops => (
                     <Suspense fallback={<Spinner />}>
                        {userRole===ROOT && <LazyUtilisateur {...matchprops} />}
                        {userRole!==ROOT && <NotFound title="Désolé vous n'avez pas le droit d'accès à ce contenu" />}
                     </Suspense>
                  )}
               />

{/* Support */}
               
               <MainLayoutRoutes
                  exact
                  path="/profil"
                  render={matchprops => (
                        <Suspense fallback={<Spinner />}>
                           <LazyProfil {...matchprops} />
                        </Suspense>
                  )}
               />

               <MainLayoutRoutes
                  exact
                  path="/iconographie"
                  render={matchprops => (
                        <Suspense fallback={<Spinner />}>
                           <LazyIconography {...matchprops} />
                        </Suspense>
                  )}
               />

               <MainLayoutRoutes
                  exact
                  path="/guide"
                  render={matchprops => (
                        <Suspense fallback={<Spinner />}>
                           <LazyGuide {...matchprops} />
                        </Suspense>
                  )}
               />

               <MainLayoutRoutes
                  exact
                  path="/"
                  render={matchprops => (
                     <Suspense fallback={<Spinner />}>
                        <LazyDashboard {...matchprops} />
                     </Suspense>
                  )}
               />

               <FullPageLayout
                  exact
                  path="/logout"
                  render={matchprops => (
                        <Suspense fallback={<Spinner />}>
                           <LazyLogout {...matchprops} />
                        </Suspense>
                  )}
               />

               <FullPageLayout
                  exact
                  path="/pages/login"
                  render={matchprops => (
                     <Suspense fallback={<Spinner />}>
                        <LazyLoginPage {...matchprops} />
                     </Suspense>
                  )}
               />
               <FullPageLayout
                  exact
                  path="/pages/recovery-password"
                  render={matchprops => (
                     <Suspense fallback={<Spinner />}>
                        <LazyRecoveryPage {...matchprops} />
                     </Suspense>
                  )}
               />
               <FullPageLayout
                  exact
                  path="/pages/new-password"
                  render={matchprops => (
                     <Suspense fallback={<Spinner />}>
                        <LazyNewPasswordPage {...matchprops} />
                     </Suspense>
                  )}
               />
               
               <Route component={NotFound} />
            </Switch>
         </BrowserRouter>
      );

    }
}

export default Router;
