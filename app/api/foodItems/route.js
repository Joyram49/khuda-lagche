import { getAllFood } from "@/queries/foodItems";

export async function GET(req) {
  const url = new URL(req.url);
  const queryParams = {
    search: url.searchParams.get("search"),
    sortBy: url.searchParams.get("sortBy"),
    minPrice: parseInt(url.searchParams.get("minPrice"), 10) || 20,
    maxPrice: parseInt(url.searchParams.get("maxPrice"), 10) || 3000,
    categoryIds: url.searchParams.get("categoryIds")
      ? url.searchParams.get("categoryIds").split(",")
      : [],
    page: parseInt(url.searchParams.get("page"), 10) || 1,
    limit: parseInt(url.searchParams.get("limit"), 10) || 10,
  };

  try {
    const foodItems = await getAllFood(queryParams);
    return new Response(JSON.stringify(foodItems), { status: 200 });
  } catch (error) {
    console.error("Error in getAllFood:", error);
    return new Response(
      JSON.stringify({ message: "Failed to get foodItems", error }),
      { status: 500 }
    );
  }
}
