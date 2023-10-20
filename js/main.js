const d=document;

const listaPokemon = d.querySelector("#listaPokemon");
const botonesHeader = d.querySelectorAll(".btn-header");
const btnBuscar = d.getElementById("btnBuscar");
let URL = "https://pokeapi.co/api/v2/pokemon/";//url de la api
let pokemons = [];

for (let i = 1; i <= 151; i++) {//empezamos desde uno y terminamos en 150
    fetch(URL + i)//el iterador es el numero de id del pokemon
        .then((response) => response.json())//convertidor json
        .then(response => {
            mostrarPokemon(response)
            pokemons.push(response)
            console.log(response);
        })//la respuesta del json la obtenemos y la mostramos en la funcion
}

function mostrarPokemon(poke) {
    //con map guardamos los datos del tipo en un arreglo
    let tipos = poke.types.map((pokemon) => `<p class="${pokemon.type.name} tipo">${pokemon.type.name}</p>`);
    tipos = tipos.join('');//remplazamos las comas por vacios

    let pokeId = poke.id.toString();//obtenemos el id del pokemon y lo pasamos a string
    if (pokeId.length === 1) {//si ese id solo tiene un valor entonces...
        pokeId = "00" + pokeId;
    } else if (pokeId.length === 2) {//si ese id solo tiene dos valores entonces...
        pokeId = "0" + pokeId;
    }


    const div = d.createElement("div");
    div.classList.add("pokemon");
    div.innerHTML = `
        <p class="pokemon-id-back">#${pokeId}</p>
        <div class="pokemon-imagen">
            <img src="${poke.sprites.other["official-artwork"].front_default}" alt="${poke.name}">
        </div>
        <div class="pokemon-info">
            <div class="nombre-contenedor">
                <p class="pokemon-id">#${pokeId}</p>
                <h2 class="pokemon-nombre">${poke.name}</h2>
            </div>
            <div class="pokemon-tipos">
                ${tipos}
            </div>
            <div class="pokemon-stats">
                <p class="stat">${poke.height}m</p>
                <p class="stat">${poke.weight}kg</p>
            </div>
        </div>
    `;
    listaPokemon.append(div);pokemonBuscar
}

botonesHeader.forEach(boton => boton.addEventListener("click", (event) => {
    const botonId = event.currentTarget.id;

    listaPokemon.innerHTML = "";

    for (let i = 1; i <= 151; i++) {
        fetch(URL + i)
            .then((response) => response.json())
            .then(data => {

                if(botonId === "ver-todos") {
                    mostrarPokemon(data);
                } else {
                    const tipos = data.types.map(pokemon => pokemon.type.name);
                    if (tipos.some(tipo => tipo.includes(botonId))) {//solo si los tipos coiunciden con el boton entonces....
                        mostrarPokemon(data);//muestre eso
                    }
                }

            })
    }
}))

/* btnBuscar.addEventListener("click", ()=>{
    const pok = d.getElementById("pokemonBuscar").value;
    listaPokemon.innerHTML = "";
    for (let i = 1; i <= 151; i++) {
        fetch(URL + i)
            .then((response) => response.json())
            .then(data => {
            if(pok.toLowerCase() == data.name){
                mostrarPokemon(data);
            }
        })

    }
 
}) */

const pok = d.getElementById("pokemonBuscar");

pok.addEventListener("keyup",() => {
    let pokeBuscado = pok.value.toLowerCase();
    listaPokemon.innerHTML = "";
    for (let pokemon of pokemons){
        let nombrePoke = pokemon.name
        if (nombrePoke.indexOf(pokeBuscado) !== -1){
            mostrarPokemon(pokemon)
        }else if(pokeBuscado==' '){
            alert('madure')
        }
    }
})
