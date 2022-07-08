require('dotenv').config()
const app = require('./app')
const {appConfig, dbConfig} = require('./config')
const connectDb = require('./db/mongodb')

async function initApp(appConfig, dbConfig) {
    try {
        await connectDb(dbConfig)
        app.listen(appConfig.port, () => console.log(`Listening on port ${appConfig.port}`))
    } catch (e) {
        console.error(e);
        process.exit(0)
    }
}

initApp(appConfig, dbConfig)
