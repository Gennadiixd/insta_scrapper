import React, { useReducer, useEffect, useState } from 'react';
import Chat from '../../components/chat';
import TopBar from '../../components/top-bar';
import PermanentDrawer from '../../components/permanent-drawer';
import UsersList from '../../components/users-list';
import DirectMessages from '../../components/direct-messages';
import { monadEither } from '../../utils/monad-either';

export default function DirectChat({
  requestDirectInbox,
  conversations,
  companions,
  requestDirectNextPage
}) {
  const [currentThreadId, setCurrentThreadId] = useState(null);
  const [currentPageNumber, setCurrentPageNumber] = useState(1);
  useEffect(() => { requestDirectInbox() }, []);
  const onCurrentThreadChange = (threadId) => setCurrentThreadId(threadId);

  const messages = monadEither(currentThreadId).flatEither(
    () => [],
    (currentThreadId) => conversations[currentThreadId].chat
  );
  const onRequestNextPage = () => {
    console.log('\x1b[36m', 'onRequestNextPage');
    requestDirectNextPage({ threadId: currentThreadId, pageNumber: currentPageNumber });
    setCurrentPageNumber(currentPageNumber + 1);
  }

  return (
    <>
      <TopBar />
      <PermanentDrawer>
        <UsersList
          users={companions}
          onClick={onCurrentThreadChange}
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

