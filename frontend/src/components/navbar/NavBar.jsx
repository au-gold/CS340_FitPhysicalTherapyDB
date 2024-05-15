import { Link } from "react-router-dom";
import { MdLocalConvenienceStore } from "react-icons/md";

// Citation for following code
// source: https://github.com/osu-cs340-ecampus/react-starter-app/


const Navbar = () => {
  return (
    <header>
      <div>
        <Link to="/">
          <MdLocalConvenienceStore size={80} />
        </Link>
      </div>
      <h1>Fit Physical Therapy</h1>
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