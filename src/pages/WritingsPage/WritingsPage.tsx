import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import "../WritingsPage/WritingsPage.scss";
import Tags from "../../Components/Tags/Tags";
import ReactMarkdown from "react-markdown";
import { supabase } from "../../lib/supabase";

interface Writing {
  id: string;
  title: string;
  tag: string;
  date: string;
  content: string;
  image?: string;
}

function WritingsPage() {
  const { id } = useParams<{ id: string }>();
  const [writing, setWriting] = useState<Writing | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWriting = async () => {
      const { data, error } = await supabase
        .from('writings')
        .select('id, title, tag, date, content, image')
        .eq('id', id)
        .single();

      if (error) {
        console.error('Error fetching writing:', error);
        setWriting(null);
      } else {
        setWriting(data);
      }
      setLoading(false);
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
          <img 
            src={writing.image.startsWith('http') ? writing.image : `/${writing.image}`} 
            alt={writing.title} 
          />
        </div>
      )}

      <div className="writing-content">
        <ReactMarkdown>{writing.content}</ReactMarkdown>
      </div>
    </div>
  );
}

export default WritingsPage;