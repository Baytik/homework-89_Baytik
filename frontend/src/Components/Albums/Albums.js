import React, {Component} from 'react';
import {connect} from "react-redux";
import './Albums.css';
import {apiURL} from "../../apiURL";
import {NavLink} from "react-router-dom";
import {fetchAlbums} from "../../store/actions/albumsAction/albumsAction";

class Albums extends Component {

    componentDidMount() {
        const id = this.props.match.params.id;
        this.props.fetchAlbums(id);
    }

    render() {
        return (
            <div className="albums">
                {this.props.albums.map(album => (
                    <div className="albums-block" key={album._id}>
                        <h3>Исполнитель: {album.artist.artist}</h3>
                        <img src={apiURL + '/uploads/' + album.image} alt={album._id}/>
                        <div>
                            <NavLink to={`/track/${album._id}`}>{album.title}</NavLink>
                            <p>{album.year}</p>
                        </div>
                    </div>
                ))}
            </div>
        );
    }
}

const mapStateToProps = state => ({
    albums: state.albums.albums
});

const mapDispatchToProps = dispatch => ({
    fetchAlbums: (id) => dispatch(fetchAlbums(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Albums);