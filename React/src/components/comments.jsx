import React, {Component} from 'react';
import StarRating from 'react-star-rating';

class Comments extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        console.log("fuck");
        if (this.props.comments) {
            return (
                <div className="comments">
                     <StarRating name="airbnb-rating" caption="Rate your stay!" rating={this.props.comments.rating} size={17}/>
                    <h4 className = 'commenter-username'>{this.props.comments.username}</h4>
                    <p className = 'comment-comment-body'>{this.props.comments.comment}</p>
                </div>
            )
        } else {
            return (
                <div></div>
            )
        }
    }
}
export default Comments
