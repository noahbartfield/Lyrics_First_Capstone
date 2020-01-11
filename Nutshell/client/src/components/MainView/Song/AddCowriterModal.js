import React, { useState, useEffect } from 'react';
import { getListOfUsers, addCowriter } from '../../../API/cowriterManager';
import { Button, Modal } from 'semantic-ui-react'
import "./AddCowriterModal.css"

const AddCowriterModal = ({ title, songId, cowriters, findCowriters, closeConnectModal }) => {
    const [search, setSearch] = useState("");
    const [users, setUsers] = useState([]);
    
    const searchForFriend = searchValue => {
        const user = JSON.parse(localStorage.getItem('user'))
        
        getListOfUsers(searchValue).then(users => {
            const cowriterNames = cowriters.map(cs => cs.userName)
            console.log("cowriterNames", cowriterNames)
            const filteredUsers = users.filter(u => u.username !== user.username && !cowriterNames.includes(u.username))
            setUsers(filteredUsers)
        })
    }

    const handleConnect = async id => {
        const cowriterSongRel = { songId, userId: id }
        
        await addCowriter(cowriterSongRel)
        await findCowriters();

        closeConnectModal()
    }
    
    useEffect(() => {
        // DEBOUNCE
        if (search !== "") {
            searchForFriend(search)
        }
    }, [ search ])

    return (
            <>
                <Modal.Header className="connectModal">Add Cowriter to "{title}"?</Modal.Header>
                
                <input
                    className="searchCowriters"
                    type="text"
                    required
                    onChange={({ target: { value }}) => setSearch(value)}
                    id="search"
                />
                
                <div className="writerList">
                    {users && users.map(user => {
                        console.log(user.id)
                        
                        return (
                            <>
                                <div className="addCowriter">
                                    <div>
                                        <span>
                                            {user.username}
                                        </span>

                                       <Button className="addCowriterButton" onClick={() => handleConnect(user.id)}>Add</Button>
                                    </div>
                                </div>
                            </>
                        )
                    })}
                </div>
            </>
    );
}

export default AddCowriterModal;