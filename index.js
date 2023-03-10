require('module-alias/register')
const { exec } = require('child_process');
const express = require('express');
const { logErrors, errorHandler, boomErrorHanlder } = require('@middlewars/error_handler.js');
const app = express();
const PORT = process.env.PORT || `3001`;
const routerApi = require('@routes/index.js');
const cors = require('cors');

const whitelist = [""];
const allAllowed = true;
const corsOptions = {
    origin: (origin, callback) => {
        // if (whitelist.includes(origin)) {
        if (allAllowed) {
            callback(null, true)
        } else {
            callback(new Error("no permitido"))
        }
    }
}
app.use(cors(corsOptions));
app.use(express.json());
routerApi(app);
//MIDDLWARE AFTER ROUTERAPI(API)
app.use(logErrors);
app.use(boomErrorHanlder);
app.use(errorHandler);

app.listen(`${PORT}`, () => {
    console.log('CORRIENDO');
    console.log(`el puerto es ${PORT}`);
    // console.log(`http://192.168.1.113:${PORT}/`);
    console.log(`http://localhost:${PORT}/`);
});

/**VER IP PARA ACCEDER DESDE MOVILES */
// exec("ipconfig", (err, stdout) => {
//     console.log(stdout);
// })