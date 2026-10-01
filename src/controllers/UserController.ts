import {
    Request,
    Response
} from "express";

import { UserService } from "../services/UserService";

export class UserController {

    private userService = new UserService();

    findAll = async (
        req: Request,
        res: Response
    ) => {

        try {

            const users =
                await this.userService.findAll();

            return res.json(users);

        } catch (error) {

            console.error(error);

            return res.status(500).json({
                message: "Erro ao buscar usuários"
            });
        }
    };

    findById = async (
        req: Request,
        res: Response
    ) => {

        try {

            const id = Number(req.params.id);

            const user =
                await this.userService.findById(id);

            if (!user) {

                return res.status(404).json({
                    message: "Usuário não encontrado"
                });
            }

            return res.json(user);

        } catch (error) {

            console.error(error);

            return res.status(500).json({
                message: "Erro ao buscar usuário"
            });
        }
    };

    create = async (
        req: Request,
        res: Response
    ) => {

        try {

            const {
                name,
                email
            } = req.body;

            if (!name || !email) {

                return res.status(400).json({
                    message:
                        "Nome e email são obrigatórios"
                });
            }

            const user =
                await this.userService.create(
                    name,
                    email
                );

            return res.status(201).json(user);

        } catch (error) {

            console.error(error);

            return res.status(500).json({
                message: "Erro ao criar usuário"
            });
        }
    };

    update = async (
        req: Request,
        res: Response
    ) => {

        try {

            const id = Number(req.params.id);

            const {
                name,
                email
            } = req.body;

            if (!name || !email) {

                return res.status(400).json({
                    message:
                        "Nome e email são obrigatórios"
                });
            }

            const user =
                await this.userService.update(
                    id,
                    name,
                    email
                );

            if (!user) {

                return res.status(404).json({
                    message: "Usuário não encontrado"
                });
            }

            return res.json(user);

        } catch (error) {

            console.error(error);

            return res.status(500).json({
                message: "Erro ao atualizar usuário"
            });
        }
    };

    delete = async (
        req: Request,
        res: Response
    ) => {

        try {

            const id = Number(req.params.id);

            const deleted =
                await this.userService.delete(id);

            if (!deleted) {

                return res.status(404).json({
                    message: "Usuário não encontrado"
                });
            }

            return res.status(204).send();

        } catch (error) {

            console.error(error);

            return res.status(500).json({
                message: "Erro ao excluir usuário"
            });
        }
    };
}