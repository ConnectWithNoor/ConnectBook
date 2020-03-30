import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { markNotificationsRead } from '../../redux/actions/userActions';

import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import ToolTip from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';
import Badge from '@material-ui/core/Badge';

import NotificationsIcon from '@material-ui/icons/Notifications';
import ChatIcon from '@material-ui/icons/Chat';
import FavoriteIcon from '@material-ui/icons/Favorite';

class Notification extends Component {
  state = {
    AnchorEl: null
  };

  handleOpen = e => {
    this.setState({
      AnchorEl: e.target
    });
  };

  handleClose = () => {
    this.setState({
      AnchorEl: null
    });
  };

  onMenuOpened = () => {
    const unreadNotificationsId = this.props.notifications
      .filter(notifi => !notifi.read)
      .map(notifi => notifi.notificationId);

    this.props.markNotificationsRead(unreadNotificationsId);
  };

  render() {
    const { notifications } = this.props;
    const { AnchorEl } = this.state;
    dayjs.extend(relativeTime);

    let notificationIcon;

    if (notifications && notifications.length > 0) {
      const unreadNotifi = notifications.filter(
        notifi => notifi.read === false
      );
      unreadNotifi.length > 0
        ? (notificationIcon = (
            <Badge badgeContent={unreadNotifi.length} color="secondary">
              <NotificationsIcon />
            </Badge>
          ))
        : (notificationIcon = <NotificationsIcon />);
    } else {
      notificationIcon = <NotificationsIcon />;
    }

    const notificationMarkup =
      notifications && notifications.length > 0 ? (
        notifications.map((notifi, index) => {
          const verb = notifi.type === 'like' ? 'liked' : 'commented on';
          const time = dayjs(notifi.createdAt).fromNow();
          const iconColor = notifi.read ? 'primary' : 'secondary';
          const icon =
            notifi.type === 'like' ? (
              <FavoriteIcon color={iconColor} style={{ marginRight: '1rem' }} />
            ) : (
              <ChatIcon color={iconColor} style={{ marginRight: '1rem' }} />
            );

          return (
            <MenuItem key={index} onClick={this.handleClose}>
              {icon}
              <Typography
                component={Link}
                color="default"
                variant="body1"
                to={`/users/${notifi.recipient}/scream/${notifi.screamId}`}
              >
                {notifi.sender} {verb} your scream {time}
              </Typography>
            </MenuItem>
          );
        })
      ) : (
        <MenuItem onClick={this.handleClose}>
          You have no notification yet.
        </MenuItem>
      );

    return (
      <Fragment>
        <ToolTip placement="top" title="Notifications">
          <IconButton
            aria-owns={AnchorEl ? 'simple-menu' : undefined}
            aria-haspopup="true"
            onClick={this.handleOpen}
          >
            {notificationIcon}
          </IconButton>
        </ToolTip>
        <Menu
          anchorEl={AnchorEl}
          open={Boolean(AnchorEl)}
          onClose={this.handleClose}
          onEntered={this.onMenuOpened}
        >
          {notificationMarkup}
        </Menu>
      </Fragment>
    );
  }
}

Notification.propTypes = {
  markNotificationsRead: PropTypes.func.isRequired,
  notifications: PropTypes.array.isRequired
};

const mapStatesToProps = state => ({
  notifications: state.user.userData.notifications
});

const mapActionsToProps = {
  markNotificationsRead
};

export default connect(mapStatesToProps, mapActionsToProps)(Notification);
