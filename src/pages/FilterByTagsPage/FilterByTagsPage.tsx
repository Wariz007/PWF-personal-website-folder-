import { useEffect, useState } from 'react';
import TitleCard from '../../Components/TitleCard/TitlesCard';
import Tags from '../../Components/Tags/Tags';
import { useParams } from 'react-router-dom';

interface Writing {
  id: number;
  title: string;
  tag: string;
  date: string;
  writing: string;
  uploaded: boolean;
}

function FilterByTagsPage() {
  const { tag } = useParams();
  const [writings, setWritings] = useState<Writing[]>([]);
  const [loading, setLoading] = useState(true);

  const normalizedTag = tag?.toLowerCase();

  useEffect(() => {
    const fetchWritings = async () => {
      try {
        const response = await fetch('https://olusanyaolabodeabdulwariz.com/api/writings');
        const data: Writing[] = await response.json();
        setWritings(data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching writings:", err);
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
          writing={writing.writing}
        />
      ))}
    </div>
  );
}

export default FilterByTagsPage;