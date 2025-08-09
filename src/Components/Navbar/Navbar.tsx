import Logo from '../../assets/Images/WARIZ LOGO.png';
import BurgerMenu from '../../assets/Images/menu.png';
import Tags from '../Tags/Tags.tsx';

function Navbar() {
    return (
        <nav className='navbar'>
            <img className='logo' width={60} src={Logo} alt="The wariz wordmark logo" />
            <div className='tags-container'>
                <Tags label='Entrepreneurship '/>
                <Tags label='Books'/>
                <Tags label='Technology'/>
            </div>
            <img className='burger-menu' src={BurgerMenu} alt="Menu" />
        </nav>
    )
}
export default Navbar;