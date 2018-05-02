import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, injectIntl } from 'react-intl';
import {graphql, gql, compose} from 'react-apollo';
import {
    FormControl
} from 'react-bootstrap';

import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './WishListIcon.css';
import * as FontAwesome from 'react-icons/lib/fa';
import { connect } from 'react-redux';

// Helper
import { getWishListStatus } from '../../helpers/wishListStatus';

// Locale
import messages from '../../locale/messages';

// Redux Actions
import { openWishListModal } from '../../actions/WishList/modalActions';
import { openLoginModal } from '../../actions/modalActions';

class WishListIcon extends Component {

    static propTypes = {
        isChecked: PropTypes.bool,
        formatMessage: PropTypes.func,
        listId: PropTypes.number,
        type: PropTypes.string
    };

    static defaultProps = {
       isChecked: false,
       type: 'icon'
    };

    constructor(props) {
        super(props);
        this.state = {
            iconSelected: false,
            clicked: false
        };
        this.iconAction = this.iconAction.bind(this);
    }

    componentWillMount() {
        const { isChecked, listId } = this.props;
        this.setState({ iconSelected: isChecked });
    }

    async componentWillReceiveProps(nextProps) {
        const { wishListModalStatus, wishListRoomId, isChecked, listId } = nextProps;
        const { iconSelected, clicked } = this.state;
        let currentWishListStatus = false;
        // Trigger request on Modal action done/close
        if (wishListRoomId && wishListModalStatus === false) {
            // Get Current List's Wish List Status( True/False )
            currentWishListStatus = await getWishListStatus(listId);

            this.setState({
                iconSelected: currentWishListStatus
            });
        } else {
            // On the flow process
            if (!clicked && !wishListModalStatus) {
                this.setState({ iconSelected: isChecked });
            }   
        }
    }

    iconAction() {
        const { isChecked, listId, isAuthenticated } = this.props;
        const { openLoginModal, openWishListModal } = this.props;
        if (isAuthenticated) {
            this.setState({ clicked: true });
            openWishListModal(listId);
        } else {
            openLoginModal();
        }
    }

    render () {
        const { isChecked, listId, type } = this.props;
        const { iconSelected } = this.state;

        return (
            <div>
                {
                    type == 'icon' && <div className={s.iconContainer} onClick={this.iconAction}>
                        {
                            iconSelected && <FontAwesome.FaHeart className={s.wishListIcon} />
                        }    
                        {
                            !iconSelected && <FontAwesome.FaHeartO className={s.wishListIcon} />
                        }   
                    </div>
                }
                {
                    type == 'button' && <div className={s.buttonContainer} onClick={this.iconAction}>
                        {
                            iconSelected && <FontAwesome.FaHeart className={s.wishListIcon} />
                        }
                        {
                            !iconSelected && <FontAwesome.FaHeartO className={s.wishListIcon} />
                        }
                        <span className={s.buttonText}>
                        {
                            iconSelected ? 'Saved' : 'Save'
                        }
                        </span>
                    </div>
                }
            </div>        
        );
    }
}

const mapState = (state) => ({
    isAuthenticated: state.runtime.isAuthenticated,
    wishListModalStatus: state.modalStatus.wishListModalOpen,
    wishListRoomId: state.modalStatus.listId
});

const mapDispatch = {
    openLoginModal,
    openWishListModal
};

export default compose(
    withStyles(s),
    connect(mapState, mapDispatch),
    graphql(gql`
        query getListingData($listId: String!, $preview: Boolean) {
          UserListing (listId: $listId, preview: $preview) {
            wishListStatus
          }
        }     
    `)
)(WishListIcon);

