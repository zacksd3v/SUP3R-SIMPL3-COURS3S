import { useState } from 'react'

export function LoginForm() {
    const [showPswd, setShowPswd] = useState(true);

    function toggle() {
        setShowPswd(!showPswd)
    }
    
    return (
        <>
            <div>
                <input
                    className="login-input" 
                    placeholder="Email" 
                    type="email" 
                />
            </div>
            <div>
                <input 
                    className="login-input"
                    placeholder="Password" 
                    type={showPswd ? 'password' : 'text'}  

                />
                <button 
                    className="show-psswd"
                    onClick={toggle}
                >{showPswd ? 'Show' : 'Hide'}</button>
            </div>
            <div>
                <button className="login-button">Login</button>
                <button className="login-button">Sign up</button>    
            </div>
        </>
    );
}
