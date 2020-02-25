import React, { useReducer, useEffect, useState } from 'react';
import Chat from '../../components/chat';
import PermanentDrawer from '../../components/permanent-drawer';
import UsersList from '../../components/users-list';
import DirectMessages from '../../components/direct-messages';
import { monadEither } from '../../utils/monad-either';
import { useCookies } from 'react-cookie';

export default function DirectChat({
  requestDirectNextPage,
  requestDirectInbox,
  conversations,
  companions,
}) {
  const [{ t: token }] = useCookies();
  const [currentThreadId, setCurrentThreadId] = useState(null);
  useEffect(() => { requestDirectInbox(token) }, []);
  const onCurrentThreadChange = (threadId) => setCurrentThreadId(threadId);

  const messages = monadEither(currentThreadId).flatEither(
    () => [],
    (currentThreadId) => conversations[currentThreadId].chat
  );

  const onRequestNextPage = () => {
    console.log('\x1b[36m', 'onRequestNextPage');
    // requestDirectNextPage({ threadId: currentThreadId, pageNumber: currentPageNumber });
    // setCurrentPageNumber(currentPageNumber + 1);
  }

  return (
    <>
      <PermanentDrawer>
        <UsersList
          users={companions}
          onClick={onCurrentThreadChange}
          currentThreadId={currentThreadId}
        />
      </PermanentDrawer>
      <Chat>
        {currentThreadId && (
          <DirectMessages
            messages={messages}
            onRequestNextPage={onRequestNextPage}
          />
        )}
      </Chat>
    </>
  )
}

