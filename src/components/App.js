import React, { Component } from 'react';

import NotesHeader from './NotesHeader';
import NotesEditor from './NotesEditor';
import NotesList from './NotesList';

import './App.css';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            notes: []
        };
    }

    componentDidMount() {
        const savedNotes = JSON.parse(localStorage.getItem('notes'));

        if (savedNotes) {
            this.setState({ notes: savedNotes });
        }
    }

    componentDidUpdate() {
        const notes = JSON.stringify(this.state.notes);
        localStorage.setItem('notes', notes);
    }

    handleNoteAdd = (newNote) => {
        this.setState({
            notes: [newNote, ...this.state.notes]
        });
    }

    handleNoteDelete = (noteId) => {
        this.setState({
            notes: this.state.notes.filter(note => note.id !== noteId)
        });
    }

    render() {
        return (
            <div className="notes">
                <NotesHeader />
                <NotesEditor onNoteAdd={this.handleNoteAdd} />
                <NotesList
                    notes={this.state.notes}
                    onNoteDelete={this.handleNoteDelete}
                />
            </div>
        );
    }
}

export default App;
