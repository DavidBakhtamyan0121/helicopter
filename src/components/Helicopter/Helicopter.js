import './style.css'

const Helicopter = ({x, y, orientation, color= '#44d2fd'}) =>{
    return (
        <div className='helicopter' style={
            {
                top: `${y}%`,
                left: `${x}%`,
                transform: orientation === 'right' ? 'scaleX(-1)' : 'scaleX(1)',
            }
        }>
                <div className="cockpit" style={{backgroundColor: color}}></div>
                <div className="tail" style={{borderLeft: `35px solid ${color}`}}></div>
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