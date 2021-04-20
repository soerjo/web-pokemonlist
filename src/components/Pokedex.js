import {
  AppBar,
  Toolbar,
  Grid,
  makeStyles,
  Card,
  CardContent,
  CircularProgress,
  CardMedia,
  Typography,
} from "@material-ui/core";
import mockData from "../mockData";
import { React, useState, useEffect } from "react";
import axios from "axios";

const useStyles = makeStyles({
  pokedexContainer: {
    paddingTop: "20px",
    paddingLeft: "50px",
    paddingRight: "50px",
  },
  cardMedia: {
    margin: "auto",
    height: "150px",
    width: "150px",
  },
  cardContent: {
    textAlign: "center",
  },
});

function Pokedex(props) {
  const { history } = props;
  const classes = useStyles();
  const [pokemonData, setPokemonData] = useState(mockData);

  console.log("isi pokemonData:", pokemonData);
  useEffect(() => {
    axios
      .get("https://pokeapi.co/api/v2/pokemon?limit=807")
      .then((response) => {
        const { data } = response;
        const { results } = data;
        const newPokemonData = {};
        console.log(data);
        // results.forEach((pokemon,index) => {
        //   newPokemonData[index+1]={
        //       id: index+1,
        //       name: pokemon.name,
        //       url: pokemon.url
        //       sprite:
        //   }
        // });
      });
  }, []);

  const getPokemonCard = (pokemonId) => {
    console.log(pokemonData[pokemonId]);
    const { id, name, sprites } = pokemonData[pokemonId];
    const sprite = sprites.front_default;

    return (
      <Grid key={pokemonId} item xs={12} sm={4}>
        <Card onClick={() => history.push(`/${id}`)}>
          <CardMedia className={classes.cardMedia} image={sprite} />
          <CardContent className={classes.cardContent}>
            <Typography>
              {`${id}. ${name.charAt(0).toUpperCase() + name.slice(1)}`}
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    );
  };

  return (
    <>
      <AppBar position="static">
        <Toolbar />
      </AppBar>
      {pokemonData ? (
        <Grid className={classes.pokedexContainer} container spacing={2}>
          {Object.keys(pokemonData).map((pokemon) => getPokemonCard(pokemon))}
        </Grid>
      ) : (
        <CircularProgress />
      )}
    </>
  );
}

export default Pokedex;
