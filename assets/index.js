const originalUrl = "https://pokeapi.co/api/v2/pokemon/";
const btn_all = document.getElementById("btn_all");
const btn_name = document.getElementById("searchByName");
const btn_type = document.getElementById("btn_type");

//Inicio Funcion que da accion al boton de busqueda por nombre
btn_name.onclick = function () {
  const name = document.getElementById("name").value.toLowerCase();
  console.log(name);
  if (name !== undefined && name !== null && name !== "") {
    getPokemon(name);
  } else {
    console.log("Error: El nombre del pokemon no puede estar vacio");
    const title = "Hey !";
    const message =
      "Please, Write a correct Name to get your <span>Pokemon</span>";
    createAlert(title, message);
  }
};

//Funcion de accion para el boton de busqueda por categoria
btn_type.onclick = function () {
  const type = document.getElementById("typeSelect").value.toLowerCase();
  console.log(type);
  if (type != null && type != undefined && type != "") {
    // getPokemonsByType(type);
    getAllPokemon(type);
  } else {
    alert("Select a type ! ");
  }
};
// btn_all.addEventListener("click", getAllPokemon(url));
async function getData(url) {
  const response = await fetch(url);
  // console.log("Imprimiendo desde getData  " + response + url);
  if (response.ok) {
    const data = await response.json();
    return data.results;
  } else {
    return "ERROOOOOOR";
  }
}

function getAllPokemon(type) {
  const limit = "?limit=1200";
  const new_url = `https://pokeapi.co/api/v2/pokemon/${limit}`;
  let correctPokemon = [];
  fetch(new_url)
    .then((response) => response.json())
    .then((data) => {
      data.results.forEach((pokemon) => {
        // console.log(pokemon.url);
        const filtro = filterByType(pokemon.url, type);
        filtro.then((response) => {
          if (response) {
            correctPokemon.push(pokemon);
          }
        });
      });
      console.log(correctPokemon);
    });
}
async function getPokemon(name) {
  const url = `https://pokeapi.co/api/v2/pokemon/${name}`;
  const response = await fetch(url);
  if (response.ok) {
    const data = await response.json();
    console.log(data);
    const image = data.sprites.other.dream_world.front_default;
    console.log(image);
    printPokemon(data, image);
  } else {
    const message = `<span>Something was wronge</span>. The pokemon called <span>${name}</span> was not found`;
    const title = `Whooops !`;
    createAlert(title, message);
  }
}

async function filterByType(url, type) {
  const response = await fetch(url);
  const data = await response.json();
  for (let i = 0; i < data.types.length; i++) {
    if (data.types[i].type.name == type) {
      return true;
    }
  }
}

function printPokemon(data, image) {
  const lightBox = document.createElement("div");
  lightBox.setAttribute("class", "lightBox");
  document.body.appendChild(lightBox);
  const stats = data.stats;
  //console.log(stats);
  const list = document.createElement("ul");
  stats.forEach((stat) => {
    const name = stat.stat.name;
    const baseStat = stat.base_stat;
    list.innerHTML += `<li class='stat'><span>${name}</span> : ${baseStat}</li>`;
  });
  console.log(list);
  lightBox.innerHTML += `
    <div class="card">
      <h2>Here is your favorite pokemon</h2>
      <hr>
      <img src=${image}>
      <h3 class="name">${data.name}</h3>
      <ul class="stats">
        ${list.innerHTML} 
      </ul>
      <a id="btn_close_alert">Close</a>
    </div>`;
  closeAlert(lightBox);
}

function createAlert(title, message) {
  const lightBox = document.createElement("div");
  const alert = document.createElement("div");
  document.body.appendChild(lightBox);
  lightBox.setAttribute("class", "lightBox");
  alert.setAttribute("class", "alert");
  lightBox.appendChild(alert);
  alert.innerHTML = `
      <h3>${title}</h3>
      <p>${message}</p>
      <a id="btn_close_alert">Close</a>
    `;
  closeAlert(lightBox);
}
function closeAlert(lightBox) {
  const alert = document.getElementById("btn_close_alert");
  alert.addEventListener("click", () => {
    document.body.removeChild(lightBox);
    document.getElementById("name").value = "";
  });
}
