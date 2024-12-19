import logo from './logo.svg';
import './App.css';
import Helicopter from "./components/Helicopter/Helicopter";
import {useEffect, useState} from "react";

function App() {
const [position, setPosition] = useState({
    x: 50,
    y: 50,
});
useEffect(() => {
    const fly =(e) =>{
        if (e.key === 'ArrowUp' && position.y > 0){
            setPosition({
                ...position,
                y: position.y - 2,
            })
        }else if(e.key === 'ArrowDown' && position.y < 96){
            setPosition({
                ...position,
                y: position.y + 2,
            })
        }else if(e.key === 'ArrowLeft' && position.x > 0){
            setPosition({
                ...position,
                x: position.x - 2,
            })
        }else if(e.key === 'ArrowRight' && position.x < 98){
            setPosition({
                ...position,
                x: position.x + 2,
            })
        }
    }
    window.addEventListener('keydown', fly)
    return () => {
        window.removeEventListener('keydown', fly)
    }
}, [position])
return (
    <div className="App">
        <Helicopter x={position.x} y={position.y} />
    </div>
  );
}

export default App;
