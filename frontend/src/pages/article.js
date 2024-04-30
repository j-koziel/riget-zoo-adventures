import { useParams } from "react-router-dom";
import React from "react";
import axios from "axios";
import { toast } from "sonner";

import { backendRoutes } from "../lib/config";
import { ReloadIcon } from "@radix-ui/react-icons";

/**
 * A page displaying a single article
 * @returns {React.JSX.Element}
 */
export function Article() {
  const [article, setArticle] = React.useState();

  const { articleId } = useParams();

  React.useEffect(() => {
    const getAndSetArticle = async () => {
      try {
        const res = await axios.get(backendRoutes.articles.getById(articleId));
        setArticle(res.data);
      } catch (err) {
        if (!err.response) {
          toast.error("An unexpected error has occurred");
        }

        toast.error(err.response.data.detail);
      }
    };

    getAndSetArticle();
  }, []);

  return article ? (
    <div className="min-h-screen flex flex-col items-center p-24">
      <img
        src={article.images[0].title_img.img_src}
        className=" max-h-[500px] object-contain"
      />
      <h1 className="text-h1-sm md:text-h1-md lg:text-h1-lg font-bold">
        {article.title}
      </h1>
      <div className="flex flex-col gap-y-2 text-left leading-5">
        {article.sections.map((section, i) => (
          <p key={i}>{section}</p>
        ))}
      </div>
    </div>
  ) : (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <ReloadIcon className="animate-spin" height={24} width={24} />
    </div>
  );
}
