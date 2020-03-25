import React, {Component} from 'react';
import {connect} from "react-redux";
import './Artists.css';
import {fetchArtists} from "../../store/actions/artistsAction/artistsAction";
import {apiURL} from "../../apiURL";
import {NavLink} from "react-router-dom";

class Artists extends Component {

    componentDidMount() {
        this.props.fetchArtists();
    }

    render() {
        return (
            <div className="Artists">
                {this.props.artists.map(artist => (
                    <div className="artist-block" key={artist._id}>
                        <img src={apiURL + '/uploads/' + artist.image} alt={artist.artist}/>
                        <div>
                            <NavLink to={`/albums/${artist._id}`} className="artist">{artist.artist}</NavLink>
                        </div>
                    </div>
                ))}
            </div>
        );
    }
}

const mapStateToProps = state => ({
    artists: state.artists.artists
});

const mapDispatchToProps = dispatch => ({
    fetchArtists: () => dispatch(fetchArtists()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Artists);