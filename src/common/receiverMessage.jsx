import React from "react";

const ReceiverMessage = ({ message, initial }) => {
  return (
    <div className="media w-50 ml-auto mb-3 ">
      <div className="media-body">
        <div className="bg-dark rounded py-2 px-3 mb-2">
          <p className="text-small mb-0 text-white">{message.message}</p>
        </div>
        {/* <p class="small text-muted">12:00 PM | Aug 13</p> */}
      </div>
      <div className="rounded-circle border-info receiver-avatar ml-3">
        {initial}
      </div>
    </div>
  );
};

export default ReceiverMessage;
