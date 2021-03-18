const add = document.querySelector('.add');
const notesCon = document.querySelector('.notes-container');

const savedNotes = JSON.parse(localStorage.getItem('notes'));

if (savedNotes) {
    savedNotes.forEach(note => {
        addNewNote(note);
    });
}

add.addEventListener('click', (e) => {
    addNewNote();
});

function addNewNote(noteText = '') {
    const note = document.createElement('div');
    note.classList.add('notes');
    console.log(note);
    note.innerHTML = `
        <div class="tools d-flex">
            <button class="edit"><i class="fas fa-pen "></i></button>
            <button class="delete"><i class="fas fa-trash "></i></button>
        </div>
        <div class="editor ${noteText ? 'hidden' : ''}">
            <textarea name="" id="editor" "></textarea>
        </div>
        <div class=" main  ${noteText ? '' : 'hidden'}"></div>`;

    const editBtn = note.querySelector('.edit');
    const deleteBtn = note.querySelector('.delete');
    const editor = note.querySelector('.editor');
    const main = note.querySelector('.main');
    const textarea = note.querySelector('#editor')

    textarea.value = noteText;
    main.innerHTML = marked(noteText);

    textarea.addEventListener('input', e => {
        const { value } = e.target;
        main.innerHTML = marked(value);
        updateLStorage();
    });

    editBtn.addEventListener('click', () => {
        console.log('clicked');
        editor.classList.toggle('hidden');
        main.classList.toggle('hidden');
    });

    deleteBtn.addEventListener('click', () => {
        note.remove();
        updateLStorage();
    });

    notesCon.appendChild(note);
}
function updateLStorage() {
    const allNotes = document.querySelectorAll("textarea");

    const notes = [];

    allNotes.forEach(n => {
        notes.push(n.value);
    });

    localStorage.setItem('notes', JSON.stringify(notes));
}