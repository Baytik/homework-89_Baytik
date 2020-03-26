import React, {Component} from 'react';
import './Tracks.css';
import {connect} from "react-redux";
import {fetchTrack, postHistory} from "../../store/actions/tracksAction/tracksAction";
import {Redirect} from "react-router-dom";

class Tracks extends Component {

    componentDidMount() {
        const id = this.props.match.params.id;
        this.props.fetchTrack(id);
    }

    listenTrackClicker = async (id) => {
        this.props.postHistory({trackId: id});
    };

    render() {
        if (!this.props.user) return <Redirect to="/login"/>;
        return (
            <div className="tracks">
                {this.props.tracks.map(track => (
                    <div className="track-block" key={track._id}>
                        <strong>{track.counter}</strong>
                        <h2>{track.title}</h2>
                        <p>{track.duration}</p>
                        {this.props.user && (
                            <button className="btn" onClick={() => this.listenTrackClicker(track._id)}>listen</button>
                        )}
                    </div>
                ))}
            </div>
        );
    }
}

const mapStateToProps = state => ({
    tracks: state.tracks.tracks,
    user: state.user.user
});

const mapDispatchToProps = dispatch => ({
    fetchTrack: (id) => dispatch(fetchTrack(id)),
    postHistory: (track) => dispatch(postHistory(track))
});

export default connect(mapStateToProps, mapDispatchToProps)(Tracks);