import { connect } from 'react-redux';
import ViewHeader from './viewheader';

const mapStateToProps = ({ entities: {user, memberships}}) => {
  return {
    memberships
  };
};

const mapDispatchToProps = dispatch => ({

});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ViewHeader);
