import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import TitleCard from "../../Components/TitleCard/TitlesCard";
import Tags from "../../Components/Tags/Tags";

interface Writing {
  id: number;
  title: string;
  tag: string;
  date: string;
}

function FilterByTagsPage() {
  const { tag } = useParams<{ tag: string }>();
  const [writings, setWritings] = useState<Writing[]>([]);
  const [loading, setLoading] = useState(true);

  const normalizedTag = tag?.toLowerCase();

  useEffect(() => {
    const fetchWritings = async () => {
      try {
        const response = await fetch("/data/writings.json");
        const data: Writing[] = await response.json();
        setWritings(data);
      } catch (err) {
        console.error("Error fetching writings:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchWritings();
  }, []);

  if (loading) return <p>Loading writings...</p>;

  const filteredWritings = writings.filter(
    (writing) => writing.tag.toLowerCase() === normalizedTag
  );

  return (
    <div className="FilterByTagsPage">
      {filteredWritings.map((writing) => (
        <TitleCard
          key={writing.id}
          id={writing.id}
          title={writing.title}
          date={writing.date}
          tag={<Tags label={writing.tag} />}
        />
      ))}
    </div>
  );
}

export default FilterByTagsPage;