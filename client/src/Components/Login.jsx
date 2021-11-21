import React,{useState, useContext} from 'react'
import loginpic from '../Images/logo.png';
import { NavLink, useHistory } from 'react-router-dom'

import { UserContext } from '../App';

const Login = () => {

    const {state, dispatch} = useContext(UserContext);

    const history = useHistory()
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const loginUser = async (e) =>{
        e.preventDefault();

        const res = await fetch("/signin", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({      
                email: email, 
                password: password,
            })
        });

        const data = await res.json();

        if(res.status === 400 || !data){
            window.alert("Invalid Credentials");
        } else {
        dispatch({type:"USER", payload: true})
        window.alert("Login Successful");
        history.push("/");
        }  
    }

    return (
        <>
    <div className="login-form">
    <form method="POST" className="signin-form" id="signin-form">
        <h2 className="text-center">Log in</h2> <br/>  
        <div className="form-group">
        	<div className="input-group">
                <div className="input-group-prepend">
                    <span className="input-group-text">
                        <span className="fas fa-user fa-2x"></span>
                    </span>                    
                </div>
                <input autoComplete="none" type="text" className="form-control" name="email" placeholder="Enter Your Email" required="required" value={email} onChange={(e)=>{setEmail(e.target.value)}}/>				
            </div>
        </div><br/>
		<div className="form-group">
            <div className="input-group">
                <div className="input-group-prepend">
                    <span className="input-group-text">
                        <i className="fas fa-lock fa-2x"></i>
                    </span>                    
                </div>
                <input autoComplete="none" type="password" className="form-control" name="password" placeholder="Enter Your Password" required="required" value={password} onChange={(e)=>{setPassword(e.target.value)}}/>				
            </div>
        </div><br/>
        <div className="form-group form-button">
            <input type="submit" name="signin" id="signin" className="form-submit btn btn-primary login-btn btn-block" value="Log In" onClick={loginUser}/>
            <p className="text-muted small">Don't have an account? <NavLink to="/register">Sign up here!</NavLink></p>
        </div>
    </form>
</div>
        </>
    )
}

export default Login
