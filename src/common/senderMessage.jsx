import React from "react";

const SenderMessage = ({ message, initial }) => {
  return (
    <div className="media w-50 mb-3 ">
      <div className="rounded-circle border-info sender-avatar">{initial}</div>
      <div className="media-body ml-3">
        <div className="bg-light rounded py-2 px-3 mb-2">
          <p className="text-small mb-0 text-muted">{message.message}</p>
        </div>
        {/* <p class="small text-muted">12:00 PM | Aug 13</p> */}
      </div>
    </div>
  );
};

export default SenderMessage;
