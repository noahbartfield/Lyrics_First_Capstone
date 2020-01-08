import React, { Component } from 'react';
import { getTitleById, deleteTitle } from '../../../API/titleManager';
import { Button, Icon, Modal } from 'semantic-ui-react'
import "./TitleDetails.css"


class TitleDetails extends Component {

    state = {
        name: "",
        deleteVisable: false
    }

    componentDidMount() {
        const titleId = parseInt(this.props.match.params.titleId)
        getTitleById(titleId).then(title => this.setState({ name: title.name }))
    }

    componentDidUpdate(oldProps) {
        const titleId = parseInt(this.props.match.params.titleId)
        const oldPropTitleId = parseInt(oldProps.match.params.titleId)
        if (oldPropTitleId !== titleId) {
            getTitleById(titleId).then(title => this.setState({ name: title.name }))
        }
    }

    handleDeleteTitle = id => {
        deleteTitle(id)
            .then(() => {
                this.props.updateTitles()
            })
        this.props.history.push(`/home/lyricsFirst`)
    }

    handlePreDeleteTitle = () => {
        this.setState({ deleteVisable: true })
    }

    handleCancelDeleteTitle = () => {
        this.setState({ deleteVisable: false })
    }


    render() {
        const titleId = parseInt(this.props.match.params.titleId)
        return (
            <>
                <div>
                    <div className="titleName">
                        {this.state.name}
                    </div>
                </div>
                <Button className="editTitleButton" onClick={() => { this.props.history.push(`/home/titles/${titleId}/edit`) }}><Icon name="edit" /></Button>
                <span>
                    {this.state.deleteVisable === false
                        ? <Button className="preDeleteTitleButton" onClick={() => this.handlePreDeleteTitle()}><Icon name="trash" /></Button>
                        :
                        <>
                            <span>
                                <Button className="preDeleteTitleButton" onClick={() => this.handleCancelDeleteTitle()}><Icon name="cancel" /></Button>
                            </span>
                            <span>
                                <Button className="deleteTitleButton" onClick={() => this.handleDeleteTitle(titleId)}><Icon name="trash" /></Button>
                            </span>
                        </>}
                </span>
            </>
        )
    }
}

export default TitleDetails;