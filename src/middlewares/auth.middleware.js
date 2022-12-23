import { connectionDB } from "../db/db";


export default async function authMiddleware(req, res, next){
    
    const { Authorization } = req.headers;

    const token = Authorization?.replace("Bearer ", "");

    try {
        const sessions = await connectionDB.query("SELECT * FROM sessions WHERE token=$1;", [token]);

        if(sessions.rowCount < 1) return res.sendStatus(401);

        const user = await connectionDB.query("SELECT * FROM users WHERE id=$1;", [sessions.rows[0].userId]);
        res.locals.user = user;

    } catch (error) {
        res.status(500).send(error.message);
    }

   next();
}