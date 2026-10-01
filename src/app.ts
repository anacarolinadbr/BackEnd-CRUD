import express from "express";
import cors from "cors";

import userRoutes from "./routes/user.routes";

const app = express();

app.use(cors());

app.use(express.json());

app.get("/", (req, res) => {

    return res.json({
        message: "API funcionando"
    });
});

app.get("/health", (req, res) => {

    return res.status(200).json({
        status: "ok"
    });
});

app.use(
    "/users",
    userRoutes
);

export default app;