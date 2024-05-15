import { Link } from "react-router-dom";
import { GiWeightLiftingUp } from "react-icons/gi";;

// Citation for following code
// source: https://github.com/osu-cs340-ecampus/react-starter-app/


const Navbar = () => {
  return (
    <header>
      <div>
        <Link to="/">
          <GiWeightLiftingUp size={80} />
        </Link>
      </div>
      {/* <h1>Fit Physical Therapy</h1> */}
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/patients">Patients</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;