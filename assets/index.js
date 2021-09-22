const url = "https://pokeapi.co/api/v2/pokemon/";

async function getData() {
  const response = await fetch(url);
  const data = await response.json();
  return data.results;
}
function getAllPokemon(url) {
  const limit = "?limit=1200";
  const new_url = `https://pokeapi.co/api/v2/pokemon/${limit}`;
  fetch(new_url)
    .then((response) => response.json())
    .then((data) => {
      data.results.forEach((pokemon) => getPokemon(pokemon.name));
    })
    .catch((error) => console.error(error));
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
  const names = data.slice(0, 10).map((data) => {
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

// getTopPokemon();
