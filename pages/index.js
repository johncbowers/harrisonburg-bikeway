// index.html
import { useState } from 'react';
// function Header({ title }) {
//   return <h1>{title ? title : 'Default title'}</h1>;
// }

// export default function HomePage() {
//   const names = ['Ada Lovelace', 'Grace Hopper', 'Margaret Hamilton'];

//   const [likes, setLikes] = useState(0);

//   function handleClick() {
//     setLikes(likes + 1);
//   }

//   return (
//     <div>
//       <Header title="Develop. Preview. Ship." />
//       <ul>
//         {names.map((name) => (
//           <li key={name}>{name}</li>
//         ))}
//       </ul>

//       <button onClick={handleClick}>Like ({likes})</button>
//     </div>
//   );
// }

const locations = ['Food Lion on S. High', 'Dogwood and South Ave.', 'Westover', 'EMU Quad', 
                   'Westover Friendly City Trail', 'Thomas Harrison Middle School', 'Rocktown Trails'];
// Each segment is a tuple (start, end, distance, line) where start is the name of the start location, 
// end is the name of the end location, distance is the distance in miles, and line is a list containing the 
// names of the lines that the segment is on.
const segments = [
  ('Food Lion on S. High', 'Dogwood and South Ave.', 0.5, ["West Side"]),
  ('Dogwood and South Ave.', 'Westover', 0.5, ["West Side"]),
  ('Westover', 'EMU Quad', 0.5, ["West Side"]),
  ('Westover', 'Westover Friendly City Trail', 0.5, ["Friendly City Trail", "Memorial"]),
  ('Westover Friendly City Trail', 'Thomas Harrison Middle School', 0.5, ["Friendly City Trail"]),
  ('Thomas Harrison Middle School', 'Rocktown Trails', 0.5, ["Friendly City Trail"])
];

function PlannerView(props) {
  return (
    <div>
      <h1>Plan a route</h1>

      <h2>Start location: </h2>
      <select>
        {locations.map((location) => (
          <option key={location}>{location}</option>
        ))}
      </select>

      <h2>End location: </h2>
      <select>
        {locations.map((location) => (
          <option key={location}>{location}</option>
        ))}
      </select>

      <button onClick={props.planRoute}>Plan route</button>
    </div>
  );
}

function RouteView(props) {
  return (
    <div>
      <h1>Route</h1>
      <ul>
        {segments.map((segment) => (
          <li key={segment}>{segment}</li>
        ))}
      </ul>
      <button onClick={props.showPlanView}>Plan another route</button>
    </div>
  );
}

export default function App() {
  const [showRoute, setShowRoute] = useState(false);

  function planRoute() {
    setShowRoute(true);
  }

  function showPlanView() {
    setShowRoute(false);
  }

  return (showRoute ? <RouteView showPlanView={showPlanView} /> : <PlannerView planRoute={planRoute} />);
}