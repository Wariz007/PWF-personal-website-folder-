import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import TitleCard from "../../Components/TitleCard/TitlesCard";
import Tags from "../../Components/Tags/Tags";
import { supabase } from "../../lib/supabase";

interface Writing {
  id: string;
  title: string;
  tag: string;
  date: string;
}

function FilterByTagsPage() {
  const { tag } = useParams<{ tag: string }>();
  const [writings, setWritings] = useState<Writing[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWritings = async () => {
      const { data, error } = await supabase
        .from('writings')
        .select('id, title, tag, date')
        .ilike('tag', tag || '')
        .order('date', { ascending: false });

      if (error) {
        console.error('Error fetching writings:', error);
      } else {
        setWritings(data || []);
      }
      setLoading(false);
    };

    fetchWritings();
  }, [tag]);

  if (loading) return <p>Loading writings...</p>;

  return (
    <div className="FilterByTagsPage">
      {writings.map((writing) => (
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