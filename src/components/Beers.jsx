"use client";
import { useEffect, useState } from "react";

export default function Beers() {
  // state variables
  const [beers, setBeers] = useState([]);
  const [beerSelection, setBeerSelection] = useState({});

  // fetches a list of beers
  async function fetchBeers() {
    const response = await fetch(
      "https://random-data-api.com/api/v2/beers?size=20"
    );
    const beerList = await response.json();
    setBeers(beerList);
  }

  // fetch and save the beer list when the component mounts
  useEffect(() => {
    fetchBeers();
  }, []);

  //   // debugging statement to observe all changes in beers
  //   useEffect(() => {
  //     console.log(beers);
  //   }, [beers]);

  //   // debugging statement to observe all changes in selected beer
  //   useEffect(() => {
  //     console.log(beerSelection);
  //   }, [beerSelection]);

  // handles the select box changes
  function handleSelectBoxChanges(event) {
    const targetBeer = Number(event.target.value);
    const foundBeer = beers.find((beer) => beer.id === targetBeer);
    setBeerSelection(foundBeer);
  }

  // render section
  return (
    <div id="beer-section">
      <h2>Beer</h2>
      <p>
        Here's an API to fetch 20 beers:{" "}
        <a
          href="https://random-data-api.com/api/v2/beers?size=20"
          target="_blank"
        >
          https://random-data-api.com/api/v2/beers?size=20
        </a>
      </p>
      <p>Choose your favorite one to see its details.</p>
      <select id="beer-select-box" onChange={handleSelectBoxChanges}>
        {beers.map((beer) => {
          return (
            <option key={beer.id} value={beer.id} className="beer-options">
              {beer.name}
            </option>
          );
        })}
      </select>
      {Object.keys(beerSelection).length > 0 && (
        <table>
          <thead>
            <tr>
              <th>id</th>
              <th>uid</th>
              <th>brand</th>
              <th>name</th>
              <th>style</th>
              <th>hop</th>
              <th>yeast</th>
              <th>malts</th>
              <th>ibu</th>
              <th>alcohol</th>
              <th>blg</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{beerSelection.id}</td>
              <td>{beerSelection.uid}</td>
              <td>{beerSelection.brand}</td>
              <td>{beerSelection.name}</td>
              <td>{beerSelection.style}</td>
              <td>{beerSelection.hop}</td>
              <td>{beerSelection.yeast}</td>
              <td>{beerSelection.malts}</td>
              <td>{beerSelection.ibu}</td>
              <td>{beerSelection.alcohol}</td>
              <td>{beerSelection.blg}</td>
            </tr>
          </tbody>
        </table>
      )}
    </div>
  );
}
