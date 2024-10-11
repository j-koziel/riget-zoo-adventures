import os
from fastapi import APIRouter, HTTPException, status

from db.models.article import Article
from db.models.user import UserInDb
from utils.db import read_db, write_db
from utils import user

router = APIRouter(prefix="/api/v1/articles")

@router.get("/", response_model=list[Article])
async def get_all_articles():
    """Returns all the articles stored in the articles JSON database

    Args: 
        None

    Returns:
        list[Article]: A list of all the Article objects found in the JSON file
    """
    return read_db(f"{os.getcwd()}/db/articles.json", Article)

@router.get("", response_model=Article)
async def get_article_by_query(id: str = "", name: str = "", user_id: str = ""):
    """Finds article by the query provided. Also if a user_id is provided then updates that user's "num_articles_read" field

    Args:
        id (str): The id of the article to be found
        name (str): The name of the article to be found
        user_id (str): The id of the user to be updated

    Returns:
        Article: The article which was found
    """
    articles_db = read_db(f"{os.getcwd()}/db/articles.json", Article)
    users_db = read_db(f"{os.getcwd()}/db/users.json", UserInDb)

    for article in articles_db:
        if not id == "":
            print("hello")
            if article.id == id:
                if user_id:
                    user.update_num_articles_read(user_id, users_db)
                    write_db(f"{os.getcwd()}/db/users.json", users_db)
                    return article
                return article
        
        if not name == "":
            if name in article.title.lower():
                print(name)
                if user_id:
                    user.update_num_articles_read(user_id, users_db)
                    write_db(f"{os.getcwd()}/db/users.json", users_db)
                    return article
                return article
        
    raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="That article was not found")
