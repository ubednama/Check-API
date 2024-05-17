const express = require('express');

const app = express();

const PORT = 3005;

app.get('/', (req, res) => {
    return res.json({message: 'OK'});
})

app.listen(PORT, () => {
    console.log(`Server started at port ${PORT}`);
});