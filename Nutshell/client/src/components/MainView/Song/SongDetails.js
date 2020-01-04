import React, { Component, FormattedMessage } from 'react';
import { Link, Route } from 'react-router-dom';
import { getSongs, getSongById, deleteSong } from '../../../API/songManager';
import { getAllWords, deleteWord } from '../../../API/wordManager';
import { getCowriters, getSpecificUser } from '../../../API/cowriterManager';
import { Button, Modal, Icon } from 'semantic-ui-react'
import "./SongDetails.css"
import { isEqual } from 'lodash'


class SongDetails extends Component {

    state = {
        title: "",
        lyrics: "",
        cowriterNames: [],
        writerName: "",
        userId: "",
        deleteVisable: false
    }

    componentDidMount() {
        const songId = parseInt(this.props.match.params.songId)
        getSongById(songId).then(song => this.setState({ title: song.title, lyrics: song.lyrics, userId: song.userId }))
            .then(() => this.findWriter()).then(() => this.findCowriters())
    }

    componentDidUpdate(prevProps, prevState) {
        const songId = parseInt(this.props.match.params.songId)
        const oldPropSongId = parseInt(prevProps.match.params.songId)
        const cowriterArray = this.state.cowriterNames
        const oldCowriterArray = prevState.cowriterNames
        const writerName = this.state.writerName
        const oldWriterName = prevState.writerName
        if (oldPropSongId !== songId) {
            console.log("finding song in componentDidUpdate")
            getSongById(songId).then(song => this.setState({ title: song.title, lyrics: song.lyrics, userId: song.userId }))
                .then(() => this.findWriter()).then(() => this.findCowriters())
        }
        if (!isEqual(oldCowriterArray, cowriterArray)) {
            console.log("finding cowriters in componentDidUpdate")
            this.findCowriters()
        }
        if (!isEqual(oldWriterName, writerName)) {
            console.log("finding writerName in componentDidUpdate")
            this.findWriter()
        }
    }

    findCowriters = () => {
        const songId = parseInt(this.props.match.params.songId)
        console.log(songId)
        getCowriters(songId).then(cs => {
            const names = cs.map(csr => {
                return csr.userName
            });
            this.setState({ cowriterNames: names })
        })
    }

    findWriter = () => {
        const songId = parseInt(this.props.match.params.songId)
        console.log(songId)
        getSpecificUser(this.state.userId).then(user => {
            this.setState({ writerName: user.username })
        })
    }

    handleDeleteSong = id => {
        getAllWords().then(words => {
            let matchingWords = []
            words.forEach(w => {
                if (w.definition === this.props.match.params.songId.toString() && w.visable === false) {
                    matchingWords.push(w)
                }
            });
            matchingWords.forEach(word => {
                deleteWord(word.id)
            });
        })
        deleteSong(id)
            .then(() => {
                this.props.updateSongs()
            })

        this.props.history.push(`/home/lyricsFirst`)
        this.setState({ deleteVisable: false })
    }

    handlePreDeleteSong = () => {
        this.setState({ deleteVisable: true })
    }

    handleCancelDeleteSong = () => {
        this.setState({ deleteVisable: false })
    }

    render() {
        const songId = parseInt(this.props.match.params.songId)
        const user = JSON.parse(localStorage.getItem('user'))
        return (
            <>
                <div className="songTitleDetails">
                    {this.state.title}
                </div>
                <p></p>
                Written By:
                    <span className="writer">
                    {` ${this.state.writerName}*`}
                </span>
                {this.state.cowriterNames.map(c => {
                    console.log(c)
                    return (
                        <span className="writer" key={Math.random()}>
                            {` | ${c}`}
                        </span>
                    )
                })}
                <p></p>
                <Button className="editButton" onClick={() => { this.props.history.push(`/home/songs/${songId}/edit`) }}><Icon name="edit" /></Button>
                {user.username == this.state.writerName &&
                    <span>
                        {this.state.deleteVisable === false
                            ? <Button className="preDeleteSongButton" onClick={() => this.handlePreDeleteSong()}><Icon name="trash" /></Button>
                            :
                            <>
                                <span>
                                    <Button className="preDeleteSongButton" onClick={() => this.handleCancelDeleteSong()}><Icon name="cancel" /></Button>
                                </span>
                                <span>
                                    <Button className="deleteSongButton" onClick={() => this.handleDeleteSong(songId)}><Icon name="trash" /></Button>
                                </span>
                            </>}
                    </span>
                }
                <div className="lyricsContainer">
                    <div></div>
                    <div className="lineBreaks songLyrics">
                        {this.state.lyrics}
                    </div>
                    <div></div>
                </div>
            </>
        )
    }
}

export default SongDetails;