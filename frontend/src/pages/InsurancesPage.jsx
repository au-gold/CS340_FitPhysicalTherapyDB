// Citation for following code
// source: https://github.com/osu-cs340-ecampus/react-starter-app/

import { Routes, Route, Link } from "react-router-dom";
import CreateInsurance from "../components/insurances/CreateInsurance";
import InsuranceTable from "../components/insurances/InsuranceTable";
import UpdateInsurance from "../components/insurances/UpdateInsurance";

function InsurancesPage() {
  return (
    <div>
      <h1>Insurances Page</h1>
      <nav>
        <ul>
          <li>
            <Link to="/insurances">Insurances Table</Link>
          </li>
          <li>
            <Link to="/insurances/add">Add a Insurance</Link>
          </li>
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