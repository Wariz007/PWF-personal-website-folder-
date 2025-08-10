import { useParams } from "react-router-dom";
import writings from '../../data/writings.json';
import '../WritingsPage/WritingsPage.scss';
import Tags from '../../Components/Tags/Tags';
import ReactMarkdown from 'react-markdown';  

function WritingsPage() {
    const { id } = useParams<{ id: string }>();
    const writing = writings.find((writing) => writing.id === Number(id));

    return (
        <div className="writing-container">
            {writing ? (
                <>
                    <h1 className="writing-title">{writing.title}</h1>
                    <div className="writing-meta">
                        <span className="writing-date">{writing.date}</span>
                        <Tags label={writing.tag} />
                    </div>
                    <div className="writing-content">
                        <ReactMarkdown>{writing.writing}</ReactMarkdown>
                    </div>
                </>
            ) : (
                <p>Writing not found.</p>
            )}
        </div>
    );
}

export default WritingsPage;