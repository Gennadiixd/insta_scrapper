import { useEffect, useState, useCallback } from 'react';
import Cookies from 'js-cookie';

function useDirect(requestDirectInbox, conversations) {
  const token = Cookies.get('t');
  const [currentThreadId, setCurrentThreadId] = useState(null);
  const requestDirectInboxCallback = useCallback(
    () => requestDirectInbox(token),
    [requestDirectInbox, token]
  );

  useEffect(() => { requestDirectInboxCallback() }, [requestDirectInboxCallback]);
  const [messages, setMessages] = useState([]);
  const [myId, setMyId] = useState(undefined);

  useEffect(() => {
    if (conversations && currentThreadId) {
      setMessages(conversations[currentThreadId].chat);
      setMyId(conversations[currentThreadId].my_id);
    };
  }, [conversations, currentThreadId]);

  return [currentThreadId, setCurrentThreadId, messages, myId, token];
}

export default useDirect;