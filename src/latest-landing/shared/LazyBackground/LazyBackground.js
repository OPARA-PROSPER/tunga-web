import React from 'react';

export default class LazyBackground extends React.Component {

    constructor(props) {
        super(props);
        this.state = { src: null };
    }
    

    componentDidMount() {
        const { src } = this.props;

        const imageLoader = document.createElement('img');
        imageLoader.src = src;

        imageLoader.onload = () => {
            this.setState({ src });
        };
    }

    render() {
        return (
            <div
                {...this.props}
                style={{
                    backgroundImage: `url(${this.state.src ||
                        this.props.placeholder})`
                }}
            ></div>
        );
    }
}
