type title = {
    id: number;
    title: string;
    tag: React.ReactNode;
    date: string;
    writing?: string;
    full?: boolean; 
}

function Title({ id, title, tag, date, writing, full }: title) {
    const [day, month, year] = date.split("-");

    return (
        <button key={id} className={`title ${id}`}>
            <div className="date">
                <span>{day}</span>
                <span>{month}</span>
                <span>{year}</span>
            </div>
            <h2 className="writing-title">{title}</h2>
            <span>{tag}</span>
            {full && <p style={{ display: 'none' }}>{writing}</p>}
        </button>
    )
}

export default Title;