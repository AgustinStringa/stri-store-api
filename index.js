const { exec } = require('child_process');
const express = require('express');
const app = express();
const PORT = 3001;
const routerApi = require('./routes');

app.use(express.json())
routerApi(app);

app.listen(PORT, () => {
    console.log('CORRIENDO');
    console.log(`http://192.168.1.113:${PORT}/`);
    console.log(`http://localhost:${PORT}/`);
});

/**VER IP PARA ACCEDER DESDE MOVILES */
// exec("ipconfig", (err, stdout) => {
//     console.log(stdout);
// })