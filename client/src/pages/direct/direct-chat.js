import React, { useEffect, useState } from 'react';
import Chat from '../../components/chat';
import PermanentDrawer from '../../components/permanent-drawer';
import UsersList from '../../components/users-list';
import DirectMessages from '../../components/direct-messages';
import useDirect from './use-direct';
import InputTextField from '../../components/input-text-field';

export default function DirectChat({
  requestDirectNextPage,
  requestDirectInbox,
  directSendMessage,
  conversations,
  companions,
  pages
}) {
  const [currentThreadId, setCurrentThreadId, messages, myId, token] =
    useDirect(requestDirectInbox, conversations);
  const [moreAvailable, setMoreAvailable] = useState(true);

  useEffect(() => {
    const threadsDirectState = getThreadsDirectState();
    if (threadsDirectState) setMoreAvailable(JSON.parse(threadsDirectState.toString())["moreAvailable"]);
  }, [pages, currentThreadId])

  useEffect(() => {
    if (currentThreadId && !getThreadsDirectState()) onRequestNextPage();
  }, [currentThreadId]);

  const onThreadChange = (threadId) => setCurrentThreadId(threadId);

  function getThreadsDirectState() {
    let threadsDirectState;
    try { threadsDirectState = pages[currentThreadId].state }
    catch { threadsDirectState = undefined };
    return threadsDirectState;
  };

  function onRequestNextPage() {
    requestDirectNextPage({
      threadId: currentThreadId,
      threadsDirectState: getThreadsDirectState()
    });
  };

  function onSendMessage(message) {
    const userName = conversations[currentThreadId].username;
    directSendMessage({ token, userName, message });
  };

  return (
    <>
      <PermanentDrawer>
        <UsersList
          users={companions}
          onClick={onThreadChange}
          currentThreadId={currentThreadId}
        />
      </PermanentDrawer>
      <Chat>
        {currentThreadId && (
          <>
            <DirectMessages
              messages={messages}
              onRequestNextPage={onRequestNextPage}
              myId={myId}
              moreAvailable={moreAvailable}
            />
            <InputTextField
              onSubmit={onSendMessage}
            />
          </>
        )}
      </Chat>
    </>
  )
}

