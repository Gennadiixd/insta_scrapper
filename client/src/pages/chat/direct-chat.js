import React, { useReducer, useEffect, useState } from 'react';
import Chat from '../../components/chat';
import TopBar from '../../components/top-bar';
import PermanentDrawer from '../../components/permanent-drawer';
import UsersList from '../../components/users-list';
import FeedDirectMessages from '../../components/feed-direct-messages';
import { monadEither } from '../../utils/monad-either';

export default function DirectChat({
  requestDirectInbox,
  conversations,
  threadsIds,
  companions,
  requestUser,
}) {
  const [currentThreadId, setCurrentThreadId] = useState(null);

  useEffect(() => {
    requestUser();
    requestDirectInbox();
  }, []);

  useEffect(() => {
    setCurrentThreadId(threadsIds[0]);
  }, [threadsIds]);

  const onCurrentThreadChange = (threadId) => {
    setCurrentThreadId(threadId);
  };

  const messages = monadEither(currentThreadId).flatEither(
    () => [],
    (currentThreadId) => conversations[currentThreadId].chat
  )

  console.log(messages);
    
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
          <FeedDirectMessages
            messages={messages}
            currentThreadId={currentThreadId}
          />
        )}
      </Chat>
    </>
  )
}

