import React, {Component} from 'react';
import './trackHistory.css';
import {connect} from "react-redux";
import {fetchHistory} from "../../store/actions/tracksAction/tracksAction";
import {Redirect} from "react-router-dom";

class TrackHistory extends Component {

    componentDidMount() {
        this.props.fetchHistory()
    }

    render() {
        if (!this.props.user) return <Redirect to="/login"/>;
        return (
            <div className="trackHistory">
                {this.props.tracksHistories.map(track => (
                    <div className="history-block" key={track._id}>
                        <p>{track.trackId.title}</p>
                        <h5>{track.datetime}</h5>
                    </div>
                ))}
            </div>
        );
    }
}

const mapStateToProps = state => ({
    tracksHistories: state.tracksHistories.tracksHistories,
    user: state.user.user
});

const mapDispatchToProps = dispatch => ({
    fetchHistory: () => dispatch(fetchHistory())
});

export default connect(mapStateToProps, mapDispatchToProps)(TrackHistory);