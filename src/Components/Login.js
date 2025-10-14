import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useContext } from 'react';
import darkmodeContext from '../Context/darkmode/darkmodeContext';

const Login = (props) => {
    let navigate = useNavigate();
    const { showAlert } = props;
    const Contextdarkmode = useContext(darkmodeContext);
    const { mode } = Contextdarkmode;
    const [credentials, setCredentials] = useState({ email: "", password: "" });
    const host = 'inotebook-backend-eta.vercel.app';
    // clear inputs when login page loads
    useEffect(() => {
        setCredentials({ email: "", password: "" });
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        // API CALLS
        const response = await fetch(`${host}/api/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email: credentials.email, password: credentials.password }),

        });

        const json = await response.json();
        console.log('LOGIN', json) // get auth-token in response
        if (json.success) {
            //save the auth-token and redirect
            localStorage.setItem('token', json.authtoken);
            showAlert("Loggedin Successfully", "success")

            navigate("/") //to redirect to home page
        }
        else {
            showAlert("Invalid credential", "danger");
            setCredentials({ ...credentials, password: "" });
        }


    }
    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };
    return (
        <div  className={`container rounded ice-effect py-3 px-4 mt-5 pt-2 ${ mode==='light'?'login-light-mode' : 'login-dark-mode'} `} style={{position:'relative',top:'30px'}}>
            <h2 className='my-3'>Login to continue to iNotebook</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" name="email" id="email1" aria-describedby="emailHelp" onChange={onChange} value={credentials.email} autoComplete="off" />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" name="password" id="password" onChange={onChange} value={credentials.password} autoComplete="new-password" />
                </div>

                <button type="submit" className="btn btn-primary" >Submit</button>
            </form>
        </div>
    )
}

export default Login
