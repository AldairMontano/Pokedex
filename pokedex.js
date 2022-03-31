// función para conectar con el API.
const getPokemon = () => {
  let pokeName = window.pokeName.value.toLowerCase();
  fetch(`https://pokeapi.co/api/v2/pokemon/${pokeName}`)
    .then((res) => {
      if (res.status != "200") {
        const pokeSprite = document.getElementById("pokeImg");
        pokeSprite.src = "./assets/img/Error.png";
        window.head.textContent = "Error";
      } else {
        return res.json();
      }
    })
    .then((data) => {
      // let pokeImg = data.sprites.front_default;
      console.log(data);
      updatePokemon(data);
      getStats(data);
      caracteristicas(data);
      pokemonID(data);
    });
};

//función para interactar con la parte frontal de la pokedex.
const updatePokemon = (data) => {
  const pokeSprite = document.getElementById("pokeImg");
  pokeSprite.src = data.sprites.other.home.front_default;
  window.pokeId.textContent = data.name;
  contenedor.removeAttribute("class");
};

//funciones para  mostrar las Stats
const eliminarClase = (nombre) => {
  const clase = Array.from(document.getElementsByClassName(nombre));

  clase.forEach((element) => {
    element.remove();
  });
};

const getStats = (data) => {
  const divStats = document.getElementById("Stats");
  eliminarClase("statContenedor");

  let Stats = data.stats;
  Stats.forEach((element) => {
    let stat = document.createElement("p");
    stat.className = "stat";
    let statNombre = document.createElement("p");
    statNombre.className = "statNombre";
    let statContenedor = document.createElement("div");
    statContenedor.className = "statContenedor";

    stat.innerText = element.base_stat;
    statNombre.innerText = element.stat["name"].toUpperCase();
    element.base_stat;

    statContenedor.append(statNombre);
    statContenedor.append(stat);
    divStats.append(statContenedor);
  });
};

//Funciones para mostrar caracteristicas
const caracteristicas = (data) => {
  // tipo.removeAttribute("class");
  tipo.innerText = data.types[0]["type"]["name"].toUpperCase();
  contenedor.classList.add(data.types[0]["type"]["name"]);

  if (data.types.length == 2) {
    tipo2.innerText = data.types[1]["type"]["name"].toUpperCase();
    // tipo2.removeAttribute("class");
  } else tipo2.style.display = "none";

  peso.innerText = data.weight;
  altura.innerText = data.height;
};

const pokemonID = (data) => {
  let id = data.id;
  window.pokecon.value = id;
};
