import React from "react";
import PropTypes from "prop-types";

const Comment = (props) => {
    return (
        <div className="comment">
            <p>
                <span>
                    {/* Jdenticon svg icon */}
                    <img
                        src={`https://avatars.dicebear.com/v2/jdenticon/:${props.img}.svg`}
                        alt="jdenticon"
                    />
                </span>
                {/* Actual body of comment */}
                <span className="comment-body">{props.comment}</span>
            </p>
        </div>
    );
};

// PropTypes
Comment.propTypes = {
    comment: PropTypes.string.isRequired,
    img: PropTypes.string.isRequired,
};

export default Comment;
