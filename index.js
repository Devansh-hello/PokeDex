const search = document.querySelector(".search");
const pokemonInput = document.querySelector(".pokemonInput");
const card = document.querySelector(".Card");

search.addEventListener("submit", async event =>{
    event.preventDefault();
    const pokemon = pokemonInput.value;

    if (pokemon){
        try{
            const pokemonData = await getPokemonInfo(pokemon);
            diplayPokemonInfo(pokemonData)
        }
        catch(error){
            console.error(error);
            displayError(error);
        }
    }
    else{
        displayError("Please enter a pokemon name")
    }
})

const getPokemonInfo = async (pokemon) =>{
    const apiUrl = `https://pokeapi.co/api/v2/pokemon/${pokemon}`;
    const response = await fetch(apiUrl);
   

    if(!response.ok){
        throw new Error("Unable to find the Pokemon");
    
    }

    return await response.json();
};

const diplayPokemonInfo = (data)=>{
    const{
        species: {name}, 
        sprites: {other: {["official-artwork"]: {front_default }}}, 
        types:[{type:{name: typename}}], 
        weight} = data;
    
    card.textContent = "";
    card.style.display = "flex";
    
    const nameDisplay= document.createElement("h1");
    const typeDisplay = document.createElement("p");
    const spriteDisplay = document.createElement("img")
    const weightDisplay= document.createElement("p")
    
    nameDisplay.textContent = name;
    spriteDisplay.src = front_default;
    weightDisplay.textContent =` pokemon weight: ${weight} Kg`;
    typeDisplay.textContent = `Pokemon Type: ${typename}`;
    
    const infoContainer = document.createElement("div");
    infoContainer.classList.add("infoContainer");

    infoContainer.appendChild(typeDisplay);
    infoContainer.appendChild(weightDisplay);

    weightDisplay.classList.add("typeDisplay");
    typeDisplay.classList.add("typeDisplay");
    spriteDisplay.classList.add("spriteDisplay")

    card.appendChild(nameDisplay);
    card.appendChild(spriteDisplay);
    card.appendChild(infoContainer);
};


const displayError = (message) =>{
    const errorDisplay = document.createElement("p");
    errorDisplay.textContent = message;
    errorDisplay.classList.add(".errorDisplay")

    card.textContent = "";
    card.style.display = "flex";
    card.appendChild(errorDisplay);
    
}