import React, {Component} from 'react';
import MainNav from './nav-main';
import Comments from './comments';
import StarRating from 'react-star-rating';
import AddComment from './add-comment';

class CourseProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            courseData: [],
            addComment: false
        };
        this.getCourse = this.getCourse.bind(this);
        this.getUser = this.getUser.bind(this);
        this.addToFavorites = this.addToFavorites.bind(this);
        this.rating = this.rating.bind(this);
        this.commentBoolean = this.commentBoolean.bind(this);
        this.getCourse();
    }
    getCourse() {
        fetch(`http://localhost:3000/course/${this.props.params.id}/comments`).then((promise) => {
            return promise.json();
        }).then((json) => {
            console.log(json);
            this.setState({
                courseData: json,
                addComment: this.state.addComment
            });
        });
    }
    commentBoolean(){
        this.setState({
            courseData: this.state.courseData,
            addComment: !this.state.addComment
        });
    }
    getUser() {
        var data = sessionStorage.getItem('golfMember');
        return data;
    }
    rating(){
        var ratings = 0;
        var numberOfRatings = 0;
        this.state.courseData.forEach((rating)=>{
            numberOfRatings++;
            ratings += rating.rating;
        });
        ratings = ratings / numberOfRatings;
        return ratings;
    }
    addToFavorites() {
        console.log(this.state);
        var user_id = this.getUser();
        var course_id = this.state.courseData[0].id;
        fetch(`http://localhost:3000/user/favorite`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({user_id: user_id, course_id: course_id})
        }).then((res) => {
            return res.json();
        }).then((resData) => {
            console.log(resData);
            alert(`${this.state.courseData[0].name} has been added to your favorites`);
            this.props.addedFavorite();
        }).catch(function(res) {
            console.log(res);
        });
    }
    render() {
        console.log("hello there", this.state.courseData);
        var margin = {
            marginTop: '100px'
        };
        var comments = this.state.courseData.map((commentInfo)=>{
            console.log("comments here", commentInfo);
            return <Comments comments={commentInfo}/>
        });
        var rating = this.rating()

        if (this.state.courseData.length && !this.state.addComment) {
            console.log("help", this.state.courseData[0].image)
            return (
                <div>
                    <div className = "course-profile-background-image"></div>
                    <div>
                        <MainNav/>
                    </div>
                    <div style = {margin}>
                        <div>
                            <img src={this.state.courseData[0].image} alt="" height="300px" width = "300px"/>
                            <br/>
                            <StarRating name="airbnb-rating" caption="Course Rating" rating={rating} size={17}/>
                        </div>
                        <div>
                            <h3>{this.state.courseData[0].name}</h3>
                            <p>{this.state.courseData[0].state}</p>
                            <p>{this.state.courseData[0].city}</p>
                            <p>{this.state.courseData[0].address}</p>
                            <input type="button" value = "Add to Favorites" onClick={this.addToFavorites}/>
                            <input type="button" value = "Add Comment" onClick={this.commentBoolean}/>
                        </div>
                        <div>
                            <p>{this.state.courseData[0].description}</p>
                        </div>
                        <div>{comments}</div>
                    </div>
                </div>
            )
        }
        else if(this.state.addComment){
            console.log("hello there from add comment")
            return(
                <div style={margin}>
                    <div className = "course-profile-background-image"></div>
                    <div>
                        <MainNav/>
                    </div>
                    <div>
                        <AddComment back={this.commentBoolean}/>
                    </div>
                </div>
            )
        }
        else {
            return (
                <div></div>
            )
        }
    }
}
export default CourseProfile;
