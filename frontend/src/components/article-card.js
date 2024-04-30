import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { useNavigate } from "react-router-dom";

/**
 * Renders a card containing article information such as title image, title and the author. Links to the desired article
 * @param {{article: {id: string, images: any[], summary: string, author_img_src: string, author: string, sections: string[] }}} props
 * @returns
 */
export function ArticleCard({ article }) {
  const navigate = useNavigate();

  return (
    <div
      className="rounded-md bg-primary text-primary-foreground border-2 border-border cursor-pointer hover:scale-105 transition-all"
      id="article-card"
      onClick={() => navigate(`/articles/${article.id}`)}
    >
      <img src={article.images[0].title_img.img_src} className="rounded-t-md" />
      <div className="p-4">
        <h2 className="text-xl font-bold">{article.title}</h2>
        <p>{article.summary}</p>
        <div id="article-author" className="flex items-center gap-x-2">
          <Avatar>
            <AvatarImage src={article.author_img_src} />
            <AvatarFallback>
              {/* Takes the name of the author and returns the first letter of each name */}
              {article.author
                .split(" ")
                .map((str) => str[0])
                .join()}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <p className="font-bold">Written by</p>
            <p>{article.author}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
