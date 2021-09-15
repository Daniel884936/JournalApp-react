import { types } from '../types/types'
import {db} from '../firebase/firebase-config'
import { loadNotes } from '../helpers/loadNotes';
import Swal from 'sweetalert2';
import { fileUpload } from '../helpers/fileUpload';

// /react-journal

export const startNewNote = () =>{
    return async (dispatch, getState) =>{
        const {uid} = getState().auth;

        const newNote = {
            title : '',
            body : '',
            date : new Date().getTime()
        }
        const doc = await db.collection(`${ uid}/journal/notes`).add(newNote)
        console.log(doc)
        dispatch( activeNote(doc.id, newNote))
        dispatch( addNewNote(doc.id, newNote))
    }
} 

export const addNewNote = (id, note) =>({
    type: types.notesAddNew,
    payload: {
        id, 
        ...note
    }
})

 
export const activeNote = (id, note) =>({
    type: types.notesActive,
    payload: {
        id,
        ...note
    }
})

export const startLoadingNotes = (uid)=>{
    return async (dispatch) =>{
        const notes = await loadNotes(uid);
        dispatch( setNotes(notes) )
    }
}


export const setNotes = (notes) =>({
    type: types.notesLoad,
    payload: notes
})

export const sartSaveNote = (note)=>{
    return async (dispatch, getState) =>{
        const {uid} = getState().auth; 
        if (!note.url) {
            delete note.url
        }
        const noteToFiresote = {...note};
        delete noteToFiresote.id

        await db.doc(`${ uid }/journal/notes/${ note.id }`).update(noteToFiresote)
        dispatch(refreshNote(note.id, note))
        Swal.fire('Saved',note.title, 'success')
    }
}

export const refreshNote = (id, note) =>({
    type : types.notesUpdated,
    payload: {
        id, 
        note: {
            id,
            ...note
        }
    }
})


export const  startUploading = ( file ) =>{
    return async ( dispatch, getSate ) =>{
        const { active:activeNote } = getSate().notes;

        Swal.fire({
            title :'Uploading...', 
            text: 'Please wait...',
            allowOutsideClick : false,
            didOpen: () =>{
                Swal.showLoading()
            }
        });

         const fileUrl = await fileUpload( file ); 

         activeNote.url = fileUrl;

         dispatch(sartSaveNote( activeNote ))
         Swal.close();

         console.log(fileUrl)
    }
}

export const startDeleting = (id) =>{
    return async (dispatch, getSate) =>{
         const uid = getSate().auth.uid; 
         await db.doc(`${ uid }/journal/notes/${ id}`).delete()

         dispatch(deleteNote(id))         
    }
}

export const deleteNote = (id) =>({
    type: types.notesDelete,
    payload : id
})


export const noteLogout = () =>({
    type: types.notesLogoutCleaning
})
