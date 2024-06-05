// Citation for following code
// Based on CS340 react starter app
// Slight change to have brief description of our physical therapy db
// source: https://github.com/osu-cs340-ecampus/react-starter-app/
import { GiWeightLiftingUp } from "react-icons/gi";;


function HomePage() {
    return (
    <div>
    <div>
          <GiWeightLiftingUp size={80} />
      </div>
        <h2>Fit Physical Therapy</h2>
        <p>This is database for Fit Physical Therapy employees to manage everyday tasks.</p>            
    </div>
);
  }
  
  export default HomePage;