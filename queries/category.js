import { replaceMongoIdInData } from "@/lib/convertData";
import { Category } from "@/models/category-model";
import { unstable_cache } from "next/cache";

export const getAllCategory = unstable_cache(
  async () => {
    const allCategory = await Category.find({}).lean();
    return replaceMongoIdInData(allCategory);
  },
  ["category"],
  { tags: ["category"] }
);
