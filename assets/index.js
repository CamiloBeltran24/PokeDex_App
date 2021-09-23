const url = "https://pokeapi.co/api/v2/pokemon/";
let btn_all = document.getElementById("btn_all");
let btn_name = document.getElementById("searchByName");
btn_name.addEventListener("click", () => {
  let name = document.getElementById("name").value;
  if (name !== undefined && name !== null && name !== " ") {
    getPokemon(name);
  } else {
    const alert_box = document.createElement("div");
    alert_box.innerHTML =
      "<p>WhoooOps, lo siento, no encuentro tu pokemon Favorito</p>";
  }
});

// btn_all.addEventListener("click", getAllPokemon(url));

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
  console.log(data);
  const image = data.sprites.other.dream_world.front_default;
  console.log(image);
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
