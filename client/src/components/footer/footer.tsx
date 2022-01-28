import './footer.css';
import githubIcon from '../../assets/icons/github-icon.svg';
const Footer = () => {
    return (
        <footer className="footer">
            <ul className='footer-info__list'>
                <li className='footer-info__item'>Developer: Andrew Makarevich</li>
                <li className='footer-info__item'>2022</li>
                <li className='footer-info__item'><a href='https://github.com/AndrewMakarevich/InstinctoolsTestTask'><img alt='git hub icon' src={githubIcon} /></a></li>
            </ul>
        </footer>
    )
};
export default Footer;