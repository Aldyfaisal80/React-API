import express from "express";
import Logging from "./helpers/Logging.js";
import dotenv from "dotenv";
import mysql from "mysql2/promise";
import cors from "cors";
import logging from "./helpers/Logging.js";
const app = express();
dotenv.config();
app.use(cors())

const connection = await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
})

app.use(express.json());

const postRouter = express.Router();
const categoryRouter = express.Router();
const userRouter = express.Router();

const PORT = process.env.PORT;

const data = [
    {
        id: 1,
        post: "post 1",
        authorId: 1
    },
    {
        id: 2,
        post: "post 2",
        authorId: 2
    },
    {
        id: 3,
        post: "post 3",
        authorId: 3
    }
]


const validate = (schema) => (_, r, n) => {
    Logging.info(_)
    const { authorization } = _.headers;
    const token = authorization?.startsWith("Bearer") ? authorization.split(" ")[1] : null;
    Logging.success({ token })
    const { post } = _.body;
    if (!post) {
        console.log("tidak ada post")
    } else {
        console.log(schema)
        n()
    }
}

postRouter.get('/', async (req, res) => {
    try {
        const sql = 'SELECT * FROM posts';
        const [data] = await connection.query(sql);
        return res.status(200).json({
            status: true,
            statusCode: 200,
            message: "Success retrieve posts data",
            data
        })
    } catch (error) {
        return res.status(500).json({
            status: false,
            statusCode: 500,
            message: `${error}`
        })
    }
})

postRouter.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const sql = 'SELECT * FROM posts WHERE id = ?';
        const VALUES = [id];
        const [data] = await connection.query(sql, VALUES);
        return res.status(200).json({
            status: true,
            statusCode: 200,
            message: "Success retrieve posts data",
            data
        })
    } catch (error) {
        return res.status(500).json({
            status: false,
            statusCode: 500,
            message: `${error}`
        })
    }
})

postRouter.post('/', async (req, res) => {

    const { content } = req.body;

    if (!content) {
        return res.status(404).json({
            status: false,
            statusCode: 404,
            message: "Some fields are missing"
        })
    }
    try {
        const sql = `INSERT INTO posts (content) VALUES (?)`;
        const VALUES = [content];

        const [data] = await connection.execute(sql, VALUES);
        return res.status(200).json({
            status: true,
            statusCode: 200,
            message: "Success create posts data",
            data
        })
    } catch (error) {
        return res.status(500).json({
            status: false,
            statusCode: 500,
            message: `${error}`
        })
    }
})

postRouter.put('/:id', async (req, res) => {
    const { content } = req.body
    const { id } = req.params;
    try {
        const sql = 'UPDATE posts SET content = ? WHERE id = ?';
        const VALUES = [content, id];
        const [data] = await connection.execute(sql, VALUES);
        return res.status(200).json({
            status: true,
            statusCode: 200,
            message: "Success update posts data",
            data
        })
    } catch (error) {
        return res.status(500).json({
            status: false,
            statusCode: 500,
            message: `${error}`
        })
    }
})

postRouter.patch('/:id', async (req, res) => {
    const { content } = req.body
    const { id } = req.params;
    try {
        const sql = 'UPDATE posts SET content = ? WHERE id = ?';
        const VALUES = [content, id];
        const [data] = await connection.execute(sql, VALUES);
        return res.status(200).json({
            status: true,
            statusCode: 200,
            message: "Success update posts data",
            data
        })
    } catch (error) {
        return res.status(500).json({
            status: false,
            statusCode: 500,
            message: `${error}`,
        })
    }
})

postRouter.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const sql = 'DELETE FROM posts WHERE id = ?';
        const VALUES = [id];
        const [data] = await connection.execute(sql, VALUES);
        return res.status(200).json({
            status: true,
            statusCode: 200,
            message: "Success delete posts data",
            data
        })
    } catch (error) {
        return res.status(500).json({
            status: false,
            statusCode: 500,
            message: `${error}`,
        })
    }
})


app.use("/posts", postRouter);
app.use("/categories", categoryRouter);
app.use("/users", userRouter);

app.listen(PORT, () => {
    Logging.info("Press CTRL+C to stop server");
    Logging.info(`Server UP 🗿 running on http://localhost:${PORT}`);
})