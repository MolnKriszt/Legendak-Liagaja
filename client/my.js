const contentBox = document.getElementById("contentBox")
const modalcontent = document.getElementById("modal-content");


function getTeams(){
    let htmlElement = `
    <h1>Teams</h1>
    `
    contentBox.innerHTML = htmlElement;
}
function Addplayer(){
    let htmlElement = `
    <div class="container">
  <div class="row">
    <div class="col-md-6 offset-md-3">
      <div class="mb-3">
        <label for="nameInput" class="form-label">Név</label>
        <input type="text" class="form-control" id="nameInput" placeholder="Név">
      </div>
      <div class="mb-3">
        <label for="laneSelect" class="form-label">Lane</label>
        <select id="laneSelect" class="form-select">
          <option value="" selected disabled>Válassz lane-t...</option>
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
          <option value="" selected disabled>Válassz rangot...</option>
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
        <label for="teamSelect" class="form-label">Csapat</label>
        <select id="teamSelect" class="form-select">
          <option value="" selected disabled>Válassz csapatot...</option>
          <option value="1">EDG</option>
          <option value="2">T1</option>
          <option value="3">RNG</option>
          <option value="4">G2 ESPORTS</option>
          <option value="5">DWG KIA</option>
          <option value="6">Tic-Tac Tac-Tic-ai Hadjárat</option>
          <option value="7">None</option>
        </select>
      </div>
      <button type="button" class="btn btn-primary" onclick="addPlayer()">Játékos hozzáadása</button>
    </div>
  </div>
</div>
    `

    contentBox.innerHTML = htmlElement;
}

async function GetTable(){
    const url = "http://localhost:3000/players";
    const response = await fetch(url);
    const data = await response.json();
    const players = data.data;

    let htmlElement = `
    <table class="table table-striped table-hover">
      <thead>
        <tr>
          <th>Name</th>
          <th>Lane</th>
          <th>Rank</th>
          <th>Team</th>
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
        `
    }

    htmlElement +=`
    </tbody>
    </table>
`
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
  <img src="./pictures/${player.Name}.png" class="img-fluid" alt="${player.Name}">
  <div class="row">
  <div class="col">
  <img src="./ranks/${player.rank}.png" class="img-fluid" alt="${player.rank}" style="max-width: 200px; max-height: 200px;">
  </div>
  <div class="col align-self-center">
  <ul class="list-group list-group-flush">
    <li class="list-group-item">${player.lane}</li>
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