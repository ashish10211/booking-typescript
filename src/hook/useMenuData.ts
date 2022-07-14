import { useEffect, useState } from "react";
import { z } from "zod";

const itemSchema = z.object({
  id: z.number(),
  name: z.string(),
  price: z.number(),
});

const menuSchema = z.object({
  starters: z.array(itemSchema),
  mains: z.array(itemSchema),
  desserts: z.array(itemSchema),
});

export type MenuSchema = z.infer<typeof menuSchema>;

const useMenuData = (url: string) => {
  const [data, setData] = useState<MenuSchema | null>(null);
  const [err, setError] = useState<
    | z.inferFlattenedErrors<typeof menuSchema>
    | { message: "something went wrong with API" }
    | null
  >(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        const res = menuSchema.safeParse(data);
        if (res.success) {
          setData(res.data);
        } else {
          setError(res.error.flatten());
        }
        setIsLoading(false);
      })
      .catch((err) => {
        console.log("Error ", err);
        setIsLoading(false);
        setError({ message: "something went wrong with API" });
      });
  }, [url]);

  return { data, err, isLoading };
};
export default useMenuData;
