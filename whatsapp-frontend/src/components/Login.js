import { Button } from '@material-ui/core'
import React from 'react'
import { actionTypes } from '../context-api/reducer'
import { useStateValue } from '../context-api/StateProvider'
import "../css/Login.css"
import {auth , provider} from "../firebase"
import Api from "../Api"

function Login() {

    const [state,dispatch] = useStateValue()

    const signIn = (e) => {
        e.preventDefault()
        auth.signInWithPopup(provider).then(async (res) => {
            const dbuser={
                name:res.user.displayName,
                profile_image:res.user.photoURL,
                email:res.user.email
            }
            await Api.post("/login",dbuser).then((res) => {
                console.log(res.data);
                dispatch({
                    type:actionTypes.SET_JOINED_GROUPS,
                    joined_groups:res.data.msg.joined_groups
                })
            })
            
            dispatch({
                type:actionTypes.SET_USER,
                user:res.user
            })
        }).catch((err) => alert(err.message))
    }

    return (
        <div className="login">
            <div className="login_logo">
                <img 
                src="data:image/png;base64,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"
                alt=""
                />
            </div>
            <Button type="submit" onClick={signIn}>
                Sign In
            </Button>
        </div>
    )
}

export default Login
