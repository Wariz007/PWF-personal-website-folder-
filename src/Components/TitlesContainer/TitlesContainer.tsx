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
}

function TitlesContainer() {
    const [titles, setTitles] = useState<Title[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTitles = async () => {
            try {
                const response = await fetch("http://localhost:5000/api/writings");
                const data: Title[] = await response.json();
                setTitles(data);
                setLoading(false);
            } catch(err) {
                console.error('Error fetching titles:', err)
                setLoading(false);
            }
        }
        fetchTitles();
    }, [])

    if (loading) return <p>Loading titles...</p>;

    return (
        <div className='titles-container'>
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
    )
};

export default TitlesContainer;