import React from "react";
import { toast } from "sonner";
import axios from "axios";

import { Button } from "../components/ui/button";
import { SearchInput } from "../components/search-input";
import { ArticleCard } from "../components/article-card";
import { PageHeading } from "../components/page-heading";
import { SearchResults } from "../components/search-results";
import { backendRoutes } from "../lib/config";

/**
 * A page displaying all the articles that are stored on the RZA database
 * @returns {React.JSX.Element}
 */
export function Articles() {
  const [articlesQuery, setArticlesQuery] = React.useState("");
  const [articleData, setArticleData] = React.useState();

  React.useEffect(() => {
    const getAndSetArticles = async () => {
      try {
        const res = await axios.get(backendRoutes.articles.getAll);
        console.log(res);

        setArticleData(res.data);
      } catch (err) {
        if (!err.response) {
          toast.error("An unexpected error has occurred");
          return;
        }

        toast.error(err.response.data.detail);
      }
    };

    getAndSetArticles();
  }, []);

  return (
    <div id="articles-container" className="min-h-screen flex flex-col p-24">
      <PageHeading
        title="Articles"
        description="Check out our interesting articles"
      />

      <div className="flex items-center gap-x-1 self-center mb-4">
        <SearchInput
          label="Search for Articles"
          placeholder="What do lions eat?"
          description="Search for an article"
          id="article-search-input"
          value={articlesQuery}
          setValue={setArticlesQuery}
          name={"article-search-input"}
        />
        <Button
          onClick={async () => {
            try {
              if (!articlesQuery) {
                toast.error("Please enter something into the text box");
                return;
              }

              const res = await axios.get(
                backendRoutes.articles.getByName(articlesQuery)
              );
              setArticleData([res.data]);
            } catch (err) {
              if (!err.response) {
                toast.error("An unexpected error has occurred");
                return;
              }

              toast.error(err.response.data.detail);
            }
          }}
        >
          Search
        </Button>
      </div>
      <h2 className="text-2xl font-bold">Our latest articles</h2>
      {articleData && (
        <SearchResults
          results={articleData.map((article) => (
            <ArticleCard article={article} />
          ))}
        />
      )}
    </div>
  );
}
