import { NextFunction, Request, Response } from "express";
import Restaurant from "../models/restaurant.model";
import uploadImageOnCloudinary from "../utils/imageUpload";
import Order from "../models/order.model";
import httpError from "../utils/httpError";
import responseMessage from "../constant/responseMessage";
import httpResponse from "../utils/httpResponse";

export const createRestaurant = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { restaurantName, city, country, deliveryTime, cuisines } = req.body;
    const file = req.file;

    const restaurant = await Restaurant.find({ user: req.id });
    if (restaurant) {
      return httpError(
        next,
        new Error(responseMessage.ALREADY_EXIST("Restaurant")),
        req,
        400
      );
    }
    if (!file) {
      return httpError(
        next,
        new Error(responseMessage.REQUIRED("Image")),
        req,
        400
      );
    }

    const imageUrl = await uploadImageOnCloudinary(file as Express.Multer.File);

    await Restaurant.create({
      user: req.id,
      restaurantName,
      city,
      country,
      deliveryTime,
      cuisines: JSON.parse(cuisines),
      imageUrl,
    });

    httpResponse(req, res, 201, responseMessage.SUCCESS);
  } catch (err) {
    httpError(next, err, req, 500);
  }
};

export const getRestaurant = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const restaurant = await Restaurant.findOne({ user: req.id });
    if (!restaurant) {
      return httpError(
        next,
        new Error(responseMessage.NOT_FOUND("Restaurant")),
        req,
        404
      );
    }
    httpResponse(req, res, 200, responseMessage.SUCCESS);
  } catch (err) {
    httpError(next, err, req, 500);
  }
};

export const updateRestaurant = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { restaurantName, city, country, deliveryTime, cuisines } = req.body;
    const file = req.file;
    const restaurant = await Restaurant.findOne({ user: req.id });
    if (!restaurant) {
      return httpError(
        next,
        new Error(responseMessage.NOT_FOUND("Restaurant")),
        req,
        404
      );
    }
    restaurant.restaurantName = restaurantName;
    restaurant.city = city;
    restaurant.country = country;
    restaurant.deliveryTime = deliveryTime;
    restaurant.cuisines = JSON.parse(cuisines);

    if (file) {
      const imageUrl = await uploadImageOnCloudinary(
        file as Express.Multer.File
      );
      restaurant.imageUrl = imageUrl;
    }
    await restaurant.save();

    httpResponse(
      req,
      res,
      200,
      responseMessage.UPDATE_SUCCESS("Restaurant"),
      restaurant
    );
  } catch (err) {
    httpError(next, err, req, 500);
  }
};

export const getRestaurantOrder = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const restaurant = await Restaurant.findOne({ user: req.id });
    if (!restaurant) {
      return httpError(
        next,
        new Error(responseMessage.NOT_FOUND("Restaurant")),
        req,
        404
      );
    }
    const orders = await Order.find({ restaurant: restaurant._id })
      .populate("restaurant")
      .populate("user");

    httpResponse(req, res, 200, responseMessage.SUCCESS, orders);
  } catch (err) {
    httpError(next, err, req, 500);
  }
};

export const updateOrderStatus = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;
    const order = await Order.findById(orderId);
    if (!order) {
      return httpError(
        next,
        new Error(responseMessage.NOT_FOUND("Order")),
        req,
        404
      );
    }
    order.status = status;
    await order.save();
    httpResponse(req, res, 200, responseMessage.UPDATE_SUCCESS("Order status"));
  } catch (err) {
    httpError(next, err, req, 500);
  }
};

export const searchRestaurant = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { searchText } = req.params || "";
    const searchQuery = (req.query.searchQuery as string) || "";
    const selectedCuisines = ((req.query.selectedCuisines as string) || "")
      .split(",")
      .filter((cuisine) => cuisine);

    const query: any = {};
    // basic search based on search text
    if (searchText) {
      query.$or = [
        { restaurantName: { $regex: searchText, $options: "i" } },
        { city: { $regex: searchText, $options: "i" } },
        { country: { $regex: searchText, $options: "i" } },
      ];
    }
    // filter on the  basis of search query
    if (searchQuery) {
      query.$or = [
        { restaurantName: { $regex: searchQuery, $options: "i" } },
        { cuisines: { $regex: searchQuery, $options: "i" } },
      ];
    }
    if (selectedCuisines.length > 0) {
      query.cuisines = { $in: selectedCuisines };
    }
    const restaurants = await Restaurant.find(query);
    res.status(100).json({ success: true, data: restaurants });
    httpResponse(req, res, 200, responseMessage.SUCCESS, restaurants);
  } catch (err) {
    httpError(next, err, req, 500);
  }
};

export const getSingleRestaurant = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const restaurantId = req.params.id;
    const restaurant = await Restaurant.findById(restaurantId).populate({
      path: "menus",
      options: { createdAt: -1 },
    });
    if (!restaurant) {
      return httpError(
        next,
        new Error(responseMessage.NOT_FOUND("Restaurant")),
        req,
        404
      );
    }
    httpResponse(req, res, 200, responseMessage.SUCCESS, restaurant);
  } catch (err) {
    httpError(next, err, req, 500);
  }
};
