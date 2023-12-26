import React, { useState } from "react";

const TicketPage = () => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  const handleCommentSubmit = () => {
    if (newComment.trim() !== "") {
      setComments((prevComments) => [
        ...prevComments,
        { text: newComment, replies: [] },
      ]);
      setNewComment("");
    }
  };

  const handleReplySubmit = (commentIndex, replyText) => {
    if (replyText.trim() !== "") {
      setComments((prevComments) => {
        const updatedComments = [...prevComments];
        updatedComments[commentIndex].replies.push({ text: replyText });
        return updatedComments;
      });
    }
  };

  return (
    <div>
      <h1>Ticket Page</h1>

      {/* Comment Input */}
      <div>
        <textarea
          placeholder="Add a comment..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        ></textarea>
        <button onClick={handleCommentSubmit}>Comment</button>
      </div>

      {/* Comments Section */}
      <div>
        {comments.map((comment, commentIndex) => (
          <div key={commentIndex}>
            <p>{comment.text}</p>

            {/* Reply Input */}
            <div>
              <textarea
                placeholder="Add a reply..."
                value={comment.replyText}
                onChange={(e) => {
                  // Using a closure to capture both the commentIndex and the event
                  setComments((prevComments) => {
                    const updatedComments = [...prevComments];
                    updatedComments[commentIndex].replyText = e.target.value;
                    return updatedComments;
                  });
                }}
              ></textarea>
              <button
                onClick={() =>
                  handleReplySubmit(commentIndex, comment.replyText)
                }
              >
                Reply
              </button>
            </div>

            {/* Replies Section */}
            <div>
              {comment.replies.map((reply, replyIndex) => (
                <p key={replyIndex}>{reply.text}</p>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TicketPage;
