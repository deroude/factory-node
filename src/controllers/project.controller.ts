import { Router } from "express";

export class ProjectController {
    constructor(public routes: Router) {
        this.routes.get("/", (req: any, res: any) => {
            res.json({
                message: "Hello World!"
            });
        });
    }
}