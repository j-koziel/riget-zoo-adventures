import uuid
from pydantic import BaseModel


class Article(BaseModel):
    id: str = str(uuid.uuid4())
    author: str
    author_img_src: str
    author_img_alt: str
    date_written: str
    title: str
    summary: str
    images: list
    sections: list[str]