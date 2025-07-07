import { Request, Response } from "express";
import { Post, posts } from "../models/post-model";

export const get = (req: Request, res: Response) => {
    res.json(posts);
}

export const create = (req: Request, res: Response) => {
    const { title, content } = req.body;

    const newPost: Post = {
        id: Date.now(),
        title: title,
        content: content
    }

    posts.push(newPost);

    res.status(201).json(newPost);
}

export const remove = (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const postIndex = posts.findIndex((x) => x.id == id);

    if(postIndex != -1){
        posts.splice(postIndex, 1);
        res.send('deleted');
    }
    else{
        res.send('not found');
    }
}