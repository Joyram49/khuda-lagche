"use server";
import { replaceMongoIdInData } from "@/lib/convertData";
import { Category } from "@/models/category-model";
import { FoodItem } from "@/models/foodItem-model";
import mongoose from "mongoose";
import { unstable_cache } from "next/cache";

export const getFoodItems = async () => {
  try {
    const response = await FoodItem.find({}).lean();
    return replaceMongoIdInData(response);
  } catch (error) {
    throw new Error(
      error?.message || "Error occurred while fetching food items"
    );
  }
};

export const getAllFood = unstable_cache(
  async (queryParams) => {
    queryParams = {
      search: queryParams?.search ?? "",
      sortBy: queryParams?.sortBy ?? "default",
      categoryIds: queryParams?.categoryIds ?? [],
      minPrice: queryParams?.minPrice ?? 20,
      maxPrice: queryParams?.maxPrice ?? 3000,
      page: Number(queryParams?.page) || 1,
      limit: Number(queryParams?.limit) || 10,
    };

    const skip = (queryParams.page - 1) * queryParams.limit;

    try {
      const foodItems = await FoodItem.aggregate([
        // Match stage to apply filters
        {
          $match: {
            name: { $regex: queryParams.search, $options: "i" },
            price: { $gte: queryParams.minPrice, $lte: queryParams.maxPrice },
            ...(queryParams.categoryIds.length && {
              category: {
                $in: queryParams.categoryIds.map(
                  (id) => new mongoose.Types.ObjectId(id)
                ),
              },
            }),
          },
        },
        // Lookup for reviews
        {
          $lookup: {
            from: "fooditemreviews",
            localField: "_id",
            foreignField: "fooditem_id",
            as: "reviews",
          },
        },
        // Lookup for category information
        {
          $lookup: {
            from: "categories",
            localField: "category",
            foreignField: "_id",
            as: "category",
          },
        },
        { $unwind: { path: "$category", preserveNullAndEmptyArrays: true } },
        // Lookup for restaurant information
        {
          $lookup: {
            from: "restaurants",
            localField: "restaurant",
            foreignField: "_id",
            as: "restaurant",
          },
        },
        { $unwind: { path: "$restaurant", preserveNullAndEmptyArrays: true } },
        {
          $lookup: {
            from: "categories",
            localField: "restaurant.category_ids",
            foreignField: "_id",
            as: "restaurant.categories",
          },
        },
        {
          $lookup: {
            from: "orders",
            localField: "_id",
            foreignField: "items.food_item_id",
            as: "orders",
          },
        },
        // Add fields for derived data
        {
          $addFields: {
            orders: {
              $map: {
                input: "$orders",
                as: "order",
                in: {
                  id: { $toString: "$$order._id" },
                  quantity: {
                    $reduce: {
                      input: "$$order.items",
                      initialValue: 0,
                      in: {
                        $cond: [
                          { $eq: ["$$this.food_item_id", "$_id"] },
                          { $add: ["$$value", "$$this.quantity"] },
                          "$$value",
                        ],
                      },
                    },
                  },
                  total_price: "$$order.total_price",
                  payment_method: "$$order.payment_method",
                },
              },
            },
          },
        },
        // Sorting based on queryParams
        ...(queryParams.sortBy === "top_rated"
          ? [
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
              { $sort: { avgRating: -1, name: 1 } },
            ]
          : queryParams.sortBy === "most_sales"
          ? [
              {
                $addFields: {
                  totalSales: {
                    $sum: {
                      $map: {
                        input: "$orders",
                        as: "order",
                        in: "$$order.quantity",
                      },
                    },
                  },
                },
              },
              { $sort: { totalSales: -1, name: 1 } },
            ]
          : queryParams.sortBy === "least_prepared_time"
          ? [
              // Extract numeric portion of preparation_time
              {
                $addFields: {
                  numericPreparationTime: {
                    $convert: {
                      input: {
                        $arrayElemAt: [
                          { $split: ["$preparation_time", " "] },
                          0,
                        ],
                      },
                      to: "int",
                      onError: null, // Handle conversion errors
                      onNull: null, // Handle null values
                    },
                  },
                },
              },
              // Sort by the numeric preparation time
              { $sort: { numericPreparationTime: 1, name: 1 } },
            ]
          : [{ $sort: { created_at: -1, name: 1 } }]),
        { $skip: skip },
        { $limit: queryParams.limit },

        // Project the final fields
        {
          $project: {
            _id: 0,
            id: { $toString: "$_id" },
            category: {
              id: { $toString: "$category._id" },
              name: "$category.name",
            },
            restaurant: {
              id: { $toString: "$restaurant._id" },
              name: "$restaurant.name",
              address: "$restaurant.address",
              phone: "$restaurant.phone",
              email: "$restaurant.email",
              categories: {
                $map: {
                  input: "$restaurant.categories",
                  as: "cat",
                  in: "$$cat.name",
                },
              },
            },
            name: 1,
            description: 1,
            price: 1,
            quantity: 1,
            delivery_time: 1,
            image_url: 1,
            availability: 1,
            preparation_time: 1,
            created_at: 1,
            updated_at: 1,
            tags: 1,
            reviews: {
              $map: {
                input: "$reviews",
                as: "review",
                in: {
                  id: { $toString: "$$review._id" },
                  user_id: { $toString: "$$review.user_id" },
                  rating: "$$review.rating",
                  comment: "$$review.comment",
                  created_at: "$$review.created_at",
                  updated_at: "$$review.updated_at",
                },
              },
            },
            orders: 1,
          },
        },
      ]);

      return foodItems;
    } catch (error) {
      console.error(error);
      throw new Error(
        error?.message || "Error occurred while fetching food items"
      );
    }
  },
  ["foods"],
  { tags: ["foods"] }
);

export const getFoodById = unstable_cache(
  async (foodId) => {
    const foodItem = await FoodItem.aggregate([
      // Match the food item by its ID
      { $match: { _id: new mongoose.Types.ObjectId(foodId) } },
      // Lookup reviews and get the user details directly in the same step
      {
        $lookup: {
          from: "fooditemreviews",
          let: { foodId: "$_id" },
          pipeline: [
            { $match: { $expr: { $eq: ["$fooditem_id", "$$foodId"] } } },
            {
              $lookup: {
                from: "users",
                localField: "user_id",
                foreignField: "_id",
                as: "user",
              },
            },
            {
              $unwind: { path: "$user", preserveNullAndEmptyArrays: true },
            },
            {
              $project: {
                rating: 1,
                comment: 1,
                created_at: 1,
                updated_at: 1,
                user: {
                  _id: "$user._id",
                  name: "$user.name",
                  email: "$user.email",
                  profilePicture: "$user.profilePicture",
                },
              },
            },
          ],
          as: "reviews",
        },
      },
      // Lookup category
      {
        $lookup: {
          from: "categories",
          localField: "category",
          foreignField: "_id",
          as: "category",
        },
      },
      {
        $unwind: {
          path: "$category",
          preserveNullAndEmptyArrays: true,
        },
      },
      // Lookup restaurant
      {
        $lookup: {
          from: "restaurants",
          localField: "restaurant",
          foreignField: "_id",
          as: "restaurant",
        },
      },
      {
        $unwind: {
          path: "$restaurant",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $project: {
          _id: 1,
          name: 1,
          description: 1,
          price: 1,
          quantity: 1,
          delivery_time: 1,
          image_url: 1,
          availability: 1,
          preparation_time: 1,
          created_at: 1,
          updated_at: 1,
          tags: 1,
          "category.name": 1,
          restaurant: {
            _id: "$restaurant._id",
            name: "$restaurant.name",
            address: "$restaurant.address",
            phone: "$restaurant.phone",
            email: "$restaurant.email",
          },
          reviews: 1,
        },
      },
    ]);

    return replaceMongoIdInData(foodItem[0]);
  },
  ["foods"],
  { tags: ["foods"] }
);

// Function to find related food items by category and tags
export async function getRelatedFoodItems(currentFoodItemId) {
  try {
    // First, get the current food item to know its category, restaurant, and tags
    const currentFoodItem = await FoodItem.findById(currentFoodItemId).lean();

    if (!currentFoodItem) {
      throw new Error("Food item not found");
    }

    const { category, restaurant, tags } = currentFoodItem;

    const categorizedRestaurant = await FoodItem.aggregate([
      {
        $facet: {
          // Primary Priority: Same category and same restaurant
          sameCategorySameRestaurant: [
            {
              $match: {
                _id: { $ne: new mongoose.Types.ObjectId(currentFoodItemId) },
                category: new mongoose.Types.ObjectId(category),
                restaurant: new mongoose.Types.ObjectId(restaurant),
              },
            },
            {
              $lookup: {
                from: "categories",
                localField: "category",
                foreignField: "_id",
                as: "category",
              },
            },
            { $unwind: "$category" },
            {
              $lookup: {
                from: "restaurants",
                localField: "restaurant",
                foreignField: "_id",
                as: "restaurant",
              },
            },
            { $unwind: "$restaurant" },
            {
              $lookup: {
                from: "fooditemreviews",
                localField: "_id",
                foreignField: "fooditem_id",
                as: "reviews",
              },
            },
            {
              $project: {
                _id: 1,
                category: { name: 1, description: 1 },
                restaurant: { _id: 1, name: 1 },
                name: 1,
                description: 1,
                image_url: 1,
                price: 1,
                quantity: 1,
                availability: 1,
                preparation_time: 1,
                created_at: 1,
                updated_at: 1,
                reviews: {
                  $map: {
                    input: "$reviews",
                    as: "review",
                    in: {
                      id: "$$review._id",
                      rating: "$$review.rating",
                    },
                  },
                },
              },
            },
            { $limit: 5 },
          ],

          // Secondary Priority: Same category, different restaurant
          sameCategoryDifferentRestaurant: [
            {
              $match: {
                _id: { $ne: new mongoose.Types.ObjectId(currentFoodItemId) },
                category: new mongoose.Types.ObjectId(category),
                restaurant: { $ne: new mongoose.Types.ObjectId(restaurant) },
              },
            },
            {
              $lookup: {
                from: "categories",
                localField: "category",
                foreignField: "_id",
                as: "category",
              },
            },
            { $unwind: "$category" },
            {
              $lookup: {
                from: "restaurants",
                localField: "restaurant",
                foreignField: "_id",
                as: "restaurant",
              },
            },
            { $unwind: "$restaurant" },
            {
              $lookup: {
                from: "fooditemreviews",
                localField: "_id",
                foreignField: "fooditem_id",
                as: "reviews",
              },
            },
            {
              $project: {
                _id: 1,
                category: { name: 1, description: 1 },
                restaurant: { _id: 1, name: 1 },
                name: 1,
                description: 1,
                image_url: 1,
                price: 1,
                quantity: 1,
                availability: 1,
                preparation_time: 1,
                created_at: 1,
                updated_at: 1,
                reviews: {
                  $map: {
                    input: "$reviews",
                    as: "review",
                    in: {
                      id: "$$review._id",
                      rating: "$$review.rating",
                    },
                  },
                },
              },
            },
            { $limit: 5 },
          ],

          // Tertiary Priority: Matching tags in different restaurants
          sameTags: [
            {
              $match: {
                _id: { $ne: new mongoose.Types.ObjectId(currentFoodItemId) },
                tags: { $in: tags },
                restaurant: { $ne: new mongoose.Types.ObjectId(restaurant) },
              },
            },
            {
              $lookup: {
                from: "categories",
                localField: "category",
                foreignField: "_id",
                as: "category",
              },
            },
            { $unwind: "$category" },
            {
              $lookup: {
                from: "restaurants",
                localField: "restaurant",
                foreignField: "_id",
                as: "restaurant",
              },
            },
            { $unwind: "$restaurant" },
            {
              $lookup: {
                from: "fooditemreviews",
                localField: "_id",
                foreignField: "fooditem_id",
                as: "reviews",
              },
            },
            {
              $project: {
                category: { name: 1, description: 1 },
                restaurant: { _id: 1, name: 1 },
                name: 1,
                description: 1,
                image_url: 1,
                price: 1,
                quantity: 1,
                availability: 1,
                preparation_time: 1,
                created_at: 1,
                updated_at: 1,
                reviews: {
                  $map: {
                    input: "$reviews",
                    as: "review",
                    in: {
                      id: "$$review._id",
                      rating: "$$review.rating",
                    },
                  },
                },
              },
            },
            { $limit: 5 },
          ],
        },
      },

      // Concatenate results from the three facets and limit to 5 total results
      {
        $project: {
          results: {
            $concatArrays: [
              "$sameCategorySameRestaurant",
              "$sameCategoryDifferentRestaurant",
              "$sameTags",
            ],
          },
        },
      },
      { $unwind: "$results" },
      { $replaceRoot: { newRoot: "$results" } },
      { $limit: 10 },
    ]);

    return replaceMongoIdInData(categorizedRestaurant);
  } catch (error) {
    console.error("Error fetching related food items:", error);
    throw error;
  }
}

// Function to find  food items by restaurnantId
export const getFoodItemsByRestaurantId = unstable_cache(
  async (restaurantId) => {
    try {
      const foodItems = await FoodItem.find({ restaurant: restaurantId })
        .populate({
          path: "category",
          model: Category,
          select: "name",
        })
        .lean();

      const response = replaceMongoIdInData(foodItems);
      let tempArray = [];
      let categoriesOfEachRes = [
        ...new Set(response?.map((item) => item?.category)),
      ];

      return { foodItems: response, categoriesOfEachRes };
    } catch (error) {
      console.error("Error fetching food items: ", error);
    }
  },
  ["foodByRestaurant"],
  { tags: ["foodByRestaurant"] }
);

// function to find popular food
export const getPopularFood = unstable_cache(
  async () => {
    try {
      const foodItems = await FoodItem.aggregate([
        {
          $match: { availability: { $ne: false } },
        },
        {
          $lookup: {
            from: "fooditemreviews", // Collection name for FoodItemReview
            localField: "_id", // Field in FoodItem
            foreignField: "fooditem_id", // Field in FoodItemReview
            as: "reviews", // Alias for joined data
          },
        },
        {
          $lookup: {
            from: "restaurants", // Collection name for FoodItemReview
            localField: "restaurant", // Field in FoodItem
            foreignField: "_id", // Field in FoodItemReview
            as: "restaurant", // Alias for joined data
          },
        },
        {
          $unwind: { path: "$restaurant", preserveNullAndEmptyArrays: true },
        },

        {
          $lookup: {
            from: "orders", // Collection name for Order
            localField: "_id", // Field in FoodItem
            foreignField: "items.food_item_id", // Field in Order's items array
            as: "orders", // Alias for joined data
          },
        },
        //  Reshape orders to include only relevant data
        {
          $addFields: {
            orders: {
              $map: {
                input: "$orders",
                as: "order",
                in: {
                  id: { $toString: "$$order._id" },
                  quantity: {
                    $reduce: {
                      input: "$$order.items",
                      initialValue: 0,
                      in: {
                        $cond: [
                          { $eq: ["$$this.food_item_id", "$_id"] },
                          { $add: ["$$value", "$$this.quantity"] },
                          "$$value",
                        ],
                      },
                    },
                  },
                  total_price: "$$order.total_price",
                  payment_method: "$$order.payment_method",
                },
              },
            },
          },
        },
        // Project the final structure
        {
          $project: {
            _id: 0,
            id: { $toString: "$_id" },
            name: 1,
            description: 1,
            restaurant: {
              id: { $toString: "$restaurant._id" },
              name: 1,
              imageUrl: 1,
            },
            image_url: 1,
            tags: 1,
            quantity: 1,
            price: 1,
            delivery_time: 1,
            preaparation_time: 1,
            reviews: {
              $map: {
                input: "$reviews",
                as: "review",
                in: {
                  id: { $toString: "$$review._id" },
                  rating: "$$review.rating",
                  comment: "$$review.comment",
                },
              },
            },
            orders: 1,
          },
        },
      ]);

      // get popular foods based on rating and total sales
      const sortedFood = foodItems
        ?.map((food) => {
          const averageRating =
            food?.reviews.length > 0
              ? food.reviews.reduce(
                  (total, item) => (total += item?.rating),
                  0
                ) / food.reviews.length
              : 0;
          const totalSales =
            food?.orders.length > 0
              ? food.orders.reduce(
                  (total, item) => (total += item?.quantity),
                  0
                )
              : 0;

          return {
            id: food?.id,
            name: food?.name,
            restaurant: food?.restaurant,
            description: food?.description,
            image_url: food?.image_url,
            tags: food?.tags,
            totalSales,
            averageRating,
            quantity: food?.quantity,
            price: food?.price,
            delivery_time: food?.delivery_time,
            preparation_time: food?.preparation_time,
          };
        })
        .sort((a, b) => {
          if (b.averageRating !== a.averageRating) {
            return b.averageRating - a.averageRating;
          }
          return b.totalSales - a.totalSales;
        });

      return sortedFood;
    } catch (error) {
      console.error(error);
      throw new Error(
        error?.message || "Error occured while fetching food items "
      );
    }
  },
  ["foods"],
  {
    tags: ["foods"],
  }
);
