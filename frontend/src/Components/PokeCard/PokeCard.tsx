import React, { useState } from "react";
import { Recoil, useRecoilValue, useSetRecoilState } from "../../Recoil";
import { Delete } from "../Modal/Delete";
import "./PokeCard.scss";

interface IPokeCard {
  imgUrl?: string;
  id: number;
  /* Pokemon name */
  name: string;
  /* Height of pokemon */
  height: string;
  /* Weight of pokemon */
  weight: string;
  /* Pokemon Abilities */
  abilities: string[];
  /* On details press click */
  onDetails?: () => void;
  /* on delete press click */
  onDelete?: () => void;
}

export const PokeCard: React.FC<IPokeCard> = (props) => {

  const setPokemon = useSetRecoilState(Recoil.Pokemon.Atom)
  const user = useRecoilValue(Recoil.User.Atom);
  const [deleteShow, setDeleteShow] = useState(false);

  return (
    <>
    <Delete show={deleteShow} onClose={() => setDeleteShow(false)} deleteId={props.id} />
    <div className={"pokecard-container"}>
      <div className={"pokecard-image"}>
        <img alt={"pokemon.png"} src={props.imgUrl} className={"pokecard-image"} />
      </div>
      <div className={"pokecard-name"}>
        <p>{props.name}</p>
      </div>
      <div className={"pokecard-body"}>
        <div className={"pokecard-body-row"}>
          <div className={"pokecard-body-row-item"}>Height</div>
          <div className={"pokecard-body-row-value"}>{props.height}</div>
        </div>
        <div className={"pokecard-body-row"}>
          <div className={"pokecard-body-row-item"}>Weight</div>
          <div className={"pokecard-body-row-value"}>{props.weight}</div>
        </div>
        <div className={"pokecard-body-row"}>
          <div className={"pokecard-body-row-item"}>Abilities</div>
          <div className={"pokecard-body-row-value"}>
            {props.abilities.map((ability) => (
              <div className={"pokecard-body-row-value-ability"}>{ability}</div>
            ))}
          </div>
        </div>
      </div>
      <div className={"pokecard-footer"}>
        <button onClick={() => setPokemon({...props})} className="pokecard-footer-detailsbtn">
          <p>See Details</p>
        </button>
        <div className={"pokecard-footer-deletebtn"}>
          <button onClick={user ? () => setDeleteShow(true) : undefined} className={`${user ? 'pokecard-footer-deletebtn-loggedin' : 'pokecard-footer-deletebtn-loggedout' }`}>Delete</button>
        </div>
      </div>
    </div>
    </>
  );
};
