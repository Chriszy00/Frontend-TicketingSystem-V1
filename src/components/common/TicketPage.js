import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const TicketPage = () => {
  const { id } = useParams();
  const [ticketData, setTicketData] = useState(null);
  const [commentInput, setCommentInput] = useState('');
  const [replyInput, setReplyInput] = useState('');
  const [commentsData, setCommentsData] = useState([]);
  const [repliesData, setRepliesData] = useState({});
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [replyFormCommentId, setReplyFormCommentId] = useState(null);



  useEffect(() => {
    fetchTicketData();
  }, [id]);

  const fetchTicketData = async () => {
    try {
      const ticketResponse = await axios.get(`http://localhost:8080/api/ticket/${id}`, {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
        },
      });

      setTicketData(ticketResponse.data);

      try {
        const commentsResponse = await axios.get(`http://localhost:8080/api/ticket/${id}/comments`, {
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
          },
        });

        const comments = commentsResponse.data;

        for (const comment of comments) {
          try {
            const additionalDataResponse = await axios.get(
              `http://localhost:8080/api/ticket/comment/${comment.id}`,
              {
                headers: {
                  Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
                },
              }
            );

            // Update state using the comment ID
            setRepliesData((prevData) => ({
              ...prevData,
              [comment.id]: additionalDataResponse.data,
            }));

            console.log(`Additional data for comment ${comment.id}:`, additionalDataResponse.data);
          } catch (additionalDataError) {
            console.error(`Error fetching additional data for comment ${comment.id}:`, additionalDataError);
          }
        }

        setCommentsData(comments);
      } catch (commentsError) {
        console.error('Error fetching comments:', commentsError);
      }
    } catch (ticketError) {
      console.error('Error fetching ticket data:', ticketError);
    }
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `http://localhost:8080/api/ticket/${id}/comment`,
        {
          ticket: id,
          comment: commentInput,
          user: localStorage.getItem('userId'),
        },
        {
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
          },
        }
      );

      // const newComment = response.data;

      // setTicketData((prevData) => ({
      //   ...prevData,
      //   comments: [...prevData.comments, newComment],
      // }));

      setCommentInput('');
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  const handleReplySubmit = async (commentId) => {
    console.log('commentId: '+commentId)
    try {
      const response = await axios.post(
        `http://localhost:8080/api/ticket/comment/${commentId}/reply`,
        {
          // comment: commentId, // Update this line
          reply: replyInput,
          user: localStorage.getItem('userId'),
        },
        {
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
          },
        }
      );
  
      // Process the response if needed
  
      // Assuming the response contains the newly added reply
      const newReply = response.data;
  
      // Update the repliesData state
      setRepliesData((prevData) => ({
        ...prevData,
        [commentId]: [...(prevData[commentId] || []), newReply],
      }));
  
      // Clear the reply input
      setReplyInput('');
    } catch (error) {
      console.error('Error adding reply:', error);
    }
  };

  const toggleReplyForm = (commentId) => {
    setReplyFormCommentId(commentId === replyFormCommentId ? null : commentId);
  };
  

  return (
    <div>
      <h2>Ticket Page</h2>
      <p>Ticket ID: {id}</p>

      {ticketData ? (
        <div>
          <h3>{ticketData.title}</h3>
          <p>Description: {ticketData.description}</p>
          <p>Date: {ticketData.date}</p>
          <p>Assigned: {ticketData.assigned}</p>
          <p>Status: {ticketData.status}</p>
          <hr></hr>

          <form onSubmit={handleCommentSubmit}>
            <label>
              Comment:
              <textarea
                value={commentInput}
                onChange={(e) => setCommentInput(e.target.value)}
              />
            </label>
            <button type="submit">Add Comment</button>
          </form>
          <hr></hr>
          <h2>Comments</h2>
          {commentsData.map((comment) => (
            <div key={comment.id}>
              <p>Comment ID: {comment.id}</p>
              <p>Text: {comment.comment}</p>
              {/* <form onSubmit={(e) => handleReplySubmit(e, comment.id)}>
                    <label>
                    Reply:
                    <textarea
                        value={replyInput}
                        onChange={(e) => setReplyInput(e.target.value)}
                    />
                    </label>
                    <button type="submit">Add Reply</button>
                </form> */}
              <button onClick={() => toggleReplyForm(comment.id)}>Add Reply</button>
              {replyFormCommentId === comment.id && (
                <form onSubmit={() => handleReplySubmit(comment.id)}>
                  <label>
                    Reply:
                    <textarea value={replyInput} onChange={(e) => setReplyInput(e.target.value)} />
                  </label>
                  <button type="submit">Add Reply</button>
                </form>
              )}

              {/* Display repliesData for the current comment */}
              <ul>
                {repliesData[comment.id] &&
                  repliesData[comment.id].map((reply) => (
                    <li key={reply.id}>
                      Reply ID: {reply.id}, Text: {reply.reply}
                    </li>
                  ))}
              </ul>
            </div>
          ))}
        </div>
      ) : (
        <p>Loading ticket data...</p>
      )}
    </div>
  );
};

export default TicketPage;
