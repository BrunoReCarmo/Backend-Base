"use strict";
const express_1 = require("express");
const _middleware_1 = require("../../middleware");
const ProtectedRoutes = (0, express_1.Router)();
ProtectedRoutes.get('/test', _middleware_1.MidVerifyToken, (req, res) => {
    return res.send("Hello Word, Middleware is working");
});
module.exports = ProtectedRoutes;
