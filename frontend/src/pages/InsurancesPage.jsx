// Citation for following code
// Based on CS340 react starter app
// Slight change to have button instead of link
// source: https://github.com/osu-cs340-ecampus/react-starter-app/

import { Routes, Route, Link, useLocation, useNavigate } from "react-router-dom";
import CreateInsurance from "../components/insurances/CreateInsurance";
import InsuranceTable from "../components/insurances/InsuranceTable";
import UpdateInsurance from "../components/insurances/UpdateInsurance";

function InsurancesPage() {
  const location = useLocation();
  const navigate = useNavigate();


  const handleAddClick = () => {
    navigate("/insurances/add");
  };

  return (
    <div>
      <h1>Insurances Page</h1>
      <nav>
      <ul>
          {/* Only renders insurance table link  under add and edit page */}
          {location.pathname === "/insurances/add" || location.pathname.startsWith("/insurances/edit") ? (
            <>
              <li>
                <Link to="/insurances">Insurances Table</Link>
              </li>
            </>
          ) : (
            <li>
              <button onClick={handleAddClick}>Add Insurance</button>
              {/* <Link to="/insurances/add">Add Insurance</Link> */}
            </li>
          )}
        </ul>
      </nav>
      <Routes>
        <Route path="/" element={<InsuranceTable />} />
        <Route path="/add" element={<CreateInsurance />} />
        <Route path="/edit/:id" element={<UpdateInsurance />} />
      </Routes>
    </div>
  );
}

export default InsurancesPage;