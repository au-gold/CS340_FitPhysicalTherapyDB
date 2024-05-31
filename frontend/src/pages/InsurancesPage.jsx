// Citation for following code
// source: https://github.com/osu-cs340-ecampus/react-starter-app/

import { Routes, Route, Link, useLocation} from "react-router-dom";
import CreateInsurance from "../components/insurances/CreateInsurance";
import InsuranceTable from "../components/insurances/InsuranceTable";
import UpdateInsurance from "../components/insurances/UpdateInsurance";

function InsurancesPage() {
  const location = useLocation();

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
              <Link to="/insurances/add">Add Insurance</Link>
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