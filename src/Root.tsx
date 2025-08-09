import Navbar from "./Components/Navbar/Navbar";
import About from "./Components/About/About";

function Root() {
    return (
        <div>
            <Navbar />

            <div className="content-container">
                <About />
            </div>
        </div>
    )
}

export default Root;