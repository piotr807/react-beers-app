import React from 'react';
import styled from "styled-components";

const AlsoUl = styled.ul`
 color: gray;
 width: 100%;
 font-size: 15px;
 font-weight: 700;
 list-style-type: none;
 padding: 10px;
 margin: 0;
 display: flex;
 flex-wrap: wrap;
 justify-content: space-around;
 
 @media (max-width: 576px) {
   flex-direction: column;
   align-items: center;
  }
`;

const RandomLi = styled.li`
border: 1px lightgray solid;
width: 150px;
height: 150px;
padding: 5px;
margin: 5px;
border-radius: 5px;
transition: all 0.3s;
cursor: pointer;

&:hover {
    transform: scale(1.1);
    box-shadow: 2px 2px 1px 1px #888888;
}
`;

const ImageRandom = styled.div`
width: 100%;
height: 100%;
background-image: url(${props => props.image});
background-position: center;
background-repeat: no-repeat;
background-size: contain;
`;

function BeerRandom(props) {

    let randomBeers = props.randomBeers;
    let liRandomBeers = randomBeers.map((randomBeer) => <RandomLi key={randomBeer.id} onClick={(event) => { event.stopPropagation(); return props.changeBeerToShowMethod(randomBeer.id); }}><ImageRandom image={randomBeer.image_url} /></RandomLi>)

    return (
        <AlsoUl>
            {liRandomBeers}
        </AlsoUl>
    );
}

export default BeerRandom;