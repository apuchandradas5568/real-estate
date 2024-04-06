import prisma from "../lib/prisma.js";

import jwt from "jsonwebtoken";

export const getPosts = async (req, res) => {
    const query = req.query

    try {
        const posts = await prisma.post.findMany({
            where: {

                city:query.city || undefined,
                type: query.type || undefined,
                property: query.property || undefined,
                bedroom: parseInt(query.bedroom) || undefined,
                price: {
                    gte: parseInt(query.minPrice) || undefined,
                    lte: parseInt(query.maxPrice) || undefined
                }
            }
        })
        res.status(200).json(posts)
    } catch (error) {
    res.status(500).json({ message: "Failed to fetch the posts" });
        
    }

};
export const getPost = async (req, res) => {
    
};
export const addPost = async (req, res) => {
  const body = req.body;
  const tokenUserId = req.userId;

  try {
    const newPost = await prisma.post.create({
      data: {
        ...body,
        userId: tokenUserId,
      },
    });
    res.status(200).json(newPost);
  } catch (error) {

    res.status(500).json({ message: "Failed to create post" });
  }
};
export const updatePost = async (req, res) => {};
export const deletePost = async (req, res) => {};
