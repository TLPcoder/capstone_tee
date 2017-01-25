import React, {Component} from 'react';
import Post from './Post';
import getFrontPage from '../api/RedditAPI';

export default class PostList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            posts: []
        };

        // getFrontPage().then((redditData) => {
        //     console.log(redditData);
        // })
    }

    renderPosts() {
        var key = 0;
        var posts = this.state.posts;

        var redditData = getFrontPage()
            .then((redditData) => {
                this.setState({
                    posts: redditData.data.children
                });
            })

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
                <p>This is the post list component</p>
                {this.renderPosts()}
            </div>
        );
    }
}
