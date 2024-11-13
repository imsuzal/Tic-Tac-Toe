import React, { useState, useEffect } from 'react';
import './styles.css';

function Square({ value, onClick, isWinningSquare }) {
    return (
        <button
            className={`square ${value === 'X' ? 'x-square' : value === 'O' ? 'o-square' : ''} ${isWinningSquare ? 'winning-square' : ''}`}
            onClick={onClick}
        >
            {value}
        </button>
    );
}

export default function TicTacToe() {
    const [squares, setSquares] = useState(Array(9).fill(''));
    const [isXTurn, setIsXTurn] = useState(true);
    const [status, setStatus] = useState('');
    const [winningPattern, setWinningPattern] = useState([]);

    const winningPatterns = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    function getWinner(squares) {
        for (let pattern of winningPatterns) {
            const [a, b, c] = pattern;
            if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
                setWinningPattern(pattern);
                return squares[a];
            }
        }
        return null;
    }

    function handleClick(index) {
        const cpySquares = [...squares];
        if (getWinner(cpySquares) || cpySquares[index]) return;
        cpySquares[index] = isXTurn ? 'X' : 'O';
        setSquares(cpySquares);
        setIsXTurn(!isXTurn);
    }

    function handleRestart() {
        setIsXTurn(true);
        setSquares(Array(9).fill(''));
        setWinningPattern([]);
        setStatus('');
    }

    useEffect(() => {
        const winner = getWinner(squares);
        if (!winner && squares.every(item => item !== '')) {
            setStatus('This is a draw! Please restart the game');
        } else if (winner) {
            setStatus(`Winner is ${winner}`);
        } else {
            setStatus(`Next player: ${isXTurn ? 'X' : 'O'}`);
        }
    }, [squares, isXTurn, getWinner]); // Add getWinner to dependencies

    return (
        <div className="container pt-5 tic-tac-toe-container">
            <h1>Tic Tac Toe</h1>
            <div className="row slgrid">
                {squares.map((value, index) => (
                    <Square
                        key={index}
                        value={value}
                        onClick={() => handleClick(index)}
                        isWinningSquare={winningPattern.includes(index)}
                    />
                ))}
            </div>
            <h2 className="status">{status}</h2>
            <button onClick={handleRestart}>Restart</button>
        </div>
    );
}
