import React from 'react';
import Reveal from 'react-reveal';

export default ({title}) => {
    return (
        <section id="partners">
            <div className="container">
                {title}
                <Reveal effect="animated fadeInLeft">
                    <div>
                        <ul className="partner-links">
                            <li>
                                <a
                                    href="http://www.butterflyworks.org/"
                                    target="_blank"
                                    title="Butterfly Works">
                                    <img
                                        src={require('../../../assets/images/partners/butterfly-works-logo.png').default}
                                    />
                                </a>
                            </li>
                            <li>
                                <a
                                    href="https://www.dioraphte.nl/en/"
                                    target="_blank"
                                    title="Dioraphte">
                                    <img
                                        src={require('../../../assets/images/partners/dioraphte.jpg').default}
                                    />
                                </a>
                            </li>
                            <li>
                                <a
                                    href="https://www.oxfam.org/"
                                    target="_blank"
                                    title="Oxfam">
                                    <img
                                        src={require('../../../assets/images/partners/oxfam.png').default}
                                    />
                                </a>
                            </li>
                            <li>
                                <a
                                    href="http://www.doen.nl/about-doen/general.htm"
                                    target="_blank"
                                    title="the DOEN Foundation">
                                    <img
                                        src={require('../../../assets/images/partners/DOEN.gif').default}
                                    />
                                </a>
                            </li>
                            <li>
                                <a
                                    href="https://www.edukans.nl/"
                                    target="_blank"
                                    title="Edukans">
                                    <img
                                        src={require('../../../assets/images/partners/edukans.jpg').default}
                                    />
                                </a>
                            </li>
                            <li>
                                <a
                                    href="https://www.triodos.com/"
                                    target="_blank"
                                    title="Triodos Bank">
                                    <img
                                        src={require('../../../assets/images/partners/triodos-bank.png').default}
                                    />
                                </a>
                            </li>
                        </ul>
                    </div>
                </Reveal>
            </div>
        </section>
    );
}
