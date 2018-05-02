
import React from 'react';
import PropTypes from 'prop-types';
// Redux
import { connect } from 'react-redux';

// Translation
import { FormattedMessage, injectIntl } from 'react-intl';

import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './SearchForm.css';

import {
        Button, 
        Form, 
        Grid,
        Row, FormGroup,
        Col,
        ControlLabel,
        FormControl,
        FieldGroup,
        Panel,
} from 'react-bootstrap';
import cx from 'classnames';
import * as FontAwesome from 'react-icons/lib/fa';

// History
import history from '../../../core/history';

// Components
import DateRange from '../DateRange';
import PlaceGeoSuggest from '../PlaceGeoSuggest';
import MobileDateRange from '../MobileDateRange';

// Redux Action
import { getSpecificSettings } from '../../../actions/getSpecificSettings';
import { setPersonalizedValues } from '../../../actions/personalized';

// Helper
import detectMobileBrowsers from '../../../helpers/detectMobileBrowsers';

// Locale
import messages from '../../../locale/messages';


class SearchForm extends React.Component {
  static propTypes = {
    setPersonalizedValues: PropTypes.func.isRequired,
    getSpecificSettings: PropTypes.func.isRequired,
    personalized: PropTypes.shape({
      location: PropTypes.string,
      lat: PropTypes.number,
      lng: PropTypes.number,
      chosen: PropTypes.number,
      startDate: PropTypes.string,
      endDate: PropTypes.string,
      personCapacity: PropTypes.number,
      formatMessage: PropTypes.func,
    }),
    settingsData: PropTypes.shape({
      listSettings: PropTypes.array.isRequired
    }).isRequired
  };

  static defaultProps = {
    personalized: {
      location: null,
      lat: null,
      lng: null,
      startDate: null,
      endDate: null,
      personCapacity: null,
      chosen: null
    },
    settingsData: {
      listSettings: []
    }
  };

  constructor(props){
    super(props);
    this.state = {
      mobileDevice: false
    }
    this.handleClick = this.handleClick.bind(this);
  }

  componentWillMount(){
    const { getSpecificSettings } = this.props;
    // Get PersonCapacity Settings Data
    //getSpecificSettings(2);
    if(detectMobileBrowsers.isMobile() === true){
      this.setState({ mobileDevice: true });
    }

  }


  handleClick () {

    const { personalized } = this.props;
    let updatedURI, uri = '/s?';

    if(personalized.chosen != null){
      uri = uri + '&address=' + personalized.location + '&chosen=' + personalized.chosen;
    } else {
      if(personalized.location != null){
        uri = uri + '&address=' + personalized.location;
      }
    }

    if(personalized.startDate != null && personalized.endDate != null) {
      uri = uri + '&startDate=' + personalized.startDate + '&endDate=' + personalized.endDate;
    }  

    if(personalized.personCapacity != null && !isNaN(personalized.personCapacity))  {
      uri = uri + '&guests=' + personalized.personCapacity;
    }
    
    updatedURI = encodeURI(uri);
    history.push(updatedURI);
  }

  render() {
    
    const { location, dates, settingsData, setPersonalizedValues, personalized } = this.props;
    const { formatMessage } = this.props.intl;
    let rows = [];                                                                                                                                                                      const isBrowser = typeof window !== 'undefined';
    for (let i= 1; i <= 16; i++) {
      rows.push(<option value={i} key={i}>{i} {i>1 ? 'guests' : 'guest'}</option>);
    }
                                                                                                                                                                          const smallDevice = isBrowser ? window.matchMedia('(max-width: 640px)').matches : undefined;
    
    return (
      <Grid fluid>
        <Row>
          <Col xs={12} sm={12} md={12} lg={12}>
            <form>
            <div className={cx(s.searchFormInputs, 'homeSearchForm')}>  
            <div className={s.searchForm}>
            <div className={cx(s.table)}>
              <div className={cx(s.tableRow)}>
                <div className={cx(s.tableCell, s.location)}>
                  <label className={s.label}>
                    <span> <FormattedMessage {...messages.where} /></span>
                  </label>
                  <PlaceGeoSuggest 
                    label={formatMessage(messages.homeWhere)}
                    className={cx(s.formControlInput, s.input)}
                    containerClassName={s.geoSuggestContainer}
                  />
                </div>
                <div className={cx(s.tableCell, s.dates)}>
                  <label className={s.label}>
                    <span> <FormattedMessage {...messages.when} /></span>
                  </label>
                  <span className={cx('homeDate' ,s.formControlInput, s.input)}>
                    {
                      !smallDevice && <DateRange 
                        formName={'SearchForm'} 
                        numberOfMonths={2}
                      />
                    }

                    {
                      smallDevice && <MobileDateRange 
                        formName={'SearchForm'} 
                        numberOfMonths={2}
                      />
                    }
                    
                  </span>
                </div>
                <div className={cx(s.tableCell, s.guests, s.noPadding, s.mobilePadding)}>
                  <label className={cx(s.selectPadding, s.label)}>
                   <span> <FormattedMessage {...messages.guest} /></span>
                  </label>
                  <FormControl 
                    componentClass="select" 
                    className={cx(s.formControlSelect, s.input, s.inputPadding)}
                    onChange={(e) => setPersonalizedValues({ name: 'personCapacity', value: Number(e.target.value) })}
                    defaultValue={personalized.personCapacity}
                  >
                    {rows}
                  </FormControl>
                </div>
                <div className={cx(s.tableCell, s.search)}>
                  <Button className={cx(s.btn, s.btnPrimary, s.btnBlock, s.searchButton)} onClick={this.handleClick}>
                    <span className={cx('hidden-lg hidden-xs')}><FontAwesome.FaSearch /></span>
                    <span className={cx('hidden-md hidden-sm')}>
                      <FormattedMessage {...messages.search} />
                    </span>
                  </Button>
                </div>
              </div>
            </div>
            </div>
            </div>
            </form>
          </Col>
        </Row>
       </Grid>         
    );
  }
}


const mapState = (state) => ({
  personalized: state.personalized,
  settingsData: state.viewListing.settingsData
});

const mapDispatch = {
  getSpecificSettings,
  setPersonalizedValues
};

export default injectIntl(withStyles(s)(connect(mapState, mapDispatch)(SearchForm)));
