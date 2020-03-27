import React, {Component} from 'react';
import './Tracks.css';
import {connect} from "react-redux";
import {
    createTrack,
    deleteTrack,
    fetchTrack,
    postHistory,
    publishTrack
} from "../../store/actions/tracksAction/tracksAction";
import {Redirect} from "react-router-dom";

class Tracks extends Component {

    state = {
      title: '',
      duration: '',
      counter: ''
    };

    postNewTrack = async () => {
        const Track = {
          title: this.state.title,
          duration: this.state.duration,
          counter: this.state.counter,
          album: this.props.match.params.id
        };
        await this.props.createTrack(Track);
        this.props.fetchTrack(this.props.match.params.id)
    };

    componentDidMount() {
        const id = this.props.match.params.id;
        this.props.fetchTrack(id);
    }

    listenTrackClicker = async (id) => {
        this.props.postHistory({trackId: id});
    };

    deleteTrackHandler = async (id) => {
        await this.props.deleteTrack(id)
    };

    publicTrackHandler = async (id) => {
        await this.props.publishTrack(id)
    };

    changeInputHandler = e => {this.setState({[e.target.name]: e.target.value})};

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
                        {this.props.user ? this.props.user.role === 'admin' && (
                            <>
                            <button className="btn" onClick={() => this.deleteTrackHandler(track._id)}>Delete</button>
                                {track.published === false && (
                                    <button className="btn" onClick={() => this.publicTrackHandler(track._id)}>Public</button>
                                )}
                            </>
                        ) : (
                            <p/>
                        )}
                    </div>
                ))}
                {this.props.user && (
                    <div className="new-artist">
                        <h2>Добавление новых треков</h2>
                        <div>
                            <input type="text" name="title" placeholder="Введите Исполнителя" onChange={this.changeInputHandler}/>
                        </div>
                        <div>
                            <input type="number" name="duration" placeholder="Длина трека" onChange={this.changeInputHandler}/>
                        </div>
                        <div>
                            <input type="number" name="counter" placeholder="Номер трека" onChange={this.changeInputHandler}/>
                        </div>
                        <div>
                            <button onClick={this.postNewTrack}>Save</button>
                        </div>
                    </div>
                )}
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
    postHistory: (track) => dispatch(postHistory(track)),
    deleteTrack: (id) => dispatch(deleteTrack(id)),
    publishTrack: (id) => dispatch(publishTrack(id)),
    createTrack: (track, id) => dispatch(createTrack(track, id))
});

export default connect(mapStateToProps, mapDispatchToProps)(Tracks);