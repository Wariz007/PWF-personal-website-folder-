import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

import Logo from '../../assets/Images/WARIZ LOGO.png';
import BurgerMenu from '../../assets/Images/menu.png';
import Tags from '../Tags/Tags.tsx';

function Navbar() {
    const navigate = useNavigate();
    const handleTagClick = (tag: string) => {
        navigate(`/tag/${tag.toLowerCase()}`);
    }

    return (
        <nav className='navbar'>
            <Link to="/">
                <img className='logo' width={60} src={Logo} alt="The wariz wordmark logo" />
            </Link>
            <div className='tags-container'>
                <button onClick={() => handleTagClick('Entrepreneurship')} className='btns'><Tags label='Entrepreneurship '/></button>
                <button onClick={() => handleTagClick('Books')} className='btns'><Tags label='Books'/></button>
                <button onClick={() => handleTagClick('Technology')} className='btns'><Tags label='Technology'/></button>
            </div>
            <Link to='/filter'>
                <img className='burger-menu' src={BurgerMenu} alt="Menu" />
            </Link>
        </nav>
    )
}
export default Navbar;