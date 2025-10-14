import { Link, useLocation, useNavigate } from 'react-router-dom'
import '../App.css'
import { useContext} from 'react';
import darkmodeContext from '../Context/darkmode/darkmodeContext';
import searchContext from '../Context/search/searchContext';

const Navbar = () => {
  const navigate = useNavigate();
  let location = useLocation();
  const searchCtx = useContext(searchContext);
  const Context = useContext(darkmodeContext);
  const { searchText, setSearchText } = searchCtx;
  const { mode, toggleMode } = Context;
  const handleLogout = () => {
    localStorage.removeItem("token");
    console.log("logout");
    navigate("/login");
  }

  return (
    <>
      <nav className={`navbar navbar-expand-lg navbar-${mode} ${mode === 'light' ? 'navlight-mode' : 'navdark-mode'} fixed-top`}>
        {console.log(mode)}
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">iNotebook</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className={`nav-link ${location.pathname === '/' ? 'active' : ""}`} aria-current="page" to="/">Home</Link>
              </li>
              <li className="nav-item">
                <Link className={`nav-link ${location.pathname === '/About' ? 'active' : ""}`} aria-current="page" to="/About">About</Link>
              </li>
            </ul>
            <form class="d-flex" role="search">
              <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search" value={searchText} onChange={(e) => setSearchText(e.target.value)} />
            </form>

            <div className={`form-check form-switch text-${mode === 'light' ? 'dark' : 'light'} mx-3`}>
              <input className="form-check-input mx-2" onClick={toggleMode} type="checkbox" role="switch" id="flexSwitchCheckChecked" />
              <label className="form-check-label" htmlFor="flexSwitchCheckChecked">{mode === 'light' ? 'Light' : 'Dark'}Mode</label>
            </div>
            {!localStorage.getItem("token") ? (<form className="d-flex" >
              <Link className='btn btn-primary mx-2' to={"/login"} role='button'>Login</Link>
              <Link className='btn btn-primary mx-2' to={"/signup"} role='button'>Signup</Link>
            </form>) : (<button className='btn btn-primary' onClick={() => handleLogout()}>Logout</button>)}
          </div>
        </div>
      </nav>
    </>
  )
}

export default Navbar
