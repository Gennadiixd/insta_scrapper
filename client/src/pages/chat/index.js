import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as S from '../../strore/modules/direct/selectors';
import { requestDirectInboxAC, requestDirectNextPageAC } from '../../strore/modules/direct/actions';
import { requestUserAC } from '../../strore/modules/user-profile/actions';

import DirectChat from './direct-chat';

const mapDispatchToProps = (dispatch) => {
  return {
    requestDirectInbox: bindActionCreators(requestDirectInboxAC, dispatch),
    requestUser: bindActionCreators(requestUserAC, dispatch),
    requestDirectNextPage: bindActionCreators(({ threadId, pageNumber }) => requestDirectNextPageAC({ threadId, pageNumber }), dispatch),
  }
};

const mapStateToProps = (state) => {
  return {
    conversations: S.conversationsSelector(state),
    companions: S.companionsSelector(state),
    threadsIds: S.threadsIdsSelector(state),
  }
};

export default (connect(mapStateToProps, mapDispatchToProps)(DirectChat));