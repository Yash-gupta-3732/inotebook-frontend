import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useContext } from 'react';
import darkmodeContext from '../Context/darkmode/darkmodeContext';
import '../App.css'
const Signup = (props) => {
    let navigate = useNavigate();
    const Contextdarkmode = useContext(darkmodeContext);
    const { mode } = Contextdarkmode;
    const { showAlert } = props;
    const [credentials, setCredentials] = useState({ name: "", email: "", password: "" });
    const host = 'https://inotebook-backend-eta.vercel.app';
    const handleSubmit = async (e) => {
        e.preventDefault();
        // API CALLS
        const response = await fetch(`${host}/api/auth/createuser`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ name: credentials.name, email: credentials.email, password: credentials.password, }),

        });

        const json = await response.json();

        if (json.success) {
            //save the auth-token and redirect
            localStorage.setItem('token', json.authtoken);
            showAlert("Account Created Successfully", "success")

            // reset input fields BEFORE navigating
            setCredentials({ name: "", email: "", password: "" });
            navigate("/") //to redirect to home page
        }

    }
    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };
    return (

        <div className={`rounded ice-effect py-3 px-4 mt-5 pt-2 ${mode === 'light' ? 'signup-light-mode' : 'signup-dark-mode'} `} style={{ position: 'relative', top: '30px' }} >
            <h2 className='my-3'>Create an account to use iNotebook</h2>
            <form onSubmit={handleSubmit} className={`${mode === 'light' ? 'signup-light-mode' : 'signup-dark-mode'}`}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" className="form-control" name="name" id="name" onChange={onChange} value={credentials.name} autoComplete="off" />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" name="email" id="email" aria-describedby="emailHelp" onChange={onChange} value={credentials.email} autoComplete="off" />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" name="password" id="password" required minLength={6} onChange={onChange} value={credentials.password} autoComplete="new-password" />
                </div>
                <div className="mb-3">
                    <label htmlFor="cpassword" className="form-label">Confirm Password</label>
                    <input type="password" className="form-control" name="cpassword" id="cpassword" required minLength={6} onChange={onChange} />
                </div>

                <button type="submit" className="btn btn-primary" >Submit</button>
            </form>

        </div>

    )
}

export default Signup
