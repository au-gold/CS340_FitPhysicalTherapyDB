// Citation for following code
// source: https://github.com/osu-cs340-ecampus/react-starter-app/

import { Routes, Route, Link, useLocation} from "react-router-dom";
import CreateExercise from "../components/exercises/CreateExercise";
import ExerciseTable from "../components/exercises/ExerciseTable";
import UpdateExercise from "../components/exercises/UpdateExercise";

function ExercisesPage() {
  const location = useLocation();

  return (
    <div>
      <h1>Exercises Page</h1>
      <nav>
        <ul>
          {/* Only renders exercise table link  under add and edit page */}
          {location.pathname === "/exercises/add" || location.pathname.startsWith("/exercises/edit") ? (
            <>
              <li>
                <Link to="/exercises">Exercises Table</Link>
              </li>
            </>
          ) : (
            <li>
              <Link to="/exercises/add">Add Exercise</Link>
            </li>
          )}
        </ul>
      </nav>
      <Routes>
        <Route path="/" element={<ExerciseTable />} />
        <Route path="/add" element={<CreateExercise />} />
        <Route path="/edit/:id" element={<UpdateExercise />} />
      </Routes>
    </div>
  );
}

export default ExercisesPage;