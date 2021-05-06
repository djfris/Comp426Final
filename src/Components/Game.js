import React, { Component, useState, useEffect } from 'react';
import { calculateWinner } from '../helpers';
import Board from './Board';
import Weather from './Weather';
import Wrapper from './Layout/Wrapper';
import Main from './Main';

const styles = {
    width: '200px',
    margin: '20px auto',
};




const Game = () => {
    const [history, setHistory] = useState([Array(9).fill(null)]);
    const [stepNumber, setStepNumber] = useState(0);
    const [xIsNext, setXisNext] = useState(true);
    const winner = calculateWinner(history[stepNumber]);   

//////////////////////////////////////////-----GAME-----////////////////////////////////////////////////////////////////////////////////////////////

    const handleClick = i => {
        const timeInHistory = history.slice(0, stepNumber + 1);
        const current = timeInHistory[stepNumber];
        const squares = [...current];
        // If user click an occupied square or if game is won, return
        if (winner || squares[i]) return;
        // Put an X or an O in the clicked square
        squares[i] = xIsNext ? 'X' : 'O';
        setHistory([...timeInHistory, squares]);
        setStepNumber(timeInHistory.length);
        setXisNext(!xIsNext);
    }

    const jumpTo = step => {
        setStepNumber(step);
        setXisNext(step % 2 === 0)
    };

    const renderMoves = () => (
        history.map((_step, move) => {
            const destination = move ? `Go to move#${move}` : 'Go to start';
            return (
                                
                <li key={move}>
                    <button onClick={() => jumpTo(move)}>{destination}</button>
                </li>
            )
        })
    )

    ///////////////////////////////////-----LOCATION-----//////////////////////////////////////////////////////////////////

    function fetchData() {

        const status = document.querySelector('#status');
        const mapLink = document.querySelector('#map-link');

        mapLink.href = '';
        mapLink.textContent = '';

        function success(position) {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            

            status.textContent = '';
            mapLink.href = `https://www.openstreetmap.org/#map=18/${latitude}/${longitude}`;
            mapLink.textContent = `You're current location is: Latitude: ${latitude} °, Longitude: ${longitude} °`;
        }

        function error() {
            status.textContent = 'Unable to retrieve your location';
        }

        if (!navigator.geolocation) {
            status.textContent = 'Geolocation is not supported by your browser';
        } else {
            status.textContent = 'Locating…';
            navigator.geolocation.getCurrentPosition(success, error);
        }

    }

    document.querySelector('#find-me');

/////////////////////////////////////////////------RETURN-----/////////////////////////////////////////////////////////////////////

    return (
        <>
            <Board squares={history[stepNumber]} onClick={handleClick} />
            <div style={styles}>
                <p>{winner ? 'Winner: ' + winner : 'Next Player: ' + (xIsNext ? 'X' : 'O')}</p>
                {renderMoves()}

                <button id="find-me" onClick={fetchData}>Show my location</button><br />
                <p id="status"></p>
                <a id="map-link" target="_blank"></a>
                
                <Wrapper>
                    <Main />
                </Wrapper>
                

            </div>
        </>
    )
}

export default Game;