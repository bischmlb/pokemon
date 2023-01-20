/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
import "./App.scss";
import { DetailsPage, Header, Modal, PokeCard, WithPageControls } from "./Components";
import { IPokemon } from "./Interfaces/IPokemon";
import { fetchApi } from "./utils";
import { Recoil, useRecoilValue } from './Recoil'




const App = (): JSX.Element => {
  const [pokemons, setPokemons] = useState<IPokemon[][]>();
  const page = useRecoilValue(Recoil.Page.Atom);
  const pokemonSelected = useRecoilValue(Recoil.Pokemon.Atom);
  const results = useRecoilValue(Recoil.Results.Atom);
  const darkmode = useRecoilValue(Recoil.DarkMode.Atom)

  useEffect(() => {
    fetchApi<IPokemon[][]>(`http://localhost:3001/pokemons/${results}`)
      .then((res) => setPokemons(res))}, [results])

  /* Playground for now */
  return (
  <div className="App" style={{background: darkmode ? '#102a43' : 'inherit', color: darkmode ? 'white' : 'inherit'}}>
    <Header />
    {pokemonSelected ? 
        <DetailsPage/> 
        :
        <WithPageControls maxPageCount={pokemons?.length}>
          {pokemons ?
          <div className={'app-body'}>
              {pokemons?.[page-1].map((pokemon) => <PokeCard {...pokemon}   />)}
          </div>
          :
          <></>
          }
        </WithPageControls>
    }
  </div>
  )
}

export default App;
