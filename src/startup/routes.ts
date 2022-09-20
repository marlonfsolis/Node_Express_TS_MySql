import {Express} from "express";

import {debug} from "./debuggers";

import routes_index from "../routes/index";
import routes_users from "../routes/users";
import permission_routes from "../routes/permissionRoutes";


const routesLoader = (app: Express) => {

    debug("Loading routes...");

    app.use("/api", routes_index);
    app.use("/api/users", routes_users);
    app.use("/api/permissions", permission_routes);

    debug("Routes loaded.");
};

export default routesLoader;
