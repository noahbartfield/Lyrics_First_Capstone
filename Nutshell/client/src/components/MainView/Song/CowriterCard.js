import React, { Component } from 'react';
import { deleteCowriter } from '../../../API/cowriterManager';
import { Button, Icon } from 'semantic-ui-react'
import "./CowriterCard.css"


class CowriterCard extends Component {

    state = {
        areYouSureVisable: false
    }

    handlePreDeleteCowriter = () => {
        this.setState({ areYouSureVisable: true })
    }

    handleDeleteCowriter = (userId, songId) => {
        deleteCowriter(userId, songId)
            .then(() => this.props.findCowriters())
        this.setState({ areYouSureVisable: false })

    }

    handleCancelDeleteCowriter = () => {
        this.setState({ areYouSureVisable: false })
    }

    render() {
        const user = JSON.parse(localStorage.getItem('user'))
        return (
            <span className="writer" key={Math.random()}>
                <span>
                    {` | ${this.props.cowriter.userName}`}
                </span>
                {user.username === this.props.writerName &&
                    <span>
                        {this.state.areYouSureVisable === false
                            ? <Button className="preDeleteButton" onClick={() => this.handlePreDeleteCowriter()}><Icon name="trash" /></Button>
                            :
                            <>
                                <span>
                                    <Button className="preDeleteButton" onClick={() => this.handleCancelDeleteCowriter()}><Icon name="cancel" /></Button>
                                </span>
                                <span>
                                    <Button className="deleteButton" onClick={() => this.handleDeleteCowriter(this.props.cowriter.userId, this.props.cowriter.songId)}><Icon name="trash" /></Button>
                                </span>
                            </>}
                    </span>
                }
            </span>
        )
    }
}

export default CowriterCard