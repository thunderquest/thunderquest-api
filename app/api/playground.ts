import { renderPlaygroundPage } from 'graphql-playground-html';
import {NextApiRequest, NextApiResponse} from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    // Respond with GraphQL Playground HTML
    const playgroundHTML = renderPlaygroundPage({
        endpoint: '/api/graphql'
    });

    res.setHeader('Content-Type', 'text/html');
    res.status(200).send(playgroundHTML);
}