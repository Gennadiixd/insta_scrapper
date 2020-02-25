import React from 'react';
import Chat from '../../components/chat';
import PermanentDrawer from '../../components/permanent-drawer';
import UsersList from '../../components/users-list';
import DirectMessages from '../../components/direct-messages';
import useDirect from './use-direct';

export default function DirectChat({
  requestDirectNextPage,
  requestDirectInbox,
  conversations,
  companions,
  pages
}) {
  const [currentThreadId, setCurrentThreadId, messages, myId] =
    useDirect(requestDirectInbox, conversations);

  const onThreadChange = (threadId) => setCurrentThreadId(threadId);

  const onRequestNextPage = () => {
    console.log('\x1b[36m', pages);
    
    let threadsDirectState;
    try {
      threadsDirectState = pages[currentThreadId].state;
    } catch {
      threadsDirectState = undefined;
    };
    requestDirectNextPage({ threadId: currentThreadId, threadsDirectState });
  }

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
          <DirectMessages
            messages={messages}
            onRequestNextPage={onRequestNextPage}
            myId={myId}
          />
        )}
      </Chat>
    </>
  )
}

