import React, { Component, FormattedMessage } from 'react';
import { Link, Route } from 'react-router-dom';
import { getListOfUsers, addCowriter } from '../../../API/cowriterManager';
import { Button, Icon, Modal } from 'semantic-ui-react'
import { debounce } from "debounce";

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
        getListOfUsers(q.target.value).then(users => {
            this.setState({ users: users })
        })
    }

    
    handleConnect = id => {
        const cowriterSongRel = {songId: this.props.songId, userId: id}
        addCowriter(cowriterSongRel)
        this.props.closeConnectModal()
    }

    render() {
        return (
            <>
                <Modal.Header className="connectModal">Add Cowriter to "{this.props.title}"?</Modal.Header>
                <input
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
                                <div>
                                    {user.username}
                                </div>
                                <Button onClick={() => this.handleConnect(user.id)}>Add</Button>
                            </>
                        )
                    })}
                </div>
            </>
        )
    }
}

export default AddCowriterModal;