import { Link } from "react-router-dom";
import { GiWeightLiftingUp } from "react-icons/gi";;

// Citation for following code
// source: https://github.com/osu-cs340-ecampus/react-starter-app/


const Navbar = () => {
  return (
    <header>
      <nav>
          <Link to="/">Home</Link> |
          <Link to="/patients"> Patients</Link> |
          <Link to="/insurances"> Insurances</Link>
      </nav>
    </header>
  );
};

export default Navbar;