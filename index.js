const { exec } = require('child_process');
const express = require('express');
const { logErrors, errorHandler } = require('./middlewars/error_handler');
const app = express();
const PORT = 3001;
const routerApi = require('./routes');

routerApi(app);
app.use(express.json());
//MIDDLWARE AFTER ROUTERAPI(API)
app.use(logErrors);
app.use(errorHandler);

app.listen(PORT, () => {
    console.log('CORRIENDO');
    console.log(`http://192.168.1.113:${PORT}/`);
    console.log(`http://localhost:${PORT}/`);
});

/**VER IP PARA ACCEDER DESDE MOVILES */
// exec("ipconfig", (err, stdout) => {
//     console.log(stdout);
// })