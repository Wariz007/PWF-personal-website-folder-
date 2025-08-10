import writings from '../../data/writings.json';
import TitleCard from '../../Components/TitleCard/TitlesCard';
import Tags from '../../Components/Tags/Tags';
import { useParams } from 'react-router-dom';
/*import { useNavigate } from 'react-router-dom';*/


function FilterByTagsPage() {
    const {tag} = useParams();
    const normalizedTag = tag?.toLowerCase();
    const filteredWritings = writings.filter((writing) =>
        writing.tag.toLowerCase() === normalizedTag
    )
    /*const navigate = useNavigate();*/

    return (
        <div className='FilterByTagsPage'>
            {filteredWritings.map((writing) => {
                return (
                    <TitleCard 
                        id={writing.id}
                        key={writing.id}
                        title={writing.title}
                        date={writing.date}
                        tag={<Tags label={writing.tag} />}
                    />
                )
            })}
        </div>
    )
}

export default FilterByTagsPage;