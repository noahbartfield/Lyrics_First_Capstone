import React, { Component } from 'react';
import { getWordById, deleteWord } from '../../../API/wordManager';
import { Button, Icon, Modal } from 'semantic-ui-react'
import "./WordDetails.css"


class WordDetails extends Component {

    state = {
        name: "",
        definition: "",
        deleteVisable: false
    }

    componentDidMount() {
        const wordId = parseInt(this.props.match.params.wordId)
        getWordById(wordId).then(word => this.setState({ name: word.name, definition: word.definition }))
    }

    componentDidUpdate(oldProps) {
        const wordId = parseInt(this.props.match.params.wordId)
        const oldPropWordId = parseInt(oldProps.match.params.wordId)
        if (oldPropWordId !== wordId) {
            getWordById(wordId).then(word => this.setState({ name: word.name, definition: word.definition }))
        }
    }

    handleDeleteWord = id => {
        deleteWord(id)
            .then(() => {
                this.props.updateWords()
            })
        this.props.history.push(`/home/lyricsFirst`)
    }

    handlePreDeleteWord = () => {
        this.setState({ deleteVisable: true })
    }

    handleCancelDeleteWord = () => {
        this.setState({ deleteVisable: false })
    }


    render() {
        const wordId = parseInt(this.props.match.params.wordId)
        return (
            <>
                <div>
                    <div className="wordName">
                        {this.state.name}
                    </div>
                </div>
                <div className="definitionContainer">
                    <div className="definition">
                        Definition:
                            </div>
                    <div className="definitionOfWord">
                        {this.state.definition}
                    </div>
                </div>
                <Button className="editWordButton" onClick={() => { this.props.history.push(`/home/words/${wordId}/edit`) }}><Icon name="edit" /></Button>
                <span>
                    {this.state.deleteVisable === false
                        ? <Button className="preDeleteWordButton" onClick={() => this.handlePreDeleteWord()}><Icon name="trash" /></Button>
                        :
                        <>
                            <span>
                                <Button className="preDeleteWordButton" onClick={() => this.handleCancelDeleteWord()}><Icon name="cancel" /></Button>
                            </span>
                            <span>
                                <Button className="deleteWordButton" onClick={() => this.handleDeleteWord(wordId)}><Icon name="trash" /></Button>
                            </span>
                        </>}
                </span>
            </>
        )
    }
}

export default WordDetails;