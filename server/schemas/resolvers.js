const { AuthenticationError } = require('apollo-server-express');
const { User, Events, Category, Order } = require('../models');
const { signToken } = require('../utils/auth');
const stripe = require('stripe')('sk_test_4eC39HqLyjWDarjtT1zdp7dc');
const axios = require("axios")

const resolvers = {
  Query: {
    categories: async () => {
      return await Category.find();
    },
    event: async (parent, { category, name }) => {
      const params = {};

      if (category) {
        params.category = category;
      }

      if (name) {
        params.name = {
          $regex: name
        };
      }

      return await Events.find(params).populate('category');
    },
    getEvents: async (parent, { term }) => {

      const BASEURL = "http://app.ticketmaster.com/discovery/v2/events.json?";
      const APIKEY = process.env.REACT_APP_APIKEY;

      try {
        const data = await axios.get(`${BASEURL}keyword=${term}&apikey=${APIKEY}&rating=pg`);
        console.log(Object.keys(data.data._embedded.events[0]))
        return []
      }
      catch (e) { console.log(e) }
    },

    user: async (parent, args, context) => {
      if (context.user) {
        const user = await User.findById(context.user._id).populate({
          path: 'orders.event',
          populate: 'category'
        });

        user.orders.sort((a, b) => b.purchaseDate - a.purchaseDate);

        return user;
      }

      throw new AuthenticationError('Not logged in');
    },
    order: async (parent, { _id }, context) => {
      if (context.user) {
        const user = await User.findById(context.user._id).populate({
          path: 'orders.event',
          populate: 'category'
        });

        return user.orders.id(_id);
      }

      throw new AuthenticationError('Not logged in');
    },
    checkout: async (parent, args, context) => {
      const url = new URL(context.headers.referer).origin;
      const order = new Order({ event: args.event });
      const line_items = [];

      const { event } = await order.populate('event').execPopulate();

      for (let i = 0; i < event.length; i++) {
        const event = await stripe.event.create({
          name: event[i].name,
          description: event[i].description,
          images: [`${url}/images/${event[i].image}`]
        });

        const price = await stripe.prices.create({
          event: event.id,
          unit_amount: event[i].price * 100,
          currency: 'usd',
        });

        line_items.push({
          price: price.id,
          quantity: 1
        });
      }

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items,
        mode: 'payment',
        success_url: `${url}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${url}/`
      });

      return { session: session.id };
    }
  },
  Mutation: {
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);

      return { token, user };
    },
    addOrder: async (parent, { event }, context) => {
      console.log(context);
      if (context.user) {
        const order = new Order({ event });

        await User.findByIdAndUpdate(context.user._id, { $push: { orders: order } });

        return order;
      }

      throw new AuthenticationError('Not logged in');
    },
    updateUser: async (parent, args, context) => {
      if (context.user) {
        return await User.findByIdAndUpdate(context.user._id, args, { new: true });
      }

      throw new AuthenticationError('Not logged in');
    },
    updateEvent: async (parent, { _id, quantity }) => {
      const decrement = Math.abs(quantity) * -1;

      return await Events.findByIdAndUpdate(_id, { $inc: { quantity: decrement } }, { new: true });
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const token = signToken(user);

      return { token, user };
    }
  }
};

module.exports = resolvers;
