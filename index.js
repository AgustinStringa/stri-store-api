const { exec } = require('child_process');
const express = require('express');
const app = express();
const PORT = 3001;
const products_router = require('./routes/products');
const routerApi = require('./routes');

routerApi(app);

app.listen(PORT, () => {
    console.log('CORRIENDO');
    console.log(`http://192.168.1.113:${PORT}/`);
});

/**VER IP PARA ACCEDER DESDE MOVILES */
// exec("ipconfig", (err, stdout) => {
//     console.log(stdout);
// })