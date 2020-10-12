import React, { Component } from 'react';
import BeerList from './BeerList';
import BeerDescription from './BeerDescription';

import axios from 'axios';
import styled from "styled-components";

import preloader from '../preloader.gif'

const MainDiv = styled.div`
width: 100%;
min-width: 280px;
background-color: rgb(160, 160, 160);
margin: 0;
padding: 10px;
position: relative;
`;

const Preloader = styled.img`
margin: 0 auto;
width: 150px;
border-radius: 5px;

`;

class Beers extends Component {

    constructor(props) {
        super(props);

        this.config = {
            rootMargin: '0px',
            threshold: 1
        };

        this.observer = new IntersectionObserver(entries => {
            const firstEntry = entries[0];
            if (firstEntry.isIntersecting) {
                this.getMoreBeerData();
            }
        }, this.config);

        this.state = {
            beerList: [],
            showPreLoader: false,
            showDesctipion: false,
            beerToShow: [],
            randomBeers: []
        };
    }

    componentDidMount() {
        this.getBeerData();
    }

    observeFun = () => {
        let target = document.querySelector('ul li:last-child');
        if (this.state.beerList.length !== 0) {
            this.observer.observe(target);
        };
    }

    toggleDescription = (beerId) => {
        if (this.state.showDesctipion) {
            this.setState(() => {

                return ({
                    showDesctipion: false
                });
            });
        }

        else {
            this.setState((prevstate) => {
                let newBeerToShow = prevstate.beerList.filter((beerObj) => beerObj.id === beerId);

                return ({
                    beerToShow: newBeerToShow,
                    showDesctipion: true
                });
            });
            this.getRandomBeers();
        }
    }

    changeBeerToShow = (beerId) => {
        this.setState((prevstate) => {
            let newBeerToShow = prevstate.beerList.filter((beerObj) => beerObj.id === beerId);

            return ({
                beerToShow: newBeerToShow
            });
        });
        this.getRandomBeers();
    }

    getRandomBeers = () => {
        this.setState((prevstate) => {
            let newRandomBeers = [];

            while (newRandomBeers.length < 3) {
                let randomBeer = prevstate.beerList[Math.floor(Math.random() * prevstate.beerList.length)];
                let canCon = true;

                newRandomBeers.forEach((randomObj) => {
                    if (randomObj.id === randomBeer.id) {
                        canCon = false;
                    };
                });
                if (canCon) {
                    newRandomBeers = newRandomBeers.concat(randomBeer);
                };
            };

            return ({
                randomBeers: newRandomBeers
            });
        });
    }

    getBeerData = () => {

        this.observer.disconnect();

        this.setState(() => {

            return ({
                showPreLoader: true
            });
        })

        axios.get('https://api.punkapi.com/v2/beers?page=1&per_page=20')
            .then(res => {
                this.setState(() => {
                    let newBeerList = [];
                    newBeerList = res.data;

                    return ({

                        beerList: newBeerList,
                        showPreLoader: false
                    });
                });
                this.observeFun();
            });

    }

    getMoreBeerData = () => {

        this.observer.disconnect();

        this.setState(() => {

            return ({
                showPreLoader: true
            });
        })

        let pageNum = this.state.beerList.length / 10 + 1;

        axios.get(`https://api.punkapi.com/v2/beers?page=${pageNum}&per_page=10`)
            .then(res => {
                this.setState((prevstate) => {
                    let newBeerList = [];
                    newBeerList = res.data;

                    return ({

                        beerList: prevstate.beerList.concat(newBeerList),
                        showPreLoader: false
                    });
                });
                this.observeFun();
            });

    }


    render() {
        return (
            <MainDiv>
                <BeerList beerList={this.state.beerList} toggleDescriptionMethod={this.toggleDescription} />
                {this.state.showPreLoader ? <Preloader src={preloader} alt="preloader" /> : null}
                {this.state.showDesctipion ? <BeerDescription toggleDescriptionMethod={this.toggleDescription} beerToShow={this.state.beerToShow} randomBeers={this.state.randomBeers} changeBeerToShowMethod={this.changeBeerToShow} /> : null}

            </MainDiv>
        );
    }
}

export default Beers;