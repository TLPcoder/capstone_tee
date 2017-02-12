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
            addComment: false,
            noComments: null,
        };
        this.getCourse = this.getCourse.bind(this);
        this.getUser = this.getUser.bind(this);
        this.addToFavorites = this.addToFavorites.bind(this);
        this.rating = this.rating.bind(this);
        this.commentBoolean = this.commentBoolean.bind(this);
        this.getCourseWithOutComment = this.getCourseWithOutComment.bind(this);
        this.getCourse();
    }
    getCourse() {
        fetch(`http://localhost:3000/course/${this.props.params.id}/comments`)
        .then((promise) => {
            return promise.json();
        }).then((json) => {
            console.log("hello there bitch", json);
            if (json.length === 0) {
                this.getCourseWithOutComment();
            } else {
                this.setState({
                    courseData: json,
                    addComment: this.state.addComment,
                    noComments:false
                });
            }
        });
    }
    getCourseWithOutComment() {
        fetch(`http://localhost:3000/course/${this.props.params.id}`)
        .then((promise) => {
            return promise.json();
        }).then((json) => {
            console.log("hello there bitch", json);
            this.setState({
                courseData: json,
                addComment: this.state.addComment,
                noComments:true
            });
        });
    }
    commentBoolean() {
        this.setState({
            courseData: this.state.courseData,
            addComment: !this.state.addComment
        });
        this.getCourse();
    }
    getUser() {
        var data = sessionStorage.getItem('golfMember');
        return data;
    }
    rating() {
        var ratings = 0;
        var numberOfRatings = 0;
        this.state.courseData.forEach((rating) => {
            numberOfRatings++;
            ratings += rating.rating;
        });
        ratings = ratings / numberOfRatings;
        return ratings;
    }
    addToFavorites() {
        console.log(this.state);
        var user_id = this.getUser();
        var course_id = this.state.courseData[0].course_id;
        console.log("course id mother fucker ", this.state.courseData[0]);
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
        var center = {
            textAlign: 'center'
        };
        var rating = {
            marginLeft: '1%'
        };
        console.log("hello there", this.state.courseData);
        var comments = this.state.courseData.map((commentInfo) => {
            console.log("comments here", commentInfo);
            return <Comments comments={commentInfo}/>
        });
        var rating = Math.round(this.rating());
        console.log("rating", rating);
        if(this.state.courseData.length && this.state.noComments && !this.state.addComment){
            return (
                <div>
                    <div className="course-profile-background-image"></div>
                    <div>
                        <MainNav/>
                    </div>
                    <div>
                        <div className="course-profile-info-box">
                            <div className="course-profile-course-info">
                                <h3>{this.state.courseData[0].name}</h3>
                                <p>State: {this.state.courseData[0].state}</p>
                                <p>City: {this.state.courseData[0].city}</p>
                                <p>Address: {this.state.courseData[0].address}</p>
                                <input className="course-profile-button" type="button" value="Add to Favorites" onClick={this.addToFavorites}/>
                                <input className="course-profile-button" type="button" value="Add Comment" onClick={this.commentBoolean}/>
                            </div>
                            <div className="course-profile-img-rating">
                                <img className="course-profile-img" src={this.state.courseData[0].image} alt="" height="400px" width="400px"/>
                                <br/>
                                <div className="course-profile-rating">Course Rating:
                                    <StarRating className="course-profile-rating" name="airbnb-rating" totalStars={5}  rating={rating} size={17}/>
                                </div>
                            </div>
                            <div className="course-profile-description">
                                <h3 style={center}>Description of {this.state.courseData[0].name}</h3>
                                <p>{this.state.courseData[0].description}</p>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
        if (this.state.courseData.length && !this.state.addComment) {
            console.log("help", this.state.courseData[0].image)
            return (
                <div>
                    <div className="course-profile-background-image"></div>
                    <div>
                        <MainNav/>
                    </div>
                    <div>
                        <div className="course-profile-info-box">
                            <div className="course-profile-course-info">
                                <h3>{this.state.courseData[0].name}</h3>
                                <p>State: {this.state.courseData[0].state}</p>
                                <p>City: {this.state.courseData[0].city}</p>
                                <p>Address: {this.state.courseData[0].address}</p>
                                <input className="course-profile-button" type="button" value="Add to Favorites" onClick={this.addToFavorites}/>
                                <input className="course-profile-button" type="button" value="Add Comment" onClick={this.commentBoolean}/>
                            </div>
                            <div className="course-profile-img-rating">
                                <img className="course-profile-img" src={this.state.courseData[0].image} alt="" height="400px" width="400px"/>
                                <br/>
                                <div className="course-profile-rating">Course Rating:
                                    <StarRating className="course-profile-rating" name="airbnb-rating" totalStars={5}  rating={rating} size={17}/>
                                </div>
                            </div>
                            <div className="course-profile-description">
                                <h3 style={center}>Description of {this.state.courseData[0].name}</h3>
                                <p>{this.state.courseData[0].description}</p>
                            </div>
                        </div>
                        <div className="course-profile-comments">{comments}</div>
                    </div>
                </div>
            )
        } else if (this.state.addComment) {
            console.log("hello there from add comment")
            return (
                <div>
                    <div className="course-profile-background-image"></div>
                    <div>
                        <MainNav/>
                    </div>
                    <div>
                        <AddComment data={this.state.courseData} back={this.commentBoolean}/>
                    </div>
                </div>
            )
        } else {
            return (
                <div></div>
            )
        }
    }
}
export default CourseProfile;
