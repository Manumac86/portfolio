import React from 'react';
import ExperienceLayout from '../components/experience-layout';

class Experience extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            items: []
        };
    }
    
    componentDidMount() {
        fetch("http://wp.manumac.com.ar/wp-json/wp/v2/posts")
            .then(res => res.json())
            .then(
            (result) => {
                this.setState({
                    isLoaded: true,
                    posts: result
                });
            },
            // Note: it's important to handle errors here
            // instead of a catch() block so that we don't swallow
            // exceptions from actual bugs in components.
            (error) => {
                this.setState({
                    isLoaded: true,
                    error
                });
            }
        )
    }
    render () {
        const { error, isLoaded, posts } = this.state;
        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <div>Loading...</div>;
        } else {
            return (
                <div id="experience">
                    <h2>Experience</h2>
                    {posts.map(post => ( 
                        <ExperienceLayout title={post.title.rendered} content={post.content.rendered.slice(4, -5)}></ExperienceLayout>
                    ))}
                    {/* <ExperienceLayout></ExperienceLayout> */}
                </div>
            );
        }
    }
}
export default Experience;