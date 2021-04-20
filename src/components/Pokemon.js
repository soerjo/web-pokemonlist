import { React, useState } from "react";
import mockData from "../mockData";

function Pokemon(props) {
  console.log("isi props:", props);
  const { match } = props;
  const { params } = match;
  const { pokemonId } = params;
  const [pokemon, setPokemon] = useState(mockData[pokemonId]);
  console.log(pokemon);

  const generatePokemon = () => {
    const { name, id, types, height, weight, sprites } = pokemon;
    const { front_default } = sprites;
    types.map((type) => console.log(type.type.name));
    return (
      <div>
        <img src={front_default} style={{ width: "350px", height: "auto" }} />
        <h2>
          {id}. {name.charAt(0).toUpperCase() + name.slice(1)}
        </h2>
        <p>
          {types.map((type) => {
            return `${type.type.name} `;
          })}
        </p>
        <p>
          Height: {height} | Weight: {weight}kg
        </p>
      </div>
    );
  };

  return <div>{generatePokemon()}</div>;
}

export default Pokemon;
