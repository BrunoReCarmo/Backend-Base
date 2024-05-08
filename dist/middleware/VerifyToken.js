"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const _utils_1 = require("../utils");
const MidVerifyToken = (req, res, next) => {
    const token = req.header('Authorization');
    if (!token)
        return res.status(401).json({ message: 'Access refused' });
    try {
        const decoded = jsonwebtoken_1.default.verify(token, _utils_1.jwt_secret_key);
        req.userId = decoded.id;
        next();
    }
    catch (error) {
        res.status(400).json({ message: 'Invalid Token' });
    }
};
module.exports = MidVerifyToken;
