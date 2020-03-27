import React, {Component} from 'react';
import {connect} from "react-redux";
import './Albums.css';
import {apiURL} from "../../apiURL";
import {NavLink} from "react-router-dom";
import {deleteAlbum, fetchAlbums, postAlbum, publishAlbum} from "../../store/actions/albumsAction/albumsAction";

class Albums extends Component {

    state = {
        title: '',
        year: '',
        image: null,
    };

    changeInputHandler = e => {this.setState({[e.target.name]: e.target.value})};
    fileChangeHandler = e => {this.setState({[e.target.name]: e.target.files[0]})};

    postNewAlbum = async () => {
        const formData = new FormData();
        formData.append('title', this.state.title);
        formData.append('year', this.state.year);
        formData.append('image', this.state.image);
        formData.append('artist', this.props.match.params.id);
        await this.props.postAlbum(formData);
    };

    componentDidMount() {
        const id = this.props.match.params.id;
        this.props.fetchAlbums(id);
    }

    deleteAlbumHandler = async (id) => {
        await this.props.deleteAlbum(id)
    };

    publicAlbumHandler = async (id) => {
        await this.props.publishAlbum(id)
    };

    render() {
        return (
            <>
            <div className="albums">
                {this.props.albums.map(album => (
                    <div className="albums-block" key={album._id}>
                        <h3>Исполнитель: {album.artist.artist}</h3>
                        <img src={apiURL + '/uploads/' + album.image} alt={album._id}/>
                        <div>
                            <NavLink to={`/track/${album._id}`}>{album.title}</NavLink>
                            <p>{album.year}</p>
                        </div>
                        {this.props.user ? this.props.user.role === 'admin' && (
                            <>
                            <button className="btn" onClick={() => this.deleteAlbumHandler(album._id)}>Delete</button>
                                {album.published === false && (
                                    <button className="btn" onClick={() => this.publicAlbumHandler(album._id)}>Public</button>
                                )}
                            </>
                        ) : (
                            <p/>
                        )}
                    </div>
                ))}
            </div>
                {this.props.user && (
                    <div className="new-artist">
                        <h2>Добавление новых Альбомов</h2>
                        <div>
                            <input type="text" name="title" placeholder="Введите Исполнителя" onChange={this.changeInputHandler}/>
                        </div>
                        <div>
                            <input type="number" name="year" placeholder="Информация об исполнителе" onChange={this.changeInputHandler}/>
                        </div>
                        <div>
                            <input type="file" name="image" onChange={this.fileChangeHandler}/>
                        </div>
                        <div>
                            <button onClick={this.postNewAlbum}>Save</button>
                        </div>
                    </div>
                )}
                </>
        );
    }
}

const mapStateToProps = state => ({
    user: state.user.user,
    albums: state.albums.albums
});

const mapDispatchToProps = dispatch => ({
    fetchAlbums: (id) => dispatch(fetchAlbums(id)),
    postAlbum: (album) => dispatch(postAlbum(album)),
    deleteAlbum: (id) => dispatch(deleteAlbum(id)),
    publishAlbum: (id) => dispatch(publishAlbum(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(Albums);