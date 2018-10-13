import express, { Router } from 'express';
import compression from "compression";
import bodyParser from "body-parser";
import lusca from "lusca";
import passport from "passport";
import expressValidator from "express-validator";
import { ProjectController } from './controllers/project.controller';

class App {
    public srv: any;

    constructor() {
        this.srv = express()
            .set("port", process.env.PORT || 3000)
            .use(compression())
            .use(bodyParser.json())
            .use(bodyParser.urlencoded({ extended: true }))
            .use(expressValidator())
            .use(passport.initialize())
            .use(passport.session())
            .use(lusca.xframe("SAMEORIGIN"))
            .use(lusca.xssProtection(true));
        this.populateRoutes(Router());
    }

    populateRoutes(router: Router) {
        this.srv.use("/project", new ProjectController(router).routes);
    }

}

export default new App().srv