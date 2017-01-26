import React, {Component} from 'react';
import Post from './Post';
import getFrontPage from '../api/RedditAPI';

export default class PostList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            posts: []
        };

        this.renderPosts = this.renderPosts.bind(this)
        this.setFrontPage();
    }

    setFrontPage() {
        var redditData = getFrontPage()
            .then((redditData) => {
                this.setState({
                    posts: redditData.data.children
                });
            });
    }

    renderPosts() {
        var key = 0;
        var posts = this.state.posts;

        if (this.state.posts.length === 0) {
            return <h3>Loading...</h3>
        }
        var postComponents = posts.map((post) => {
            let {title} = post.data;

            return (<Post key={key++} postText={title}/>)
        })

        return postComponents
    }

    render() {
        return (
            <div>
                {this.renderPosts()}
            </div>
        );
    }
}
