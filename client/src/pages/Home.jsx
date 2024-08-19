import Homepage from '../assets/homepage.jpg';
import './Home.css'; // Assuming the above CSS is in this file

export default function Home() {
    return (
        <div className="fullscreen-container">
            <div className="navbar">
                {/* Navbar content */}
            </div>
            <img src={Homepage} alt="homepage" className="fullscreen-image" />
        </div>
    );
}
