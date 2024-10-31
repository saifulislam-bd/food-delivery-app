import { NextFunction, Request, Response } from "express";
import httpError from "../utils/httpError";
import responseMessage from "../constant/responseMessage";
import httpResponse from "../utils/httpResponse";
import Restaurant from "../models/restaurant.model";
import Order from "../models/order.model";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

type CheckoutSessionRequestType = {
  cartItems: {
    menuId: string;
    name: string;
    image: string;
    price: number;
    quantity: number;
  }[];
  deliveryDetails: {
    name: string;
    email: string;
    address: string;
    city: string;
  };
  restaurantId: string;
};

export const getOrders = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const orders = await Order.find({ user: req.id })
      .populate("user")
      .populate("restaurant");

    httpResponse(req, res, 200, responseMessage.SUCCESS, orders);
  } catch (err) {
    httpError(next, err, req, 500);
  }
};

export const createCheckoutSession = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const checkoutSessionRequest: CheckoutSessionRequestType = req.body;
    const restaurant = await Restaurant.findById(
      checkoutSessionRequest.restaurantId
    ).populate("menu");

    if (!restaurant) {
      return httpError(
        next,
        new Error(responseMessage.NOT_FOUND("Restaurant")),
        req,
        404
      );
    }

    const order = new Order({
      restaurant: restaurant._id,
      user: req.id,
      deliveryDetails: checkoutSessionRequest.deliveryDetails,
      cartItems: checkoutSessionRequest.cartItems,
      status: "Pending",
    });

    // create stripe line items
    const menuItems = restaurant.menus;
    const lineItems = createLineItems(checkoutSessionRequest, menuItems);

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      shipping_address_collection: {
        allowed_countries: ["GB", "US", "CA"],
      },
      line_items: lineItems,
      success_url: `${process.env.FRONTEND_URL}/order/status`,
      cancel_url: `${process.env.FRONTEND_URL}/cart`,
      metadata: {
        orderId: order._id as string,
        images: JSON.stringify(
          menuItems.map((menuItem: any) => menuItem.image)
        ),
      },
    });

    if (!session.url) {
      return httpError(
        next,
        new Error("Error while creating session"),
        req,
        400
      );
    }
    await order.save();
    httpResponse(req, res, 200, responseMessage.SUCCESS, session);
  } catch (err) {
    httpError(next, err, req, 500);
  }
};

export const createLineItems = (
  checkoutSessionRequest: CheckoutSessionRequestType,
  menuItems: any
) => {
  const lineItems = checkoutSessionRequest.cartItems.map((cartItem) => {
    const menuItem = menuItems.find(
      (item: any) => item._id === cartItem.menuId
    );
    if (!menuItem.id) throw new Error("Menu item id not found");
    return {
      price_data: {
        currency: "usd",
        product_data: {
          name: menuItem.name,
          images: [menuItem.image],
        },
        unit_amount: menuItem.price * 100,
      },
      quantity: cartItem.quantity,
    };
  });
  return lineItems;
};
