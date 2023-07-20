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
  ('Thomas Harrison Middle School', 'Rocktown Trails', 0.5, ["Friendly City Trail"]),
  ('Dogwood and South Ave.', 'Food Lion on S. High', 0.5, ["West Side"]),
  ('Westover', 'Dogwood and South Ave.', 0.5, ["West Side"]),
  ('EMU Quad', 'Westover', 0.5, ["West Side"]),
  ('Westover Friendly City Trail', 'Westover', 0.5, ["Friendly City Trail", "Memorial"]),
  ('Thomas Harrison Middle School', 'Westover Friendly City Trail', 0.5, ["Friendly City Trail"]),
  ('Rocktown Trails', 'Thomas Harrison Middle School', 0.5, ["Friendly City Trail"])
];
const graph = {};

function graph_init() {
  // Builds a graph whose vertices are the locations and whose edges are the segments.
  // Returns a dictionary whose keys are the locations and whose values are the segments that start at that location.
  
  for (let location of locations) {
    graph[location] = [];
  }
  for (let segment of segments) {
    const [start, end, distance, line] = segment;
    graph[start].push((end, distance, line));
  }
}

graph_init();

function dijkstra(start, end, graph) {
  // Returns a list of segments that form the shortest path from start to end.
  // Uses Dijkstra's algorithm.
  // start and end are strings representing locations.
  // graph is a dictionary whose keys are the locations and whose values are the segments that start at that location.

  const distances = {};
  const previous = {};
  const queue = []; // Using a priority queue would be more efficient, but for now we'll use a list. Optimize later.
  const path = [];

  for (let location of locations) {
    distances[location] = Infinity;
    previous[location] = null;
    queue.push((location, 0));
  }
  distances[start] = 0;

  while (queue.length > 0) {
    // Loop over the queue until we find the closest vertex
    let closest = queue[0];
    let closest_index = 0;
    for (let i = 1; i < queue.length; i++) {
      if (queue[i][1] < closest[1]) {
        closest = queue[i];
        closest_index = i;
      }
    }
    // remove the minimum element from the queu
    queue[closest_index] = queue[queue.length - 1];
    queue.pop();

    // TODO FINISH FROM HERE

  }

}

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