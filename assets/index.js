const url = "https://pokeapi.co/api/v2/pokemon/";

async function getData() {
  const response = await fetch(url);
  const data = await response.json();
  return data.results;
}
async function getPokemon(name) {
  const url = `https://pokeapi.co/api/v2/pokemon/${name}`;
  const response = await fetch(url);
  const data = await response.json();
  const image = data.sprites.other.dream_world.front_default;
  console.log(image);
  console.log(data);
  printPokemon(data, image);
}
async function getTopPokemon() {
  const data = await getData();
  const names = data.slice(0, 15).map((data) => {
    getPokemon(data.name);
  });
}
function printPokemon(data, image) {
  const container = document.getElementById("cards");
  container.innerHTML += `
    <div class="card">
      <img src=${image}>
      <p class="name">${data.name}</p>
    </div>`;
}

getTopPokemon();
