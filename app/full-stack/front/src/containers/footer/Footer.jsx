import React from 'react';
import churnLogo from '../../assets/logo.png';
import './footer.css';

const Footer = () => (
  <div className="churn__footer section__padding">
    <div className="churn__footer-links">
      <div className="churn__footer-links_logo">
        <img src={churnLogo} alt="churn_logo" />
        <p>The entire project was made by <br /> Ronie Arauco in 2023 <br /><br/> ronie.arauco@pucp.edu.pe</p>
      </div>
      <div className="churn__footer-links_div">
        <h4>Socials</h4>
        <p><a href="mailto: ronie.arauco@pucp.edu.pe">Email</a></p>
        <p><a href="https://www.linkedin.com/in/ronie-arauco/">LinkedIn</a></p>
        <p><a href="https://github.com/roniepaolo">GitHub</a></p>
      </div>
      <div className="churn__footer-links_div">
        <h4>Other Projects</h4>
        <p><a href="https://github.com/roniepaolo/kafka-platform">Kafka KRaft</a></p>
        <p><a href="https://github.com/roniepaolo/bioinformatic-pipeline">Bioinformatic Pipeline</a></p>
        <p><a href="https://github.com/roniepaolo/operating-room-scheduling-ga">Genetic Algorithms</a></p>
      </div>
    </div>

    <div className="churn__footer-copyright">
      <p>@2023. All rights reserved.</p>
    </div>
  </div>
);

export default Footer;