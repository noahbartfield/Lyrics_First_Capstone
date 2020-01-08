import React, { Component } from 'react';
import { getWordById, editWord } from '../../../API/wordManager';
import { Button, Icon } from 'semantic-ui-react'
import "./WordEdit.css"


class WordEdit extends Component {

    state = {
        name: "",
        definition: "",
        wordId: 0
    }

    componentDidMount() {
        const wordId = parseInt(this.props.match.params.wordId)
        getWordById(wordId).then(word => this.setState({ name: word.name, definition: word.definition, wordId: wordId }))
    }

    handleFieldChange = evt => {
        const stateToChange = {}
        stateToChange[evt.target.id] = evt.target.value
        this.setState(stateToChange)
    }

    handleSubmit = event => {
        event.preventDefault()
        const foundWord = this.props.words.find(w => w.id === this.state.wordId)
        foundWord.name = this.state.name
        foundWord.definition = this.state.definition
        editWord(this.state.wordId, foundWord).then(() => this.props.history.push(`/home/words/${this.state.wordId}`))
    }

    render() {
        return (
            <>
                <input className="wordNameEdit" type="text" id="name" onChange={this.handleFieldChange} value={this.state.name}></input>
                <p></p>
                    <Button className="saveButton ui massive" onClick={this.handleSubmit}><Icon name="save"/></Button>
                <div>
                    <textarea className="definitionEdit" rows="15" cols="45" type="text" id="definition" onChange={this.handleFieldChange} value={this.state.definition}></textarea>
                </div>
            </>
        )
    }
}

export default WordEdit;