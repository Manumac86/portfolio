import React from 'react';
import ExperienceLayout from '../components/experience-layout';

class Experience extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            postIsLoaded: false,
            catIsLoaded: false,
            posts: [],
            categories: []
        };
    }
    
    componentDidMount() {
        fetch("http://wp.manumac.com.ar/wp-json/wp/v2/posts")
        .then(res => res.json())
        .then(
            (result) => {
                this.setState({
                    postIsLoaded: true,
                    posts: result
                });
            },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
            (error) => {
                this.setState({
                    postIsLoaded: true,
                    error
                });
            }
        );
        fetch("http://wp.manumac.com.ar/wp-json/wp/v2/posts")
        .then(res => res.json())
        .then(
            (data) => {
                this.setState({
                    catIsLoaded: true,
                    categories: data
                });
            },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
            (error) => {
                this.setState({
                    catIsLoaded: true,
                    error
                });
            }
        );
    }
    render () {
        const { error, postIsLoaded, catIsLoaded, posts, categories } = this.state;
        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!postIsLoaded || !catIsLoaded) {
            return <div>Loading...</div>;
        } else {
            return (
                <div id="experience">
                    <h2>Experience</h2>
                    {categories.map(category => {
                            let categoriesObj = {};
                            categoriesObj.postTitle = category.title.rendered;
                            categoriesObj.postContent = category.content.rendered;
                            categoriesObj.postExcerpt = category.excerpt.rendered;
                            return categoriesObj;
                        }
                    )}
                    {posts.map((post) => {
                        let postsObj = {}; 
                            postsObj.postTitle = post.title.rendered;
                            postsObj.postContent = post.content.rendered;
                            postsObj.postExcerpt = post.excerpt.rendered;
                            return postsObj;
                        }
                    )}
                    {/* <ExperienceLayout></ExperienceLayout> */}
                </div>
            );
        }
    }
}
export default Experience;