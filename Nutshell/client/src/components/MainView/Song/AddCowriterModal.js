import React, { Component, FormattedMessage } from 'react';
import { Link, Route } from 'react-router-dom';
import { getListOfUsers, addCowriter } from '../../../API/cowriterManager';
import { Button, Icon, Modal } from 'semantic-ui-react'
import { debounce } from "debounce";
import "./AddCowriterModal.css"

class AddCowriterModal extends Component {

    state = {
        search: "",
        users: []
    }


    handleFieldChange = event => {
        const stateToChange = {}
        stateToChange[event.target.id] = event.target.value
        this.setState(stateToChange)
    }

    searchForFriend = (q) => {
        const user = JSON.parse(localStorage.getItem('user'))
        getListOfUsers(q.target.value).then(users => {
            const cowriterNames = this.props.cowriters.map(cs => cs.userName)
            console.log("cowriterNames", cowriterNames)
            const filteredUsers = users.filter(u => u.username !== user.username && !cowriterNames.includes(u.username))
            this.setState({ users: filteredUsers })
        })
    }


    handleConnect = id => {
        const cowriterSongRel = { songId: this.props.songId, userId: id }
        addCowriter(cowriterSongRel)
            .then(() => this.props.findCowriters())
        this.props.closeConnectModal()
    }

    render() {
        return (
            <>
                <Modal.Header className="connectModal">Add Cowriter to "{this.props.title}"?</Modal.Header>
                <input
                    className="searchCowriters"
                    type="text"
                    required
                    onChange={this.handleFieldChange}
                    onKeyUp={this.searchForFriend}
                    id="search"
                />
                <div className="writerList">
                    {this.state.users.map(user => {
                        console.log(user.id)
                        return (
                            <>
                                <div className="addCowriter">
                                    <div>
                                        <span>
                                            {user.username}
                                        </span>
                                        <Button className="addCowriterButton" onClick={() => this.handleConnect(user.id)}>Add</Button>
                                    </div>
                                </div>
                            </>
                        )
                    })}
                </div>
            </>
        )
    }
}

export default AddCowriterModal;