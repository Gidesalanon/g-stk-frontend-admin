import { reducer as toastrReducer } from 'react-redux-toastr';
// import external modules
import { combineReducers } from 'redux';

import customizer from './customizer/';
import defaultReducer from './default';
import utilisateurReducer from './utilisateur';
import userReducer from './user';
import categorie_produitReducer from './categorie_produit';
import mediaReducer from './media';
import alertReducer from './alert';
import applicationReducer from './application';

const rootReducer = combineReducers({
    toastr: toastrReducer, // <- Mounted at toastr.
    customizer: customizer,
    application: applicationReducer,
    alert: alertReducer,
    media: mediaReducer,
    categorie_produit: categorie_produitReducer,
    default: defaultReducer,
    user: userReducer,
    utilisateur: utilisateurReducer,
});

export default rootReducer;