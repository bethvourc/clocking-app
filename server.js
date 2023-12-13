const express = require('express');
const fs = require('fs');
const app = express();
const PORT = 3000;
const {exec} = require('child_process');

app.use(express.static('public'));
app.use(express.json());

app.post('/clocking', (req, res) => {
    const { name, action } = req.body;
    const currentTime = new Date().toLocaleString(); // Format the time as a human-readable string

    fs.readFile('./data/timesheets.json', (err, data) => {
        if (err) throw err;
        let timesheets = JSON.parse(data);

        if(action === 'sign_in') {
            timesheets[name] = { ...timesheets[name], clockIn: currentTime };
        } else if(action === 'sign_out') {
            timesheets[name] = { ...timesheets[name], clockOut: currentTime };
        }

        fs.writeFile('./data/timesheets.json', JSON.stringify(timesheets), (err) => {
            if (err) throw err;
            res.json({ message: `Successfully recorded ${action.replace('_', ' ')} for ${name} at ${currentTime}` });

            exec('python3 ./data/json_to_excel.py', (error, stdout, stderr) => {
                if (error) {
                    console.error(`Error executing Python script: ${error}`);
                }
            });
        });
    });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
