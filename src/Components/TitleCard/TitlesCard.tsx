import { useNavigate } from "react-router-dom";

type TitleProps = {
    id: string;
    title: string;
    tag: React.ReactNode;
    date: string;
};

function TitleCard({ id, title, tag, date }: TitleProps) {
    const [year, month, day] = date.split("-");
    const navigate = useNavigate();

    return (
        <button
            key={id}
            className={`title`}
            onClick={() => navigate(`/writings/${id}`)}
        >
            <div className="date">
                <span>{day}</span>
                <span>{month}</span>
                <span>{year}</span>
            </div>
            <h2 className="writing-title">{title}</h2>
            <span>{tag}</span>
        </button>
    );
}

export default TitleCard;