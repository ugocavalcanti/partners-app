const app = require("./api");


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`I'm listening a ${process.env.environment} environment, port ${PORT}`));
