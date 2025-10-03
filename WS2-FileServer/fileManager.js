'use strict';

// fileManager.js
const fs = require('fs');
const logFile = 'app.log';

// 1. WRITE to a file (this overwrites the file if it exists)
fs.writeFile(logFile, 'Log started at ' + new Date() + '\n', (err) => {
    if (err) return console.error('Error writing file:', err);
    console.log('1. Log file created.');

    // 2. APPEND to the file (this adds to the end)
    fs.appendFile(logFile, 'User logged in.\n', (err) => {
        if (err) return console.error('Error appending to file:', err);
        console.log('2. User activity appended.');

        // 3. READ the file to see the result
        fs.readFile(logFile, 'utf8', (err, data) => {
            if (err) return console.error('Error reading file:', err);
            console.log('3. Current log content:\n---', data, '---');

            // If anyone wish to see the App.log file, comment out the code below and check your WS2-FileServer directory
            // 4. DELETE the file to clean up
            fs.unlink(logFile, (err) => {
                if (err) return console.error('Error deleting file:', err);
                console.log('4. Log file deleted.');
            });
        });
    });
});
