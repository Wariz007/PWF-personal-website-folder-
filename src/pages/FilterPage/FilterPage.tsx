import { useNavigate } from "react-router-dom";

function FilterPage() {
    const navigate = useNavigate();
    const handleTagClick = (Tag: string) => {
        navigate(`/tag/${Tag.toLowerCase()}`);
    }
    return (
        <div className="filter-contents">
            <div className="btns">
                <button onClick={() => handleTagClick('Entrepreneurship')}>Entrepreneurship</button>
                <button onClick={() => handleTagClick('Books')}>Books</button>
                <button onClick={() => handleTagClick('Technology')}>Technology</button>
            </div>
        </div>
    )
}

export default FilterPage;