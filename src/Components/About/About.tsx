import Email from '../../assets/Images/Gmail.png';
import X from '../../assets/Images/X_logo 1.png';
import Github from '../../assets/Images/Github icon 1.png';

function About() {
    return (
        <>
            <section className="about-container">
                <h1>Olusanya Olabode <br />Abdulwariz</h1>
                <p>This website is a collection of Wariz thoughts and opinions on how technology, entrepreneurship, and books can contribute to the prosperity of the Federal Republic of Nigeria.</p>
                <div className='contact-links'>
                    <a 
                        href="https://mail.google.com/mail/?view=cm&to=olusanyaolabodeabdulwariz@gmail.com"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <img src={Email} alt="Email" />
                    </a>


                    <a 
                        href="https://x.com/Abdulwariz_"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <img src={X} alt="x formerly known as twitter" /></a>
                    <a 
                        href="https://github.com/Wariz007"
                        target="_blank"
                        rel="noopener noreferrer"
                        >
                        <img src={Github} alt="GitHub" />
                    </a>
                </div>
            </section>
        </>
    )
}

export default About;