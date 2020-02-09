import * as React from "react";
import "./style.css";
import {
    BrowserRouter as Router,
    Link,
  } from "react-router-dom";

type Character = {
    id: number;
    name: string;
    image: string;
  };

export type CharacterDivProps = {
    characterProps: Character
  };
  
const CharacterDiv: React.FC<CharacterDivProps> = props => {
    return (
    <Link
    to={`/character/${props.characterProps.id}`}
    className="linkWithoutTextDecoration"
    >
    <div key={props.characterProps.id} className="charactersContainer">
        <img
        className="imgStyle"
        src={props.characterProps.image}
        alt="No image"
        width="40"
        height="40"
        />
        <span className="spanStyle">{props.characterProps.name}</span>
    </div>
    </Link>
);
};
export default CharacterDiv;