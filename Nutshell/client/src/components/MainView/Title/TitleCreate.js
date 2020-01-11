import React, { Component } from 'react';
import { createTitle } from '../../../API/titleManager';
import { Button, Icon } from 'semantic-ui-react'
import "./TitleCreate.css"


class TitleCreate extends Component {

    state = {
        name: ""
    }

    handleFieldChange = event => {
        const stateToChange = {}
        stateToChange[event.target.id] = event.target.value
        this.setState(stateToChange)
    }

    handleSubmit = event => {
        event.preventDefault()
        const newTitle = {
            name: this.state.name,
        }
        createTitle(newTitle).then(t => {
            this.props.updateTitles()
            this.props.history.push(`/home/titles/${t[0].id}`)
        })
    }

    render() {
        return (
            <>
                <input className="titleNameCreate" type="text" id="name" placeholder="new title" autoComplete="off" autoFocus onChange={this.handleFieldChange} value={this.state.name}></input>
                <p></p>
                <Button className="searchButton ui massive" onClick={this.handleSubmit}><Icon name="save"/></Button>
            </>
        )
    }
}

export default TitleCreate;