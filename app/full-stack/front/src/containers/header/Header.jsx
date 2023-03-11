import React from 'react';
import pipeline from '../../assets/pipeline.png';
import './header.css';

const Header = () => (
  <div className="churn__header section__padding" id="home">
    <div className="churn__header-content">
      <h1 className="gradient__text">Machine Learning Streaming</h1>
      <p>This pipeline was developed using Kafka KRaft, Terraform, Ansible and Docker as core tools, with an IaaS approach in AWS</p>
    </div>
    <div className="churn__header-image">
      <img src={pipeline} />
    </div>
  </div>
);

export default Header;