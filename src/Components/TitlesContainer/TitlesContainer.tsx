import { useEffect, useState } from 'react';
import TitleCard from'../TitleCard/TitlesCard';
import Tag from '../Tags/Tags';

type title = {
    id: number;
    title: string;
    tag: string;
    date: string;
    writing?: string;
    full?: boolean; 
}

function TitlesContainer() {
    const [titles, setTitles] = useState<title[]>([]);

    useEffect(() => {
        const fetchTitles = async () => {
            try {
                const response = await fetch(import.meta.env.BASE_URL + 'writings.json');
                const data = await response.json();
                setTitles(data);
            } catch(err) {
                console.error('Error fetching titles:', err)
            }
        }
        fetchTitles();

    }, [])
    return (
        <div className='titles-container'>
            <>
                {titles.map((title) => (
                    <TitleCard 
                        key={title.id} 
                        id={title.id} 
                        title={title.title} 
                        tag={<Tag label={title.tag} />} 
                        date={title.date} 
                    />
                ))}
            </>
        </div>
    )
};

export default TitlesContainer;