import { useEffect, useState } from 'react';
import TitleCard from '../TitleCard/TitlesCard';
import Tag from '../Tags/Tags';
import { supabase } from '../../lib/supabase';

type Title = {
  id: string;
  title: string;
  tag: string;
  date: string;
};

function TitlesContainer() {
  const [titles, setTitles] = useState<Title[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTitles = async () => {
      const { data, error } = await supabase
        .from('writings')
        .select('id, title, tag, date, is_pinned')
        .order('is_pinned', { ascending: false })
        .order('date', { ascending: false });

      if (error) {
        console.error('Error fetching titles:', error);
      } else {
        setTitles(data || []);
      }
      setLoading(false);
    };

    fetchTitles();
  }, []);

  if (loading) return <p>Loading titles...</p>;

  return (
    <div className="titles-container">
      {titles.map((title) => (
        <TitleCard
          key={title.id}
          id={title.id}
          title={title.title}
          tag={<Tag label={title.tag} />}
          date={title.date}
        />
      ))}
    </div>
  );
}

export default TitlesContainer;