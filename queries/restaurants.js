"use server";
import { replaceMongoIdInData } from "@/lib/convertData";
import { Favourite } from "@/models/favourite-model";
import { Restaurant } from "@/models/restaurant-model";
import mongoose from "mongoose";
import { unstable_cache } from "next/cache";

export const getAllRestaurantPlain = unstable_cache(
  async () => {
    try {
      const restaurants = await Restaurant.find({})
        .select("name thumbnail address phone email delivery_time")
        .lean();

      const response = replaceMongoIdInData(restaurants);
      return response;
    } catch (error) {
      throw new Error(
        error?.message || "Error occurred while fetching restaurants"
      );
    }
  },
  ["restaurants"],
  { tags: ["restaurants"] }
);

export const getAllRestaurants = unstable_cache(
  async (queryParams) => {
    queryParams = {
      search: queryParams?.search ?? "",
      sortBy: queryParams?.sortBy ?? "default",
      categoryIds: queryParams?.categoryIds ?? [],
      page: Number(queryParams?.page) || 1,
      limit: Number(queryParams?.limit) || 5,
    };

    const skip = (queryParams.page - 1) * queryParams.limit;

    try {
      const restaurants = await Restaurant.aggregate([
        {
          $match: {
            name: { $regex: queryParams?.search ?? "", $options: "i" },
            ...(queryParams.categoryIds.length && {
              category_ids: {
                $elemMatch: {
                  $in: queryParams.categoryIds.map(
                    (id) => new mongoose.Types.ObjectId(id)
                  ),
                },
              },
            }),
          },
        },
        {
          $lookup: {
            from: "restaurantreviews", // Name of the reviews collection
            localField: "_id",
            foreignField: "restaurant_id",
            as: "reviews", // Name of the new array field to add
          },
        },
        {
          $lookup: {
            from: "orders", // Name of the orders collection
            localField: "_id",
            foreignField: "restaurant_id",
            as: "orders", // Name of the new array field to add
          },
        },
        {
          $lookup: {
            from: "users",
            localField: "owner",
            foreignField: "_id",
            as: "owner",
          },
        },
        {
          $unwind: {
            path: "$owner",
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $lookup: {
            from: "categories", // The collection name in MongoDB
            localField: "category_ids", // Field in the "Restaurant" schema
            foreignField: "_id", // Field in the "Category" schema
            as: "categories", // The name of the resulting array field
          },
        },
        {
          $lookup: {
            from: "favourites",
            localField: "_id",
            foreignField: "restaurant_ids",
            as: "favouriteReferences",
          },
        },
        {
          $addFields: {
            favouriteCount: { $size: "$favouriteReferences" },
          },
        },

        // Add a field for the total number of completed orders
        {
          $addFields: {
            completedOrders: {
              $size: {
                $filter: {
                  input: "$orders",
                  as: "order",
                  cond: { $eq: ["$$order.order_status", "delivered"] },
                },
              },
            },
          },
        },
        // Add a field for the average rating
        {
          $addFields: {
            avgRating: {
              $cond: {
                if: { $gt: [{ $size: "$reviews" }, 0] },
                then: {
                  $avg: {
                    $map: {
                      input: "$reviews",
                      as: "review",
                      in: "$$review.rating",
                    },
                  },
                },
                else: 0,
              },
            },
          },
        },

        // Sorting based on queryParams.sortBy
        ...(queryParams.sortBy === "top_rated"
          ? [{ $sort: { avgRating: -1, name: 1 } }]
          : queryParams.sortBy === "most_sales"
          ? [{ $sort: { completedOrders: -1, name: 1 } }]
          : queryParams.sortBy === "favourites"
          ? [{ $sort: { favouriteCount: -1, name: 1 } }]
          : [{ $sort: { created_at: -1, name: 1 } }]),
        { $skip: skip },
        { $limit: queryParams.limit },
        // Optionally project specific fields from the "Restaurant" and "Category"
        {
          $project: {
            id: 1,
            name: 1,
            owner: { name: 1, email: 1 },
            thumbnail: 1,
            imageUrl: 1,
            phone: 1,
            email: 1,
            address: 1,
            opening_time: 1,
            closing_time: 1,
            delivery_time: 1,
            delivery_charge: 1,
            created_at: 1,
            favouriteCount: 1,
            completedOrders: 1,
            reviews: {
              // Include specific fields from the reviews
              $map: {
                input: "$reviews",
                as: "review",
                in: {
                  id: "$$review._id",
                  user_id: "$$review.user_id",
                  rating: "$$review.rating",
                  comment: "$$review.comment",
                  created_at: "$$review.created_at",
                  updated_at: "$$review.updated_at",
                },
              },
            },
            orders: {
              // Include specific fields from the orders
              $map: {
                input: "$orders",
                as: "order",
                in: {
                  order_id: "$$order._id",
                  user_id: "$$order.user_id",
                  total_amount: "$$order.total_price",
                  status: "$$order.order_status",
                  created_at: "$$order.placed_at",
                  updated_at: "$$order.updated_at",
                },
              },
            },
            categories: {
              $map: {
                input: "$categories",
                as: "category",
                in: {
                  id: { $toString: "$$category._id" },
                  name: "$$category.name",
                  description: "$$category.description",
                },
              },
            },
          },
        },
      ]);

      return replaceMongoIdInData(restaurants);
    } catch (error) {
      console.error("Error fetching restaurants with categories: ", error);
      throw error;
    }
  },
  ["restaurants"],
  { tags: ["restaurants"] }
);

export const getTopRatedRestaurants = unstable_cache(
  async () => {
    try {
      const restaurants = await Restaurant.aggregate([
        {
          $lookup: {
            from: "restaurantreviews", // Name of the reviews collection
            localField: "_id",
            foreignField: "restaurant_id",
            as: "reviews", // Name of the new array field to add
          },
        },
        {
          $lookup: {
            from: "categories",
            localField: "category_ids",
            foreignField: "_id",
            as: "categories",
          },
        },
        {
          $lookup: {
            from: "orders", // Name of the orders collection
            localField: "_id",
            foreignField: "restaurant_id",
            as: "orders", // Name of the new array field to add
          },
        },
        {
          // Optionally project specific fields from the "Restaurant" and "Category"
          $project: {
            id: 1,
            name: 1,
            owner: { name: 1 },
            thumbnail: 1,
            imageUrl: 1,
            phone: 1,
            email: 1,
            address: 1,
            opening_time: 1,
            closing_time: 1,
            delivery_time: 1,
            delivery_charge: 1,
            categories: {
              $map: {
                input: "$categories",
                as: "category",
                in: {
                  id: { $toString: "$$category._id" },
                  name: "$$category.name",
                },
              },
            },
            reviews: {
              // Include specific fields from the reviews
              $map: {
                input: "$reviews",
                as: "review",
                in: {
                  id: "$$review._id",
                  rating: "$$review.rating",
                },
              },
            },
            orders: {
              // Include specific fields from the orders
              $map: {
                input: "$orders",
                as: "order",
                in: {
                  order_id: "$$order._id",
                  user_id: "$$order.user_id",
                  total_amount: "$$order.total_price",
                  status: "$$order.order_status",
                },
              },
            },
          },
        },
      ]);

      const response = replaceMongoIdInData(restaurants);

      // from here generate top rated restaurants
      const calculateReviewSummery = (reviews) => {
        const totalReviews = reviews?.length;
        const averageRating =
          totalReviews > 0
            ? reviews.reduce((sum, review) => sum + review.rating, 0) /
              totalReviews
            : 0;

        return { totalReviews, averageRating };
      };

      const summerizedRestaurants = restaurants.map((restaurant) => {
        const { totalReviews, averageRating } = calculateReviewSummery(
          restaurant?.reviews
        );

        return {
          ...restaurant,
          hasReviews: totalReviews > 0,
          totalReviews,
          averageRating,
          hasOrders: restaurant.orders.length > 0,
          orderCount: restaurant?.orders.length,
        };
      });

      summerizedRestaurants.sort((a, b) => {
        // Primary criteria: restaurants with reviews
        if (a.hasReviews && b.hasReviews) {
          if (b.averageRating !== a.averageRating) {
            return b.averageRating - a.averageRating;
          }
          return b.totalReviews - a.totalReviews;
        }

        // Secondary criteria: restaurants with no reviews but orders
        if (!a.hasReviews && b.hasReviews) return 1;
        if (a.hasReviews && !b.hasReviews) return -1;

        if (!a.hasReviews && !b.hasReviews) {
          if (a.hasOrders && !b.hasOrders) return -1;
          if (!a.hasOrders && b.hasOrders) return 1;
        }

        // Tertiary criteria: for restaurants with no reviews or orders, leave as is
        return 0;
      });

      const data = summerizedRestaurants.slice(0, 10).map((restaurant) => ({
        id: restaurant?._id.toString(),
        name: restaurant?.name,
        thumbnail: restaurant?.thumbnail,
        email: restaurant?.email,
        categories: restaurant?.categories,
        address: restaurant?.address,
        phone: restaurant?.phone,
        opening_time: restaurant?.opening_time,
        closing_time: restaurant?.closing_time,
        delivery_charge: restaurant?.delivery_charge,
        rating: Number(restaurant?.averageRating.toFixed(2)),
        totalReviews: restaurant?.totalReviews,
        orders: restaurant?.orders,
      }));
      return replaceMongoIdInData(data);
    } catch (error) {
      console.error("Error fetching top rated restaurants: ", error);
      throw new Error(error?.message || "Error fetching top rated restaurants");
    }
  },
  ["restaurants"],
  { tags: ["restaurants"] }
);

export const getRestaurantById = unstable_cache(
  async (restaurantId) => {
    const restaurant = await Restaurant.aggregate([
      { $match: { _id: new mongoose.Types.ObjectId(restaurantId) } },
      {
        $lookup: {
          from: "restaurantreviews", // Name of the reviews collection
          let: { restaurantId: "$_id" },
          pipeline: [
            {
              $match: { $expr: { $eq: ["$restaurant_id", "$$restaurantId"] } },
            },
            {
              $lookup: {
                from: "users",
                localField: "user_id",
                foreignField: "_id",
                as: "user",
              },
            },
            { $unwind: { path: "$user", preserveNullAndEmptyArrays: true } },
            {
              $project: {
                rating: 1,
                comment: 1,
                created_at: 1,
                updated_at: 1,
                user: {
                  id: "$user._id",
                  name: "$user.name",
                  email: "$user.email",
                  profilePicture: "$user.profilePicture",
                },
              },
            },
          ],
          as: "reviews", // Name of the new array field to add
        },
      },
      {
        $lookup: {
          from: "orders",
          localField: "_id",
          foreignField: "restaurant_id",
          as: "orders",
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "owner",
          foreignField: "_id",
          as: "owner",
        },
      },
      {
        $unwind: {
          path: "$owner",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $lookup: {
          from: "categories", // The collection name in MongoDB
          localField: "category_ids", // Field in the "Restaurant" schema
          foreignField: "_id", // Field in the "Category" schema
          as: "categories", // The name of the resulting array field
        },
      },
      {
        // Optionally project specific fields from the "Restaurant" and "Category"
        $project: {
          id: 1,
          name: 1,
          owner: { name: 1 },
          thumbnail: 1,
          imageUrl: 1,
          phone: 1,
          email: 1,
          address: 1,
          opening_time: 1,
          closing_time: 1,
          delivery_time: 1,
          delivery_charge: 1,
          reviews: 1,
          orders: {
            // Include specific fields from the orders
            $map: {
              input: "$orders",
              as: "order",
              in: {
                id: "$$order._id",
                user_id: "$$order.user_id",
                total_amount: "$$order.total_price",
                status: "$$order.order_status",
                created_at: "$$order.placed_at",
                updated_at: "$$order.updated_at",
              },
            },
          },
          categories: {
            _id: 1,
            name: 1,
            description: 1,
          },
        },
      },
    ]);

    const response = restaurant.length
      ? replaceMongoIdInData(restaurant[0])
      : [];
    return response;
  },
  ["restaurant"],
  { tags: ["restaurant"] }
);

export const getFavouriteRestaurantsByUserId = unstable_cache(
  async (userId) => {
    try {
      const favRestaurants = await Favourite.aggregate([
        { $match: { user_id: new mongoose.Types.ObjectId(userId) } },
        {
          $lookup: {
            from: "restaurants",
            localField: "restaurant_ids",
            foreignField: "_id",
            as: "restaurants",
          },
        },
        { $unwind: { path: "$restaurants", preserveNullAndEmptyArrays: true } },
        {
          $lookup: {
            from: "restaurantreviews",
            localField: "restaurants._id",
            foreignField: "restaurant_id",
            as: "restaurants.reviews",
          },
        },
        {
          $project: {
            id: "$_id",
            "restaurants._id": 1,
            "restaurants.name": 1,
            "restaurants.thumbnail": 1,
            "restaurants.delivery_time": 1,
            "restaurants.delivery_charge": 1,
            "restaurants.imageUrl": 1,
            "restaurants.reviews": {
              rating: 1,
              comment: 1,
            },
          },
        },
        {
          $group: {
            _id: "$_id",
            restaurants: { $push: "$restaurants" },
          },
        },
      ]);
      return replaceMongoIdInData(favRestaurants[0]);
    } catch (error) {
      console.log(error);
      throw new Error(error?.message || "Failed to get favourite restaurants");
    }
  },
  ["restaurants"],
  { tags: ["restaurants"] }
);

export const getRestaurantByOwnerId = unstable_cache(
  async (ownerId) => {
    try {
      const restaurants = await Restaurant.aggregate([
        { $match: { owner: new mongoose.Types.ObjectId(ownerId) } },
        {
          $lookup: {
            from: "restaurantreviews",
            localField: "_id",
            foreignField: "restaurant_id",
            as: "reviews",
          },
        },
        {
          $project: {
            id: 1,
            name: 1,
            owner: { name: 1 },
            thumbnail: 1,
            imageUrl: 1,
            phone: 1,
            email: 1,
            address: 1,
            opening_time: 1,
            closing_time: 1,
            delivery_time: 1,
            delivery_charge: 1,
            reviews: 1,
          },
        },
      ]);
      return replaceMongoIdInData(restaurants);
    } catch (error) {
      console.log(error);
      throw new Error(error.message || "failed to get restaurants");
    }
  },
  ["restaurants"],
  { tags: ["restaurants"] }
);
