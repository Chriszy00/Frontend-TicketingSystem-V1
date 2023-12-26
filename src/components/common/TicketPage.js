import React, { useState, useEffect } from 'react';
import Sidebar from "./Sidebar";
import { useParams } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
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
    <div className='bg-white p-5 rounded-5'>
      <p>Ticket ID: {id}</p>

      {ticketData ? (
        <div>
          <h2>{ticketData.title}</h2>
          <br></br>
          <p>Description: {ticketData.description}</p>
          <p>Creator: {ticketData.creator.firstName} {ticketData.creator.lastName}</p>
          {ticketData.category && (
            <>
                <p>Category: {ticketData.category.name}</p>
            </>
        )}
          {/* {ticketData.priority && (
            <>
                <p>Priority: {ticketData.priority.name}</p>
            </>
        )} */}
          <p>Status: {ticketData.status}</p>
          <br></br>
          <hr></hr>

          <form onSubmit={handleCommentSubmit}>
              <input placeholder="Write your comment..." className='ps-3 border rounded-3 ms-3' style={{height:'4vh',width:'90%'}}
                value={commentInput}
                onChange={(e) => setCommentInput(e.target.value)}
              />
            <button className='btn btn-outline-primary py-1 ms-3' type="submit">Comment</button>
          </form>
          <hr></hr>
          <h5 className='mb-3'>Comments</h5>
          {commentsData.map((comment) => (
            <div key={comment.id}>
              <h6 className='mt-4 m-0'>{comment.user.firstName} {comment.user.lastName}</h6>
              <p className='m-0 p-0'>{comment.comment}</p>
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
              <button className='btn p-0 m-0' style={{fontSize:'12px'}} onClick={() => toggleReplyForm(comment.id)}>Reply</button>
              {replyFormCommentId === comment.id && (
                <div>
                  <h6 className='mt-3 ps-4'>Replies</h6>
                  <ul>
                {repliesData[comment.id] &&
                  repliesData[comment.id].map((reply) => (
                    <li key={reply.id}>
                      <h6 style={{fontSize:'14px'}} className='mt-3 m-0'>{reply.user.firstName} {reply.user.lastName}</h6>
                      <p style={{fontSize:'15px'}}  className='m-0'>{reply.reply}</p>
                    </li>
                  ))}
              </ul>
                <form onSubmit={() => handleReplySubmit(comment.id)}>
                    <input placeholder="Write your reply..." className='ps-3 border rounded-3 ms-3' style={{height:'4vh',width:'90%'}} value={replyInput} onChange={(e) => setReplyInput(e.target.value)} />
                    <button className='btn btn-outline-primary py-1 ms-3' type="submit">Reply</button>
                </form>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <p>Loading ticket data...</p>
      )}
    </div>
  );
};

// export default TicketPage;

const TicketPageContainer = () => {
  return (
    <div>
      <Sidebar />
      <div id="content" className="p-4">
        <TicketPage />
      </div>
    </div>
  );
};

export default TicketPageContainer;
