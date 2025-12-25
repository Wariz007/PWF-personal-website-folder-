import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import "../WritingsPage/WritingsPage.scss";
import Tags from "../../Components/Tags/Tags";
import ReactMarkdown from "react-markdown";

interface Writing {
  id: number;        // numeric id
  title: string;
  tag: string;
  date: string;
  writing: string;
  image?: string;    // optional
}

function WritingsPage() {
  const { id } = useParams<{ id: string }>();
  const [writing, setWriting] = useState<Writing | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWriting = async () => {
      try {
        const response = await fetch("/data/writings.json");
        const data: Writing[] = await response.json();

        // Find the writing that matches the numeric id from the URL
        const found = data.find((w) => w.id === Number(id));

        setWriting(found || null);
      } catch (err) {
        console.error("Error fetching writings:", err);
        setWriting(null);
      } finally {
        setLoading(false);
      }
    };

    fetchWriting();
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
          <img src={writing.image} alt={writing.title} />
        </div>
      )}

      <div className="writing-content">
        <ReactMarkdown>{writing.writing}</ReactMarkdown>
      </div>
    </div>
  );
}

export default WritingsPage;