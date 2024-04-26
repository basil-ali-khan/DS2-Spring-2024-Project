// used for editing html page and main operations/display

// either use fingertree as below or in head of index.html
// const FingerTree = require('./fingertree.js'); 
// var ft = FingerTree.fromArray([]);

// using fingerTree rope
// const Rope = require('./rope.js'); 
var ftRope = new Rope();


const textarea = document.getElementById('textInput');
const opLogFTrope = document.getElementById('opLogFTrope');
const opLogBTrope = document.getElementById('opLogBTrope');
const ftRope_data = document.getElementById('ftRope_data');

// Prevent mouse events from modifying the textarea
textarea.addEventListener('mousedown', function(event) {
    event.preventDefault();
});

// Allow focusing on textarea by clicking
textarea.addEventListener('click', function(event) {
    textarea.focus();
});

// Handle keyboard events
textarea.addEventListener('keydown', function(event) {
    
    // Prevent default behavior for Shift + left and Shift + right key combinations
    if ((event.shiftKey && event.keyCode === 37) || (event.shiftKey && event.keyCode === 39)) {
        event.preventDefault();
    }
    
    // Prevent usage up/down arrow keys
    if ([38, 40].includes(event.keyCode)) {
        event.preventDefault();
    }

    if (event.keyCode == 8) {
        // logOperation2(`removed a character`)
        var removedChar = ftRope.deleteCharacter();
        if (removedChar !== undefined) 
            logOperation(`deleted ${removedChar} at index ${ftRope.cursor + 1} in finger tree rope `)
    }
    
    // text case for enter
    if (event.keyCode == 13) {
        ftRope.insertCharacter('\n');
        logOperation(`inserted ${'\\n'} at index ${ftRope.cursor} in finger tree rope`)
    }

    else if (event.keyCode == 32) {
        ftRope.insertCharacter(' ');
        logOperation(`inserted ${'space'} at index ${ftRope.cursor} in finger tree rope`)
    }
    
    // log operation for left/right
    else if ([37, 39].includes(event.keyCode) && !event.shiftKey) {
        // const direction = event.keyCode === 37 ? 'left' : 'right';
        // logOperation(`Cursor decremented and index changed to ${direction}`);
        if (event.keyCode === 37) {
            ftRope.decrementCursor();
            logOperation(`Cursor decremented and index changed to ${ftRope.cursor}`);
        }
        else {
            ftRope.incrementCursor();
            logOperation(`Cursor incremented and index changed to ${ftRope.cursor}`);
        }
    }
    
    // ensure ctrl+y, ctrl+A, ctrl+x, ctrl+V & ctrl+C not usable 
    else if (event.ctrlKey && [37, 39, 65, 67, 86, 88, 89, 90].includes(event.keyCode))
    {
        event.preventDefault();
    }
    
    // log operation for alphanumeric key press
    // else if ( !event.key.match(/^[\x00-\x1F\x7F-\x9F]$/))
    // else if ( event.key.length == 1 && /[a-zA-Z0-9]/.test(event.key))
    else if ( event.key.length == 1)
    {
        // logOperation(`You entered ${event.key}`);
        ftRope.insertCharacter(event.key);
        logOperation(`inserted ${event.key} at index ${ftRope.cursor} in finger tree rope `)
    }
});

function logOperation(operation) {
    const logEntry = document.createElement('div');
    logEntry.textContent = operation;
    logEntry.classList.add("m-2", "border", "border-gray-400", "rounded-lg", "py-2", "px-4");
    // Insert new log entry at the beginning of the log
    opLogFTrope.insertBefore(logEntry, opLogFTrope.firstChild);

    ftRope_data.innerText = ftRope.printRope(); // print rope
}

// function logOperation2(operation) {
//     const logEntry = document.createElement('div');
//     logEntry.textContent = operation;
//     logEntry.classList.add("m-2", "border", "border-gray-400", "rounded-lg", "py-2", "px-4");
//     // Insert new log entry at the beginning of the log
//     opLogBTrope.insertBefore(logEntry, opLogBTrope.firstChild);
// }

