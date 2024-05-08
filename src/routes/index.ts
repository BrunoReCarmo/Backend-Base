import auth from "./auth";
import ProtectedRoutes from "./(protected)";
import express from "express";

const route = express();

route.use(auth);
route.use(ProtectedRoutes);

export = route;