import "reflect-metadata";
import * as dotenv from 'dotenv'

dotenv.config()

import app from "./app";

import {
    AppDataSource
} from "./config/data-source";

const PORT =
    Number(process.env.PORT) || 3000;

async function startServer() {

    try {

        await AppDataSource.initialize();

        console.log(
            "Banco conectado com sucesso"
        );

        app.listen(
            PORT,
            "0.0.0.0",
            () => {

                console.log(
                    `Servidor executando na porta ${PORT}`
                );
            }
        );

    } catch (error) {

        console.error(
            "Erro ao iniciar servidor:",
            error
        );

        process.exit(1);
    }
}

startServer();