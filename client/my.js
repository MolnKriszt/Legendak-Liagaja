const contentBox = document.getElementById("contentBox")
const modalcontent = document.getElementById("modal-content");


async function getCards(){
  const url = "http://localhost:3000/players";
  const response = await fetch(url);
  const data = await response.json();
  players = data.data;

  RenderCards();

  function RenderCards() {
    let htmlElement = `
      <div class="container">
        <div class="row row-cols-1 row-cols-sm-1 row-cols-md-2 row-cols-lg-3">
      `
    for (const player of players){
      htmlElement += `
          <div class="col p-3">
            <div class="card" style="width: 18rem;">
              <img src="./pictures/${player.Name}.png" class="card-img-top" alt="...">
              <h5 class="card-title m-2">${player.Name}</h5>
              <div class="row">
                    <div class="col m-2">
                      <img src="./ranks/${player.rank}.png" class="img-fluid" alt="${player.rank}" style="max-width: 100px; max-height: 100px;">
                      <h1 class="blockquote">asd</h3>
                    </div>
                    <div class="col align-middle m-2">
                        <img src="./lanes/${player.lane}.png" class="img-fluid" alt="${player.lane}" style="max-width: 80px; max-height: 80px;">
              </div>
            </div>
          </div>
        </div>
    `
  }
    htmlElement += `
      </div>
    </div>
    `


    contentBox.innerHTML = htmlElement;
  }
}
async function Addplayer(){
  const url = "http://localhost:3000/teams";
    const response = await fetch(url);
    const data = await response.json();
    const teams = data.data;

  let htmlElement = `
    <div class="container">
  <div class="row">
    <div class="col-md-6 offset-md-3">
      <div class="mb-3">
        <label for="nameInput" class="form-label">Name</label>
        <input type="text" class="form-control" id="nameInput" placeholder="Your ingame name">
      </div>
      <div class="mb-3">
        <label for="laneSelect" class="form-label">Lane</label>
        <select id="laneSelect" class="form-select">
          <option value="" selected disabled>Select your main lane...</option>
          <option value="1">Top</option>
          <option value="2">Jungle</option>
          <option value="3">Mid</option>
          <option value="4">ADC</option>
          <option value="5">Support</option>
        </select>
      </div>
      <div class="mb-3">
        <label for="rankSelect" class="form-label">Rang</label>
        <select id="rankSelect" class="form-select">
          <option value="" selected disabled>Select your rank...</option>
          <option value="1">Iron</option>
          <option value="2">Bronz</option>
          <option value="3">Silver</option>
          <option value="4">Gold</option>
          <option value="5">Platinum</option>
          <option value="6">Diamond</option>
          <option value="7">Master</option>
          <option value="8">Grandmaster</option>
          <option value="9">Challenger</option>
          <option value="10">Unranked</option>
        </select>
      </div>
      <div class="mb-3">
        <label for="teamSelect" class="form-label">Team</label>
        <select id="teamSelect" class="form-select">
          <option value="" selected disabled>Select your team...</option>
          `

      for (const team of teams){
        htmlElement +=
          `
          <option value="${team.id}">${team.TeamName}</option>
          `
      }
          
  htmlElement += `
        </select>
      </div>
      <button type="button" class="btn btn-primary" onclick="addPlayer()">Játékos hozzáadása</button>
    </div>
  </div>
</div>
    `

    contentBox.innerHTML = htmlElement;
}

async function GetTable() {
  const url = "http://localhost:3000/players";
  const response = await fetch(url);
  const data = await response.json();
  players = data.data;

  RenderTable();
}

function SortByName() {
  players.sort((a, b) => a.Name.localeCompare(b.Name));

  RenderTable();
}
function SortByTeam() {
  players.sort((a, b) => a.TeamName.localeCompare(b.TeamName));

  RenderTable();
}
function SortByRank() {
  players.sort((a, b) =>  b.rankid - a.rankid);

  RenderTable();
}


function RenderTable() {
  let htmlElement = `
  <div class="justify-content-center">
      <button type="button" class="btn btn-dark" onclick="Addplayer()"><i class="bi bi-plus-lg"></i></button>
  </div>
  
  <table class="table table-striped table-hover">
    <thead>
      <tr>
        <th>Name<button type="button" class="btn btn-dark btn-sm ms-2" onclick="SortByName()"><i class="bi bi-caret-down-fill"></i></button></th>
        <th>Lane<button type="button" class="btn btn-dark btn-sm ms-2" onclick="GetTable()"><i class="bi bi-caret-down-fill"></i></button></th>
        <th>Rank<button type="button" class="btn btn-dark btn-sm ms-2" onclick="SortByRank()"><i class="bi bi-caret-down-fill"></i></button></th>
        <th>Team<button type="button" class="btn btn-dark btn-sm ms-2" onclick="SortByTeam()"><i class="bi bi-caret-down-fill"></i></button></th>
      </tr>
    </thead>
    <tbody>
  `;

  for (const player of players) {
      htmlElement += `
      <tr>
        <td><button type="button" class="btn btn-light" data-bs-toggle="modal"
            data-bs-target="#info-modal" onclick="GetInfoModal(${player.id})">${player.Name}</button></td>
        <td>${player.lane}</td>
        <td>${player.rank}</td>
        <td>${player.TeamName}</td>
        <td><button type="button" class="btn btn-danger" onclick="DeletePlayer(${player.id})"><i class="bi bi-trash-fill"></i></button></td>
      </tr>
      `;
  }

  htmlElement += `
    </tbody>
  </table>
  `;

  contentBox.innerHTML = htmlElement;
}

async function GetInfoModal(id){
  const url = `http://localhost:3000/player/${id}`;
  const response = await fetch(url);
  const data = await response.json();
  const player = data.data[0];
  let htmlElement = `
  <div class="modal-header">
    <h2 class="modal-title">${player.Name}</h2>
    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
  </div>
  <div class="modal-body ">
  <img src="./pictures/${player.Name}.png" class="mx-auto d-block w-100" alt="${player.Name}">
  <div class="row">
  <div class="col">
  <img src="./ranks/${player.rank}.png" class="img-fluid" alt="${player.rank}" style="max-width: 200px; max-height: 200px;">
  </div>
  <div class="col align-self-center">
  <ul class="list-group list-group-flush">
    <li class="list-group-item"><img src="./lanes/${player.lane}.png" class="img-fluid" alt="${player.lane}" style="max-width: 80px; max-height: 80px;"></li>
    <li class="list-group-item">${player.TeamName}</li>
  </ul>
  </div>
  </div>
  </div>
  `;
  modalcontent.innerHTML = htmlElement;
}

async function addPlayer() {
  const name = document.getElementById("nameInput").value;
  const laneId = document.getElementById("laneSelect").value;
  const rankId = document.getElementById("rankSelect").value;
  const teamId = document.getElementById("teamSelect").value;

  const player = {
    Name: name,
    laneid: laneId,
    rankid: rankId,
    teamid: teamId
  };

  const url = "http://localhost:3000/players";
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(player)
  });

  if (response.ok) {
    console.log("Játékos sikeresen hozzáadva.");
    GetTable()
  } else {
    console.error("Játékos hozzáadása sikertelen.");
  }
}

async function DeletePlayer(id) {
  const confirmation = confirm("Biztosan törölni szeretnéd ezt a játékost?");

  if (confirmation) {
    const url = `http://localhost:3000/players/${id}`;
    const response = await fetch(url, {
      method: "DELETE"
    });

    if (response.ok) {
      console.log("Játékos sikeresen törölve.");
      GetTable()
    } else {
      console.error("Játékos törlése sikertelen.");
    }
  } else {
    console.log("A játékos törlése megszakítva.");
  }
}