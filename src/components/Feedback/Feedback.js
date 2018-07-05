import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Feedback.css';
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
  Grid
} from 'react-bootstrap';
import * as FontAwesome from 'react-icons/lib/fa';

class Feedback extends React.Component {
  render() {
    return (
      <div className={s.root}>
        <div className={s.container}>
          <div className={s.feedbackContainer}>
          <Grid fluid>
          <Row className={s.feedbackRow}>
            <Col xs={12} sm={4} md={4} lg={4}  className={s.feedbackBox}>
                <div className={s.feedbackIcon}>
                  <FontAwesome.FaBolt />
                </div>

                <div className={s.feedbackContent}>
                  <label className={s.landingLabel}>Simple and Easy Steps</label>
                  <label className={s.landingCaption}>Nothing is worse than time being wasted, we provide quick steps for landlords when they are listing their property and save students plenty of time when are finding their perfect home </label>
                </div>
            </Col>

             <Col xs={12} sm={4} md={4} lg={4} className={s.feedbackBox}>
                <div className={s.feedbackIcon}>
                  <FontAwesome.FaHome />
                </div>
                <div className={s.feedbackContent}>
                  <label className={s.landingLabel}>Earn from your home</label>
                  <label className={s.landingCaption}>listing your property only opens opportunities for extra income, we guarantee a deposit and tenant in your home!</label>
                </div>
            </Col>

            <Col xs={12} sm={4} md={4} lg={4} className={s.feedbackBox}>
                <div className={s.feedbackIcon}>
                  <FontAwesome.FaShield/>
                </div>
                <div className={s.feedbackContent}>
                  <label className={s.landingLabel}>  Verified Community</label>
                  <label className={s.landingCaption}>Our aim is to create a trustworthy community for both of our users. It is at our best interest to provide a safe stay for our students, whilst providing our landlords peace of mind during this process..</label>
                </div>
            </Col>
          </Row>
          </Grid>
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(s)(Feedback);
