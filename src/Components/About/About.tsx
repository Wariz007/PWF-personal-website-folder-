import Email from '../../assets/Images/Gmail.png';
import X from '../../Assets/Images/X_logo 1.png';
import Github from '../../Assets/Images/Github icon 1.png';

function About() {
    return (
        <>
            <section className="about-container">
                <h1>Olusanya Olabode <br />Abdulwariz</h1>
                <p>This website is a collection of Wariz thoughts and opinions on how technology, entrepreneurship, and economics can contribute to the prosperity of the Federal Republic of Nigeria.</p>
                <div className='contact-links'>
                    <a href="#"><img src={Email} alt="Email" /></a>
                    <a href="#"><img src={X} alt="Close" /></a>
                    <a href="#"><img src={Github} alt="GitHub" /></a>
                </div>
            </section>
        </>
    )
}

export default About;