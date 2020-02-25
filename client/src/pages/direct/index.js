import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as S from '../../store/modules/direct/selectors';
import { requestDirectInboxAC, requestDirectNextPageAC } from '../../store/modules/direct/actions';
import { requestUserAC } from '../../store/modules/user-profile/actions';

import DirectChat from './direct-chat';

const mapDispatchToProps = (dispatch) => {
  return {
    requestDirectInbox: bindActionCreators(requestDirectInboxAC, dispatch),
    requestUser: bindActionCreators(requestUserAC, dispatch),
    requestDirectNextPage: bindActionCreators((payload) => requestDirectNextPageAC(payload), dispatch),
  }
};

const mapStateToProps = (state) => {
  return {
    conversations: S.conversationsSelector(state),
    companions: S.companionsSelector(state),
    threadsIds: S.threadsIdsSelector(state),
    pages: S.threadsPagesSelector(state),
  }
};

export default (connect(mapStateToProps, mapDispatchToProps)(DirectChat));