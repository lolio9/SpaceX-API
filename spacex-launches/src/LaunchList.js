import React, { useState, useEffect } from "react";

function OppskytningListe() {
  const [liste, setListe] = useState([]);
  const [rekkefolge, setRekkefolge] = useState("nyest");
  const [ar, setAr] = useState("");

  // Henter data fra SpaceX APIen og lagrer det i listen
  useEffect(() => {
    fetch("https://api.spacexdata.com/v5/launches")
      .then(function (svar) {
        return svar.json();
      })
      .then(function (data) {
        setListe(data);
      })
      .catch(function (feil) {
        console.log("Feil i henting", feil);
      });
  }, []);

  let synlig = [];

  // Filtrerer listen basert på valgt år
  for (let i = 0; i < liste.length; i++) {
    if (ar === "" || liste[i].date_utc.startsWith(ar)) {
      synlig.push(liste[i]);
    }
  }

  // Sorterer etter valgt rekkefølge
  if (rekkefolge === "nyest") {
    synlig.sort(function (a, b) {
      return new Date(b.date_utc) - new Date(a.date_utc);
    });
  } else {
    synlig.sort(function (a, b) {
      return new Date(a.date_utc) - new Date(b.date_utc);
    });
  }

  return (
    <div>
      <h2>Oppskytinger</h2>

      <label>Sorter:</label>
      <select
        value={rekkefolge}
        onChange={(e) => setRekkefolge(e.target.value)}
        className="hoverfelt"
      >
        <option value="nyest">Nyeste</option>
        <option value="eldst">Eldste</option>
      </select>

      <br />

      <label>År:</label>
      <input
        type="text"
        value={ar}
        onChange={(e) => setAr(e.target.value)}
        className="hoverfelt"
        placeholder="f.eks. 2020"
      />

      <div className="launch-list">
        <ul>
          {synlig.map(function (rakett) {
            return (
              <li key={rakett.id}>
                {rakett.name} {new Date(rakett.date_utc).toLocaleDateString()}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default OppskytningListe;
