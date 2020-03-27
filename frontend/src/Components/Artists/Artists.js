import React, {Component} from 'react';
import {connect} from "react-redux";
import './Artists.css';
import {deleteArtist, fetchArtists} from "../../store/actions/artistsAction/artistsAction";
import {apiURL} from "../../apiURL";
import {NavLink} from "react-router-dom";

class Artists extends Component {

    componentDidMount() {
        this.props.fetchArtists();
    }

    deleteArtistHandler = async (id) => {
       await this.props.deleteArtist(id)
    };

    render() {
        return (
            <>
                {this.props.user && (
                    <NavLink to="/add_new_singer">Добавить нового Исполнителя</NavLink>
                )}
            <div className="Artists">
                {this.props.artists.map(artist => (
                    <div className="artist-block" key={artist._id}>
                        <img src={apiURL + '/uploads/' + artist.image} alt={artist.artist}/>
                        <div>
                            <NavLink to={`/albums/${artist._id}`} className="artist">{artist.artist}</NavLink>
                        </div>
                        {this.props.user ? this.props.user.role === 'admin' && (
                            <button className="btn" onClick={() => this.deleteArtistHandler(artist._id)}>Delete</button>
                        ) : (
                            <p/>
                        )}
                    </div>
                ))}
            </div>
                </>
        );
    }
}

const mapStateToProps = state => ({
    artists: state.artists.artists,
    user: state.user.user
});

const mapDispatchToProps = dispatch => ({
    fetchArtists: () => dispatch(fetchArtists()),
    deleteArtist: (id) => dispatch(deleteArtist(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(Artists);