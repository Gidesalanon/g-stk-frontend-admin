import React from 'react';
import {useCookies} from "react-cookie";
import AuthRouter from "./auth";
import {postEntity} from "../service/api";


function Logout () {

    const [cookies, , removeCookie] = useCookies(null);
    postEntity("auth/logout", [{token_type: cookies.tokenType}, {access_token: cookies.token} ]).then((result) => {
        return
    }).catch(errors => {
        console.log(errors)
    })

    removeCookie("token")
    removeCookie("tokenType")
    removeCookie("tokenExpire")

    return  <AuthRouter/>
}

export default Logout;
