import './style.css'

const Helicopter = ({x, y}) =>{
    return (
        <div className='helicopter' style={
            {
                top: `${y}%`,
                left: `${x}%`,
            }
        }>
                <div className="cockpit"></div>
                <div className="tail"></div>
                <div className="main"></div>
                <div className="rotor">
                    <div className="rotator">
                        <div></div>
                        <div></div>
                    </div>
                </div>
        </div>
)
}

export default Helicopter