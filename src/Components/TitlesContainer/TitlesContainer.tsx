import { useEffect, useState } from 'react';
import TitleCard from '../TitleCard/TitlesCard';
import Tag from '../Tags/Tags';

type Title = {
  id: number;
  title: string;
  tag: string;
  date: string;
  writing?: string;
  full?: boolean;
  pinned?: boolean; // optional future-proof property
};

function TitlesContainer() {
  const [titles, setTitles] = useState<Title[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTitles = async () => {
      try {
        const response = await fetch("https://pwf-backend-code-production.up.railway.app/api/writings");
        const data: Title[] = await response.json();

        // helper to safely convert "DD-MM-YY" -> "YYYY-MM-DD"
        const parseDate = (dateStr: string) => {
          const [day, month, year] = dateStr.split('-');
          return new Date(`20${year}-${month}-${day}`);
        };

        // Pin logic + sorting
        const sortedData = data.sort((a, b) => {
          // 1️⃣ Always keep "My plans. My ambition" on top
          if (a.title === 'My plans. My ambition') return -1;
          if (b.title === 'My plans. My ambition') return 1;

          // 2️⃣ Sort others by latest date first
          return parseDate(b.date).getTime() - parseDate(a.date).getTime();
        });

        setTitles(sortedData);
      } catch (err) {
        console.error('Error fetching titles:', err);
      } finally {
        setLoading(false);
      }
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
          writing={title.writing}
        />
      ))}
    </div>
  );
}

export default TitlesContainer;
