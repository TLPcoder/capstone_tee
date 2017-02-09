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
    render(){
        console.log(this.state);
        return(
            <form className = "create-comment">
                <StarRating name="airbnb-rating" caption="Course Rating" totalStars={5} size={17} onRatingClick={this.getRating}/>
                <textarea onChange = {this.comment} name="" id="" cols="30" rows="10"></textarea>
                <input type="button" value = "Back" onClick={this.back}/>
                <input type="button" value = "Add Comment"/>
            </form>
        )
    }
}

export default AddComment;
