import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import "../WritingsPage/WritingsPage.scss";
import Tags from "../../Components/Tags/Tags";
import ReactMarkdown from "react-markdown";

interface Writing {
  _id: string;       // MongoDB ObjectId
  id: number;        // numeric id
  title: string;
  tag: string;
  date: string;
  uploaded: boolean;
  writing: string;
  image?: string;    // optional, in case no image
}

function WritingsPage() {
  const { id } = useParams<{ id: string }>();
  const [writing, setWriting] = useState<Writing | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:5000/api/writings')
      .then((res) => res.json())
      .then((data: Writing[]) => {
        console.log("Fetched writings:", data);

        // Compare numeric id from URL to database numeric id
        const found = data.find((w) => w.id === Number(id));

        setWriting(found || null);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching writings:", err);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (!writing) return <p>Writing not found.</p>;

  return (
    <div className="writing-container">
      <h1 className="writing-title">{writing.title}</h1>

      <div className="writing-meta">
        <span className="writing-date">{writing.date}</span>
        <Tags label={writing.tag} />
      </div>

      {writing.image && (
        <div className="writing-image">
          <img
            src={`http://localhost:5000/images/${writing.image}`}
            alt={writing.title}
          />
        </div>
      )}

      <div className="writing-content">
        <ReactMarkdown>{writing.writing}</ReactMarkdown>
      </div>
    </div>
  );
}

export default WritingsPage;
