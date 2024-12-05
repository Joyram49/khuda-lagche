import { getAllRestaurants } from "@/queries/restaurants";

export async function GET(request) {
  const url = new URL(request.url);
  const queryParams = {
    search: url.searchParams.get("search"),
    sortBy: url.searchParams.get("sortBy"),
    categoryIds: url.searchParams.get("categoryIds")
      ? url.searchParams.get("categoryIds").split(",")
      : [],
    page: parseInt(url.searchParams.get("page"), 10) || 1,
    limit: parseInt(url.searchParams.get("limit"), 10) || 5,
  };

  try {
    const restaurants = await getAllRestaurants(queryParams);
    return new Response(JSON.stringify(restaurants), { status: 200 });
  } catch (error) {
    return new Response(
      { message: error?.message || "failed to get restaurants info" },
      { status: 500 }
    );
  }
}
