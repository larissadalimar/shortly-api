import { linkSchema } from "../models/link.model";


export default function linkValidation(req, res, next){

    const { url } = req.body;

    const validation = linkSchema.validate( { url }, { abortEarly: false});

    if(validation.error){
        const errors = validation.error.details.map(e => e.message);

        return res.status(422).send(errors);
    }

    next();
}