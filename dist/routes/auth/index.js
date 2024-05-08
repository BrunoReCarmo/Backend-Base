"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const express_1 = require("express");
const _utils_1 = require("../../utils");
const _queries_1 = require("../../queries");
const _config_1 = __importDefault(require("../../config"));
var bcrypt = require('bcryptjs');
const auth = (0, express_1.Router)();
auth.post("/login", (req, res) => {
    const { email, passwd } = req.body;
    const sql = _queries_1.queries.auth.login;
    _config_1.default.query(sql, [email], (err, result) => __awaiter(void 0, void 0, void 0, function* () {
        if (err) {
            console.error(_utils_1.messages.Error.ConnectionDB, err);
            return res.json({ message: _utils_1.messages.Error.source });
        }
        try {
            if (result.length > 0) {
                const hashedPassword = result[0].passwd;
                // Comparar a senha fornecida com o hash armazenado
                const passwordMatch = yield bcrypt.compare(passwd, hashedPassword);
                if (passwordMatch) {
                    const { id, nome, email, passwd } = result[0];
                    const token = jsonwebtoken_1.default.sign({ id, nome, email }, _utils_1.jwt_secret_key, {
                        expiresIn: "24h",
                    });
                    return res.json({
                        Login: true,
                        token,
                        data: { id, nome, email, passwd },
                        message: _utils_1.messages.Success.source,
                    });
                }
                else {
                    return res.json({ message: _utils_1.messages.Error.auth.WrongPasswd });
                }
            }
            else {
                return res.json({ message: _utils_1.messages.Error.auth.NotFound });
            }
        }
        catch (error) {
            console.error(_utils_1.messages.Error.auth.NotFound, error);
            return res.json({ message: _utils_1.messages.Error.DuringJob });
        }
    }));
});
auth.post("/signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { nome, email, passwd } = req.body;
    const saltRounds = 10;
    try {
        const hashedPassword = yield bcrypt.hash(passwd, saltRounds);
        const sql = _queries_1.queries.auth.signUp;
        _config_1.default.query(sql, [nome, email, hashedPassword], (err, data) => {
            if (err) {
                console.error(_utils_1.messages.Error.executingQuery, err);
                return res.json({ message: _utils_1.messages.Error.source });
            }
            return res.json({ message: _utils_1.messages.Success.source, data });
        });
    }
    catch (error) {
        console.error(_utils_1.messages.Error.DuringJob, "hashing", error);
        return res.json({ message: _utils_1.messages.Error.source });
    }
}));
exports.default = auth;
