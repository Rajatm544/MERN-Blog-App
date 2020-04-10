import React from "react";

const Comment = (props) => {
    return (
        <div className="comment">
            <p>
                <span>
                    {/* Jdenticon svg icon */}
                    <img
                        src={
                            "https://avatars.dicebear.com/v2/jdenticon/:" +
                            props.img +
                            ".svg"
                        }
                        alt="jdenticon"
                    />
                </span>
                {/* Actual body of comment */}
                <span className="comment-body">{props.comment}</span>
            </p>
        </div>
    );
};

export default Comment;
