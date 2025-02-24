// src/components/NavBar/NavBar.jsx
import { useContext } from "react";
import { Link } from "react-router";
import { UserContext } from "../../contexts/UserContext";
import './NavBar.css';

const NavBar = () => {
    // Pass the UserContext object to the useContext hook to access:
  // - The user state (which we use here).
  // - The setUser function to update the user state (which we aren't using).
  //
  // Destructure the object returned by the useContext hook for easy access
  // to the data we added to the context with familiar names.
  const { user, setUser } = useContext(UserContext)

  function handleSignOut(){
    // destroy the token! 
    localStorage.removeItem('token')
    // clearing out our state
    setUser(null)
  }

  return (
    // TODO: Convert site-logo-container to a clickable link that navigates to the home page
<nav>
  <div className="site-logo-container">
  <Link to="/"><div className="site-name">
    <h1 className="site-name-front">Git</h1><h1 className="site-name-back">Central</h1>
  </div></Link>
  <p id="site-slogan">"Your home for dev-dialogue"</p>
  </div>
 
  <div className="nav-links">
      {user ? (
        <ul>
          <li><Link to='/profile'>Profile</Link></li>
          <li><Link to='/'>Forum</Link></li>
          <li><Link to='/'>Posts</Link></li>
          <li><Link to='/' onClick={handleSignOut}>Sign Out</Link></li>
        </ul>
      ) : (
        <ul>
          <li><Link to='/'>Home</Link></li>
          <li><Link to='/sign-in'>Sign In</Link></li>
          <li><Link to='/sign-up'>Sign Up</Link></li>
        </ul>
      )}
  </div>
</nav>
  );
};

export default NavBar;

