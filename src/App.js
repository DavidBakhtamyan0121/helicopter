import './App.css';
import Helicopter from "./components/Helicopter/Helicopter";
import { useEffect, useState } from "react";
import useSound from "use-sound";

function App() {
    const [showResults, setShowResults] = useState(false);
    const [playSound] = useSound('/assets/collect.mp3');
    const [time, setTime] = useState(0);
    const [score, setScore] = useState(0);
    const [score1, setScore1] = useState(0);
    const [position1, setPosition1] = useState({
        x: 0,
        y: 0,
        orientation: 'left',
    });
    const [position, setPosition] = useState({
        x: 50,
        y: 50,
        orientation: 'left',
    });
    const [points, setPoints] = useState(
        Array(5).fill(null).map(() => ({
            id: Date.now() + Math.random(),
            x: Math.floor(Math.random() * 47) * 2,
            y: Math.floor(Math.random() * 47) * 2,
            value: 1,
        }))
    );

    const timeFormating = (ms) => {
        const minutes = Math.floor(ms / 60000);
        const seconds = Math.floor((ms % 60000) / 1000);
        return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    };

    const isCollecting = () => {
        for (let i = 0; i < points.length; i++) {
            if (points[i].x === position.x && points[i].y === position.y) {
                setScore(score + points[i].value);
                setPoints(points.filter((el) => el.id !== points[i].id));
                playSound();
                break;
            }
        }
    };

    useEffect(() => {
        const fly = (e) => {
            if (e.key === 'ArrowUp' && position.y > 0) {
                setPosition({ ...position, y: position.y - 2 });
            } else if (e.key === 'ArrowDown' && position.y < 96) {
                setPosition({ ...position, y: position.y + 2 });
            } else if (e.key === 'ArrowLeft' && position.x > 0) {
                setPosition({ ...position, x: position.x - 2, orientation: 'left' });
            } else if (e.key === 'ArrowRight' && position.x < 98) {
                setPosition({ ...position, x: position.x + 2, orientation: 'right' });
            }
        };
        isCollecting();
        window.addEventListener('keydown', fly);
        return () => window.removeEventListener('keydown', fly);
    }, [position]);
    useEffect(() => {
        const intervalId = setInterval(() => {
            if (points.length > 0) {
                for (let i = 0; i < points.length; i++) {
                    if (points[i].y < position1.y) {
                        setPosition1({ ...position1, y: position1.y - 2 });
                    } else if (points[i].y > position1.y) {
                        setPosition1({ ...position1, y: position1.y + 2 });
                    }
                    if (points[i].x < position1.x) {
                        setPosition1({ ...position1, x: position1.x - 2, orientation: 'left' });
                    } else if (points[i].x > position1.x) {
                        setPosition1({ ...position1, x: position1.x + 2, orientation: 'right' });
                    }
                    if (points[i].y === position1.y && points[i].x === position1.x) {
                        playSound();
                        setPoints(points.filter((el) => el.id !== points[i].id));
                        setScore1((prev) => prev + points[i].value);
                    }
                }
                setTime((prev) => prev + 50);
            }
        }, 50);

        if (!points.length) {
            clearInterval(intervalId);
            setShowResults(true);
            const bestTime = localStorage.getItem('BestTime');
            if (score1 < score && (!bestTime || bestTime > time)) {
                localStorage.setItem('BestTime', `${time}`);
            }
        }

        return () => clearInterval(intervalId);
    }, [position1, points]);

    return (
        <div className={'Container'}>
            <div className='score'>
                <p>Your score: {score}</p>
                <p>Opponent`s score: {score1}</p>
            </div>
            <div className="App">
                <Helicopter x={position.x} y={position.y} orientation={position.orientation}/>
                <Helicopter x={position1.x} y={position1.y} orientation={position1.orientation} color="red"/>
                {points.map((point, i) => (
                    <div key={point.id} style={{top: `${point.y}%`, left: `${point.x}%`}} className="Point">
                        {point.value}+
                    </div>
                ))}
            </div>
            {showResults && (
                <div className={'Portal'}>
                    <div className="PortalContent">
                        <h1>{score > score1 ? 'YOU WIN!' : "YOU LOSE"}</h1>
                        <h3>Your Score: {score}</h3>
                        <h3>Opponent`s Score: {score1}</h3>
                        <h4>Time: {timeFormating(time)}</h4>
                        <h4>Best Time: {timeFormating(localStorage.getItem("BestTime"))}</h4>
                        <button onClick={() => window.location.reload()}>Play again</button>
                    </div>
                </div>
            )}

        </div>

    );
}

export default App;
