import React from 'react';
import styled from "styled-components";

const UlList = styled.ul`
text-align: center;
list-style: none;
display: flex;
flex-wrap: wrap;
justify-content: center;
width: 100%;
padding: 0;
`;

const LiElement = styled.li`
background-color: #fff;
width: 200px;
min-width: 150px;
margin: 10px 10px;
padding: 10px;
display: flex;
flex-wrap: wrap;
flex-direction: column;
justify-content: space-between;
border-radius: 5px;
transition: all 0.3s;
cursor: pointer;

&:hover {
    transform: scale(1.1);
    box-shadow: 2px 2px 5px 5px #888888;
}
`;

const Image = styled.div`
width: 70px;
height: 150px;
margin: 0 auto;
background-image: url(${props => props.image});
background-position: center;
background-repeat: no-repeat;
background-size: contain;
`;

const Head = styled.h4`
 color: darkgray;
 margin-bottom: 5px;
 font-size: 15px;
`;

const TagLine = styled.p`
 color: gray;
 margin: 0;
 font-size: 12px;
`;

function BeerList(props) {

    let beerList = props.beerList;

    let liElements = beerList.map((beerObj) => {

        return (
            <LiElement key={beerObj.id} onClick={() => props.toggleDescriptionMethod(beerObj.id)}>
                <Image image={beerObj.image_url} />
                <Head>{beerObj.name}</Head>
                <TagLine>{beerObj.tagline}</TagLine>
            </LiElement>
        );
    })

    return (
        <UlList>
            {liElements}
        </UlList>
    );
}

export default BeerList;