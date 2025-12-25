import { useEffect, useState } from 'react';
import TitleCard from '../TitleCard/TitlesCard';
import Tag from '../Tags/Tags';

type Title = {
  id: number;
  title: string;
  tag: string;
  date: string;
};

function TitlesContainer() {
  const [titles, setTitles] = useState<Title[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTitles = async () => {
      try {
        // Fetch from local JSON in public folder
        const response = await fetch("/data/writings.json");
        const data: Title[] = await response.json();

        // helper to safely convert "DD-MM-YYYY" or "DD-MM-YY" -> "YYYY-MM-DD"
        const parseDate = (dateStr: string) => {
          const parts = dateStr.split('-');
          let year = parts[2];
          if (year.length === 2) year = `20${year}`;
          return new Date(`${year}-${parts[1]}-${parts[0]}`);
        };

        // Pin logic + sorting
        const sortedData = data.sort((a, b) => {
          if (a.title === 'My plans. My ambition') return -1;
          if (b.title === 'My plans. My ambition') return 1;
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
        />
      ))}
    </div>
  );
}

export default TitlesContainer;