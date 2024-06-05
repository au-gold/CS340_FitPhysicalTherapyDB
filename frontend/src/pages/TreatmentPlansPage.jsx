// Citation for following code
// Based on CS340 react starter app
// Changed handle M:M relationship by showing treamtent and intersection tables.
// source: https://github.com/osu-cs340-ecampus/react-starter-app/

import { Routes, Route, Link, useLocation, useNavigate } from "react-router-dom";
import CreateTreatmentPlan from "../components/treatmentPlans/CreateTreatmentPlan";
import TreatmentPlanTable from "../components/treatmentPlans/TreatmentPlanTable";
import UpdateTreatmentPlan from "../components/treatmentPlans/UpdateTreatmentPlan";
import CreateTreatmentPlanExercise from "../components/treatmentPlansExercises/CreateTreatmentPlanExercise";
import UpdateTreatmentPlanExercise from "../components/treatmentPlansExercises/UpdateTreatmentPlanExercise";
import TreatmentPlanExerciseTable from "../components/treatmentPlansExercises/TreatmentPlanExerciseTable";

function TreatmentPlansPage() {
  const location = useLocation(); 
  const navigate = useNavigate();


  const handleAddClick = () => {
    navigate("/treatmentPlans/add");
  };

  const handleAddTEClick = () => {
    navigate("/treatmentPlans/add_t_and_e");
  };

  return (
    <div>
      <h1>Treatment Plans Page</h1>
      <nav>
        <ul>
          {/* Conditionally render the Treatment Plans Table and Add Treatment Plan links */}
          {(location.pathname === "/treatmentPlans/add" || 
            location.pathname.startsWith("/treatmentPlans/edit") ||
            location.pathname === "/treatmentPlans/add_t_and_e" ||
            location.pathname.startsWith("/treatmentPlans/edit_t_and_e")) ? (
            <li>
              <Link to="/treatmentPlans">Treatment Plans Table</Link>
            </li>
          ) : (
            <>
              <li>
              <button onClick={handleAddClick}>Add a Treatment Plan</button>
                {/* <Link to="/treatmentPlans/add">Add a Treatment Plan</Link> */}
              </li>
              <li>
                <button onClick={handleAddTEClick}>Assign Exercises to a Treatment Plan</button>
                {/* <Link to="/treatmentPlans/add_t_and_e">Assign Exercises to a Treatment Plan</Link> */}
              </li>
            </>
          )}
        </ul>
      </nav>
      <Routes>
        <Route path="/" element={<div><TreatmentPlanTable /><TreatmentPlanExerciseTable /></div>} />
        <Route path="/add" element={<CreateTreatmentPlan />} />
        <Route path="/add_t_and_e" element={<CreateTreatmentPlanExercise />} />
        <Route path="/edit/:id" element={<UpdateTreatmentPlan />} />
        <Route path="/edit_t_and_e/:id" element={<UpdateTreatmentPlanExercise />} />
        <Route path="/t_and_e" element={<TreatmentPlanExerciseTable />} />
      </Routes>
    </div>
  );
}

export default TreatmentPlansPage;