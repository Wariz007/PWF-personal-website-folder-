import { useParams } from "react-router-dom";
import writings from '../../data/writings.json';
import '../WritingsPage/WritingsPage.scss';
import Tags from '../../Components/Tags/Tags';
import ReactMarkdown from 'react-markdown';  

function WritingsPage() {
    const { id } = useParams<{ id: string }>();
    const writing = writings.find((writing) => writing.id === Number(id));

    if (!writing) {
        return <p>Writing not found.</p>;
    }

    return (
        <div className="writing-container">
            <h1 className="writing-title">{writing.title}</h1>

            <div className="writing-meta">
                <span className="writing-date">{writing.date}</span>
                <Tags label={writing.tag} />
            </div>

            {writing.image && (
                <div>
                    <img src={`${import.meta.env.BASE_URL}${writing.image}`} alt={writing.title} />
                </div>
            )}

            <div className="writing-content">
                <ReactMarkdown>{writing.writing}</ReactMarkdown>
            </div>
        </div>
    );
}

export default WritingsPage;
