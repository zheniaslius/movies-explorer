import React, { Component } from 'react';
import { connect } from 'react-redux';
import TopBar from './TopBar';
import Content from './Content';
import { Wrapper } from './Main.styles';

class Main extends Component {
    state = { sizes: [] }

    getFullPath = img => {
        const size = (window.innerWidth <= 780) ? 780 : 1280;
        return (img) 
            ? `https://image.tmdb.org/t/p/w${size}/${img}`
            : null;
    }

    render() {
        const { background } = this.props;
        const { pathname } = this.props.location;
        const showbg = pathname !== '/';

        return (
            <Wrapper image={this.getFullPath(background)} showbg={showbg}>
                <TopBar />
                <Content />
            </Wrapper>
        );
    }
};

const mapStateToProps = state => ({
    background: state.movie.details.backdrop_path
})

export default connect(
    mapStateToProps,
    null
)(Main);