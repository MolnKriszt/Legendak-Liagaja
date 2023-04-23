const contentBox = document.getElementById("contentBox")
const tbody = document.getElementById("tbody")


function getHome(){
    let htmlElement = `
    <h1>Home</h1>
    <p>Home</p>
    `

    contentBox.innerHTML = htmlElement;
}
function getTeams(){
    let htmlElement = `
    <h1>Teams</h1>
    <p>Teams</p>
    `
    contentBox.innerHTML = htmlElement;
}
function getSearch(){
    let htmlElement = `
    <h1>Searchplayer</h1>
    <p>Search for a player</p>
    `

    contentBox.innerHTML = htmlElement;
}
