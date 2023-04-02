import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__wrapper">
          <p className="footer__copyright">
            Copyright &copy; 2023 All rights reserved | This site is developed{' '}
            <a href="https://github.com/IvanBlazhko" target="blank">
              Blazhko Ivan
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
