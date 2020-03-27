import React, {Component} from 'react';
import './newArtist.css';
import {connect} from "react-redux";
import {Redirect} from "react-router-dom";
import {postArtist} from "../../store/actions/artistsAction/artistsAction";

class NewArtist extends Component {

    state = {
        artist: '',
        information: '',
        image: null,
    };

    changeInputHandler = e => {this.setState({[e.target.name]: e.target.value})};
    fileChangeHandler = e => {this.setState({[e.target.name]: e.target.files[0]})};

    postNewArtist = async () => {
            const formData = new FormData();
            formData.append('artist', this.state.artist);
            formData.append('information', this.state.information);
            formData.append('image', this.state.image);
            await this.props.postArtist(formData);
    };

    render() {
        if (!this.props.user) return <Redirect to="/login"/>;
        return (
            <div className="new-artist">
                <h2>Добавление новых исполнителей</h2>
                <div>
                    <input type="text" name="artist" placeholder="Введите Исполнителя" onChange={this.changeInputHandler}/>
                </div>
                <div>
                    <input type="text" name="information" placeholder="Информация об исполнителе" onChange={this.changeInputHandler}/>
                </div>
                <div>
                    <input type="file" name="image" onChange={this.fileChangeHandler}/>
                </div>
                <div>
                    <button onClick={this.postNewArtist}>Save</button>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    user: state.user.user
});

const mapDispatchToProps = dispatch => ({
    postArtist: (artist) => dispatch(postArtist(artist))
});

export default connect(mapStateToProps, mapDispatchToProps)(NewArtist);