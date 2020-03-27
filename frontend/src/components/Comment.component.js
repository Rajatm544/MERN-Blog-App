import React from "react";

const Comment = props => {
    return (
        <div>
            <img
                src={
                    "https://avatars.dicebear.com/v2/jdenticon/:" +
                    props.img +
                    ".svg"
                }
                alt="jdenticon"
                width="50"
                height="50"
            />

            <p>{props.comment}</p>

            <hr />
        </div>
    );
};

export default Comment;
