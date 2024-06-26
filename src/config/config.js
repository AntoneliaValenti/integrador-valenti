const dotenv = require('dotenv')
const { Command } = require('commander')

const program = new Command()

program
    .option('-d', 'Variable para debug', false)
    .option('-p <port>', 'Puerto del servidor', 8080)
    .option('--mode <mode>', 'Modo de trabajo', 'develop')
program.parse()

console.log("Mode Option: ", program.opts().mode)

const environment = program.opts().mode

dotenv.config({
    path: environment === "production" ? "./src/config/.env.production" : "./src/config/.env.development"
})


const config = {
    PORT: process.env.PORT,
    mongoUrl: process.env.MONGO_URL,
    adminName: process.env.ADMIN_NAME,
    adminPassword: process.env.ADMIN_PASSWORD,
    environment: environment
}

module.exports = config