import { nanoid } from "nanoid";
import { connectionDB } from "../db/db";

export async function create(req, res){

    const { url } = req.body;
    const user = res.locals.user;

    try {
        
        const shortUrl = nanoid();
        await connectionDB.query(`INSERT INTO links (url,"userId","shortUrl") VALUES ($1, $2, $3)`, [url, user.id, shortUrl]);

        res.status(201).send({"shortUrl": shortUrl});

    } catch (error) {
        res.status(500).send(error.message);
    }

}

export async function getOne(req, res){

    const id = req.params.id;

    try {
        const url = await connectionDB.query("SELECT * FROM links WHERE id=$1;", [id])

        if(url.rowCount < 1) return res.sendStatus(404);

        return res.status(200).send(url.rows[0])

    } catch (error) {

        res.status(500).send(error.message);
        
    }
}

export async function openLink(req, res){

    const shortUrl = req.params.shortUrl;

    try {
        const url = await connectionDB.query(`SELECT * FROM links WHERE "shortUrl"=$1;`, [shortUrl]);

        if(url.rowCount < 1) return res.sendStatus(404);

        await connectionDB.query(`UPDATE links SET "visitCount"= "visitCount" + 1 WHERE "shortUrl"=$1;`, [shortUrl]);

        return res.redirect(url.rows[0].url);

    } catch (error) {

        res.status(500).send(error.message);
    }
}

export async function deleteUrl(req, res){

    const id = req.params.id;

    try {
        
        await connectionDB.query("DELETE FROM links WHERE id=$1;", [id]);

        return res.sendStatus(204);

    } catch (error) {
        
        res.status(500).send(error.message);
    }
}

