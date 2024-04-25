// used for editing html page and main operations/display

// either use fingertree as below or in head of index.html
// const FingerTree = require('./fingertree.js'); 
// var ft = FingerTree.fromArray([]);

const textarea = document.getElementById('textInput');
const opLogFTrope = document.getElementById('opLogFTrope');
const opLogBTrope = document.getElementById('opLogBTrope');

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
        logOperation2(`removed a character`)
    }
    
    // log operation for left/right
    if ([37, 39].includes(event.keyCode) && !event.shiftKey) {
        const direction = event.keyCode === 37 ? 'left' : 'right';
        logOperation(`Cursor moved ${direction}`);
    }
    
    // ensure ctrl+A, ctrl+x, ctrl+V & ctrl+C not usable 
    else if (event.ctrlKey && [65, 67, 86, 88].includes(event.keyCode))
    {
        event.preventDefault();
    }
    
    // log operation for alphanumeric key press
    // else if ( !event.key.match(/^[\x00-\x1F\x7F-\x9F]$/))
    else if ( event.key.length == 1 && /[a-zA-Z0-9]/.test(event.key))
    {
        logOperation(`You entered ${event.key}`);
    }
});

function logOperation(operation) {
    const logEntry = document.createElement('div');
    logEntry.textContent = operation;
    logEntry.classList.add("m-2", "border", "border-gray-400", "rounded-lg", "py-2", "px-4");
    // Insert new log entry at the beginning of the log
    opLogFTrope.insertBefore(logEntry, opLogFTrope.firstChild);
}

function logOperation2(operation) {
    const logEntry = document.createElement('div');
    logEntry.textContent = operation;
    logEntry.classList.add("m-2", "border", "border-gray-400", "rounded-lg", "py-2", "px-4");
    // Insert new log entry at the beginning of the log
    opLogBTrope.insertBefore(logEntry, opLogBTrope.firstChild);
}

