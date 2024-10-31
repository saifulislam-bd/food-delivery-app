import { NextFunction, Request, Response } from "express";
import httpError from "../utils/httpError";
import httpResponse from "../utils/httpResponse";
import responseMessage from "../constant/responseMessage";
import uploadImageOnCloudinary from "../utils/imageUpload";
import Menu from "../models/menu.model";
import Restaurant from "../models/restaurant.model";
import mongoose from "mongoose";

export const addMenu = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, description, price } = req.body;
    const file = req.file;

    if (!file) {
      return httpError(
        next,
        new Error(responseMessage.REQUIRED("Image")),
        req,
        404
      );
    }

    const imageUrl = await uploadImageOnCloudinary(file as Express.Multer.File);

    const menu = await Menu.create({
      name,
      description,
      price,
      image: imageUrl,
    });
    const restaurant = await Restaurant.findOne({ user: req.id });
    if (restaurant) {
      (restaurant.menus as mongoose.Schema.Types.ObjectId[]).push(
        menu._id as mongoose.Schema.Types.ObjectId
      );
      await restaurant.save();
    }

    httpResponse(req, res, 201, responseMessage.SUCCESS, menu);
  } catch (err) {
    httpError(next, err, req, 500);
  }
};

export const editMenu = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const { name, description, price } = req.body;
    const file = req.file;

    const menu = await Menu.findById(id);
    if (!menu) {
      return httpError(
        next,
        new Error(responseMessage.NOT_FOUND("Menu")),
        req,
        404
      );
    }
    if (name) menu.name = name;
    if (description) menu.description = description;
    if (price) menu.price = price;

    if (file) {
      const imageUrl = await uploadImageOnCloudinary(
        file as Express.Multer.File
      );
      menu.image = imageUrl;
    }
    await menu.save();
    httpResponse(req, res, 200, responseMessage.UPDATE_SUCCESS("Menu"), menu);
  } catch (err) {
    httpError(next, err, req, 500);
  }
};
