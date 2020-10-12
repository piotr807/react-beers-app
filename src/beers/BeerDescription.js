import React from 'react';
import styled from "styled-components";

import BeerRandom from './BeerRandom';

const Container = styled.div`
position: absolute;
top: 0;
left: 0;
width: 100%;
height: 100%;
background-color: rgba(220, 220, 220, 0.8);
`;

const BeerContainer = styled.div`
max-width: 600px;
min-width: 280px;
height: 700px;
background-color: #fff;
border-radius: 5px;
padding: 10px;
position: fixed;
left: 0;
right: 0;
margin-left: auto;
margin-right: auto;
top: 50%; 
margin-top: -350px;
text-align: left;
display: flex;
flex-wrap: wrap;
align-items: center;
overflow-y: auto;

@media (max-width: 576px) {
    text-align: center;
  }
`;

const Image = styled.div`
width: 200px;
height: 280px;
margin: 0 auto;
background-image: url(${props => props.image});
background-position: center;
background-repeat: no-repeat;
background-size: contain;

@media (max-width: 576px) {
    width: 100%;
  }
`;

const DescriptionContainer = styled.div`
max-width: 300px;
margin-left: 10px;

@media (max-width: 576px) {
    margin: 0 auto;
    width: 100%;
  }
`;

const Head = styled.h4`
 color: darkgray;
 margin-bottom: 5px;
 font-size: 20px;
`;

const TagLine = styled.p`
 color: gray;
 font-size: 17px;
`;

const Line = styled.hr`
 width: 30%;
 margin-left: 0;
 border: none;
 border-top:2px gray solid;
 
 @media (max-width: 576px) {
    margin-left: auto;
    margin-right: auto;
  }

`;

const Params = styled.p`
 color: gray;
 font-size: 15px;
 font-weight: 700;
 }
`;

const ParamsSpan = styled.span`
 font-weight: 400;
 margin-right: 20px;
`;

const Description = styled.p`
 color: gray;
 font-size: 14px;
 font-weight: 400;
`;

const BestWith = styled.p`
 color: gray;
 font-size: 15px;
 font-weight: 700;
 }
`;

const BestWithUl = styled.ul`
 color: gray;
 font-size: 15px;
 font-weight: 700;
 list-style-type: none;
 padding: 0;
 }
`;

const BestWithLi = styled.li`
 font-weight: 400;
`;

const AlsoPar = styled.p`
 color: gray;
 font-size: 15px;
 font-weight: 700;
 width: 100%;
 margin: 0;
 margin-left: 20px;
 }
`;

function BeerDescription(props) {

  let beerDescription = props.beerToShow[0];
  let liBestWith = beerDescription.food_pairing.map((bestWithObj) => <BestWithLi key={bestWithObj}>- {bestWithObj}</BestWithLi>)

  return (
    <Container onClick={() => props.toggleDescriptionMethod()}>
      <BeerContainer>
        <Image image={beerDescription.image_url} />
        <DescriptionContainer>
          <Head>{beerDescription.name}</Head>
          <TagLine>{beerDescription.tagline}</TagLine>
          <Line></Line>
          <Params>IBU: <ParamsSpan>{beerDescription.ibu}</ParamsSpan> ABV: <ParamsSpan>{beerDescription.abv}%</ParamsSpan> EBC: <ParamsSpan>{beerDescription.ebc}</ParamsSpan></Params>
          <Description>{beerDescription.description}</Description>
          <BestWith>Best served with:</BestWith>
          <BestWithUl>
            {liBestWith}
          </BestWithUl>
        </DescriptionContainer>
        <AlsoPar>You may also like:</AlsoPar>
        <BeerRandom changeBeerToShowMethod={props.changeBeerToShowMethod} randomBeers={props.randomBeers} />
      </BeerContainer>
    </Container>
  );
}

export default BeerDescription;