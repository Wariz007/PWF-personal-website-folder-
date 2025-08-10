import {Routes, Route} from 'react-router-dom';
import Navbar from "./Components/Navbar/Navbar";
import About from "./Components/About/About";
import TitlesContainer from "./Components/TitlesContainer/TitlesContainer";
import FilterPage from '../src/pages/FilterPage/FilterPage';
import FilterByTagsPage from './pages/FilterByTagsPage/FilterByTagsPage';



function Root() {
    return (
        <div>
            <Navbar />

            <Routes>
                {/*Home page*/}
                <Route path="/" element={
                <div className="content-container">
                     <><About /> <TitlesContainer /> </>
                </div>
                } />

                {/*Filter page*/}
                <Route path="/filter" element={<FilterPage />} />
                
                {/*Filter by tags page*/}
                <Route path="/tag/:tag" element={<FilterByTagsPage />} />
            </Routes>


        </div>
    )
}

export default Root;