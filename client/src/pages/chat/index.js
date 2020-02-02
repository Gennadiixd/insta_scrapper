import React, { useReducer, useEffect, useState } from 'react';
import Layout from '../../core/layout';
import { getFeed } from '../../services/requests';
import Sidebar from '../../components/sidebar';
import Feed from '../../components/feed';

export const getFeedAC = (acc, pass, dispatch) => {
  getFeed(acc, pass)
    .then(resp => resp.json())
    .then(feed => {
      dispatch({
        type: 'GET_FEED',
        payload: feed
      })
    })
}

export default function ChatPage() {
  const [activeUser, setActiveUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [chatFeed, setChatFeed] = useState(null);

  const [state, dispatch] = useReducer((state, action) => {
    switch (action.type) {
      case 'GET_FEED':
        return { ...state, ...action.payload };
      default:
        return state;
    }
  }, {
    feed: []
  });

  useEffect(() => {
    getFeedAC(123, 123, dispatch);
  }, [])

  useEffect(() => {
    setChatFeed(state.feed.reduce((f, g) => {
      if (g.username === activeUser) {
        f = {
          userName: g.username,
          chat: g.chat,
          loggedInUserId: g.loggedInUserId
        }
      }
      return f;
    }, {}))
  }, [activeUser])

  useEffect(() => {
    setUsers(state.feed.reduce((f, g) => {
      f.push({
        userName: g.username,
        fullName: g.full_name,
        avatarUrl: g.profile_pic_url
      })
      return f;
    }, []))
  }, [state])

  const setUser = (username) => {
    setActiveUser(username);
  }

  return (
    <Layout
      title="Chat Page"
      description={`Greetings!`}
      // className="container"
    >
      <div className="row">
        <Sidebar items={users} onClickCard={setUser}>
          Feed
        </Sidebar>
        {activeUser && chatFeed && (
          <Feed feed={chatFeed} />
        )}
      </div>
    </Layout>
  )
}
