import './Tags.scss';

type tagProps = {
    label: string;
}

function Tags({label}: tagProps) {
    return <span className={`tags ${label.toLowerCase()}`}>{label}</span>
}

export default Tags;