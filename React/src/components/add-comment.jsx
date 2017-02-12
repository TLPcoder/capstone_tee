import React, {Component} from 'react';
import StarRating from 'react-star-rating';

class AddComment extends Component{
    constructor(props){
        super(props);
        this.state = {
            rating:0,
            comment: null
        };
        this.getUser = this.getUser.bind(this);
        this.getRating = this.getRating.bind(this);
        this.comment = this.comment.bind(this);
        this.addComment = this.addComment.bind(this);
        this.back = this.back.bind(this);

    }
    getUser(){
        var data = sessionStorage.getItem('golfMember');
        return data;
    }
    getRating(e, data){
        this.setState({
            rating:data.rating,
            comment: this.state.comment
        });
    }
    back(){
        this.props.back();
    }
    comment(event){
        this.setState({
            rating: this.state.rating,
            comment: event.target.value
        });
    }
    addComment(){
        var course_id = this.props.data[0].course_id;
        var user_id = this.getUser();
        var rating = this.state.rating;
        var comment = this.state.comment;
        fetch(`http://localhost:3000/course/comments`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                course_id:course_id,
                commenter_id:user_id,
                rating:rating,
                comment: comment
            })
        }).then((res) => {
            return res.json();
        }).then((resData) => {
            console.log(resData);
            this.back();
        }).catch(function(res) {
            console.log(res);
        });
    }
    render(){
        console.log(this.state);
        return(
            <form className = "create-comment">
                <div className="create-comment-rating" >
                <label htmlFor="">Place your Rating: </label>
                <StarRating name="airbnb-rating" totalStars={5} size={17} rating={this.state.rating} onRatingClick={this.getRating}/>
                </div>
                <textarea className="create-comment-textarea" onChange = {this.comment} name="" id="" cols="30" rows="10"></textarea>
                <br/>
                <input className="create-comment-buttons" type="button" value = "Back" onClick={this.back}/>
                <input className="create-comment-buttons" type="button" value = "Add Comment" onClick={this.addComment}/>
            </form>
        )
    }
}

export default AddComment;
