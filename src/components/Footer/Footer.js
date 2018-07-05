import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';

import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Footer.css';

import {
  Navbar,
  Nav,
  NavItem,
  NavDropdown,
  MenuItem,
  Row,
  Col,
  FormGroup,
  ControlLabel,
  Grid,
  FormControl,
} from 'react-bootstrap';
import cx from 'classnames';
import * as FontAwesome from 'react-icons/lib/fa';

// Component
import LanguageSwitcher from '../LanguageSwitcher';
import CurrencySwitcher from '../CurrencySwitcher';
import Link from '../Link';

// Locale
import messages from '../../locale/messages';

class Footer extends React.Component {

  static propTypes = {
    siteName: PropTypes.string.isRequired,
    facebook: PropTypes.string,
    twitter: PropTypes.string,
    instagram: PropTypes.string,
    formatMessage: PropTypes.func,
  };

  render() {
    const { siteName, facebook, twitter, instagram } = this.props;
    return (
      <div className={s.root}>
        <div className={s.container}>
          <div className={cx(s.footerSectionContainer, 'hidden-print')}>
            <Grid fluid>
              <Row>
                <Col xs={12} sm={3} md={2} lg={2} className={cx(s.dropDownSection)}>
                  <CurrencySwitcher />
                  <LanguageSwitcher />
                </Col>

                <Col sm={3} mdOffset={1} md={2} lgOffset={1} lg={2} xsHidden className={cx(s.noPadding)}>
                  <label className={s.landingLabel}>StudentDome</label>
                  <ul className={s.listContainer}>
                    <li>
                      <Link to={'/about'} className={s.textLink} >
                        <FormattedMessage {...messages.about} />
                      </Link>
                    </li>
                    <li>
                      <Link to={'/about'} className={s.textLink} >
                      List Your Prop
                      </Link>
                    </li><li>
                      <Link to={'/about'} className={s.textLink} >
                        Blogs
                      </Link>
                    </li>
                    </li><li>
                      <Link to={'/about'} className={s.textLink} >
                        Company Details
                      </Link>
                    </li>
                    <li>
                      <Link to={'/how-we-work'} className={s.textLink} >
                        <FormattedMessage {...messages.howWeWork} />
                      </Link>
                    </li>
                  </ul>
                </Col>


                <Col sm={3} mdOffset={1} md={2} lgOffset={1} lg={2} xsHidden className={cx(s.noPadding)}>
                  <label className={s.landingLabel}>
                    Help
                  </label>
                  <ul className={s.listContainer}>
                    <li>
                      <Link to={'/whyhost'} className={s.textLink} >
                        Make an Enquiry
                      </Link>
                    </li>
                    <li>
                      <Link to={'/hospitality'} className={s.textLink} >
                      Terms and Conditions
                      </Link>
                    </li>
                    <li>
                      <Link to={'/policies'} className={s.textLink} >
                        <FormattedMessage {...messages.policies} />
                      </Link>
                    </li>
                  </ul>
                </Col>



                <Col sm={3} mdOffset={1} md={2} lgOffset={1} lg={2} xsHidden className={cx(s.noPadding)}>
                  <ul className={s.listContainer}>
                    <li>
                    Registered Company:10889174
                    </li>
                    <li>
                    Student Dome Ltd, 20-22
                    </li>
                    <li>
                      Wenlock Road, N1 7GU.
                    </li>
                  </ul>
                </Col>

              </Row>

              <Row className={s.copyrightSection}>
                <hr className={s.horizontalLineThrough} />

                <Col xs={6} sm={4} md={4} lg={4} className={s.noPadding}>
                  <span className={s.text}>© {siteName}.</span>
                </Col>
                <Col xs={6} sm={8} md={8} lg={8} className={s.noPadding}>

                  {
                instagram && <a href={instagram} target="_blank" className={cx(s.shareIcon, s.xsHidden)}>
                  <FontAwesome.FaInstagram />
                </a>
              }
                  {
                twitter && <a href={twitter} target="_blank" className={cx(s.shareIcon, s.xsHidden)}>
                  <FontAwesome.FaTwitter />
                </a>
              }
                  {
                facebook && <a href={facebook} target="_blank" className={cx(s.shareIcon, s.xsHidden)}>
                  <FontAwesome.FaFacebook />
                </a>
              }
                </Col>
              </Row>
            </Grid>
          </div>
        </div>
      </div>

    );
  }
}


const mapState = state => ({
  
  facebook: state.siteSettings.data.facebookLink,
  twitter: state.siteSettings.data.twitterLink,
  instagram: state.siteSettings.data.instagramLink,
});

const mapDispatch = {
};

export default withStyles(s)(connect(mapState, mapDispatch)(Footer));
