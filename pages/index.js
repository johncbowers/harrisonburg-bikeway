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

const locationSet = new Set([]);
const locations = [];
// Each segment is a tuple (start, end, distance, line) where start is the name of the start location, 
// end is the name of the end location, distance is the distance in miles, and line is a list containing the 
// names of the lines that the segment is on.
const segments = [
  ['Food Lion on S. High', 'Dogwood and South Ave.', 0.5, ["West Side"]],
  ['Dogwood and South Ave.', 'Westover', 0.5, ["West Side"]],
  ['Westover', 'EMU Quad', 0.5, ["West Side"]],
  ['Westover', 'Westover Friendly City Trail', 0.5, ["Friendly City Trail", "Memorial"]],
  ['Westover Friendly City Trail', 'Thomas Harrison Middle School', 0.5, ["Friendly City Trail"]],
  ['Thomas Harrison Middle School', 'Rocktown Trails', 0.5, ["Friendly City Trail"]],
  ['Dogwood and South Ave.', 'Food Lion on S. High', 0.5, ["West Side"]],
  ['Westover', 'Dogwood and South Ave.', 0.5, ["West Side"]],
  ['EMU Quad', 'Westover', 0.5, ["West Side"]],
  ['Westover Friendly City Trail', 'Westover', 0.5, ["Friendly City Trail", "Memorial"]],
  ['Thomas Harrison Middle School', 'Westover Friendly City Trail', 0.5, ["Friendly City Trail"]],
  ['Rocktown Trails', 'Thomas Harrison Middle School', 0.5, ["Friendly City Trail"]]
];
const graph = {};

function graph_init() {
  // Builds a graph whose vertices are the locations and whose edges are the segments.
  // Returns a dictionary whose keys are the locations and whose values are the segments that start at that location.
  
  // Loop over segments and all locations to the set of locations
  for (let segment of segments) {
    const [start, end, distance, lines] = segment;
    if (!locationSet.has(start)) {      
      locationSet.add(start);
      graph[start] = {};
    }
    if (!locationSet.has(end)) {
      locationSet.add(end);
      graph[end] = {};
    }
  }

  // Loop over all locations in locationSet and add them into locations
  for (let location of locationSet) {
    locations.push(location);
  }

  for (let segment of segments) {
    const [start, end, distance, lines] = segment;
    graph[start][end] = (distance, lines);
  }
}

graph_init();

function bellmanFord(start, end, graph) {

  // InitSSSP
  const dist = {};
  const pred = {};
  for (let location of locations) {
    dist[location] = Infinity;
    pred[location] = null;
  }
  dist[start] = 0;

  // Convenience functions

  function w(u, v) {
    // Returns the weight of the edge (u, v)
    return graph[u][v][0];
  }

  function relax(u, v) {
    dist[v] = dist[u] + w(u, v);
    pred[v] = u;
  }

  function isTense(u, v) {
    return dist[v] > dist[u] + w(u, v);
  }

  for (let i = 0; i < locations.length - 1; i++) {
    let has_tense_edge = false;
    for (let segment of segments) {
      const [start, end, distance, lines] = segment;
      if (isTense(start, end)) {
        relax(start, end);
        has_tense_edge = true;
      }
    }
    if (!has_tense_edge) {
      break;
    }
  }

  // Compute the path from start to end
  const path = [];
  let current = end;
  while (current != start) {
    path.push(current);
    current = pred[current];
  }
  path.push(start);
  path.reverse();
}

function PlannerView(props) {
  
  const [start, setStart] = useState(locations[0]);
  const [end, setEnd] = useState(locations[0]);

  function handleStartChange(e) {
    setStart(e.target.value);
  }

  function handleEndChange(e) {
    setEnd(e.target.value);
  }

  return (
    <div>
      <h1>Plan a route</h1>

      <h2>Start location: </h2>
      <select onChange={handleStartChange}>
        {locations.map((location) => (
          <option key={location}>{location}</option>
        ))}
      </select>

      <h2>End location: </h2>
      <select onChange={handleEndChange}>
        {locations.map((location) => (
          <option key={location}>{location}</option>
        ))}
      </select>
      <button onClick={() => props.planRoute(start, end)}>Plan route</button>
    </div>
  );
}

function RouteView(props) {
  return (
    <div>
      <h1>Route</h1>
      <ul>
        {props.route.map((location) => (
          <li key={location}>{location}</li>
        ))}
      </ul>
      <button onClick={props.showPlanView}>Plan another route</button>
    </div>
  );
}

export default function App() {
  const [showRoute, setShowRoute] = useState(false);
  const [route, setRoute] = useState([]);

  function planRoute(start, end) {
    console.log("Planning route: ");
    console.log(start);
    console.log(end);
    console.log("Let's GOOOOOOOOO!");
    const theRoute = bellmanFord(start, end, graph);
    console.log("The route is: ")
    console.log(theRoute);
    setRoute(theRoute);
    setShowRoute(true);
  }

  function showPlanView() {
    setShowRoute(false);
  }

  return (showRoute ? <RouteView showPlanView={showPlanView} route={route} /> : <PlannerView planRoute={planRoute} />);
}