const express = require('express');
const fs = require('fs');
const app = express();
const PORT = 3000;

app.use(express.static('public'));
app.use(express.json());

app.post('/clocking', (req, res) => {
    const { name, action } = req.body;
    const currentTime = new Date().toISOString();

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
        });
    });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
