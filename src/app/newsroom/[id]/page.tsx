import { notFound } from "next/navigation";
import fs from "fs";
import path from "path";
import "./index.css";

interface Article {
  id: string;
  title: string;
  date: string;
  image: string;
  content: string;
}

const getArticleData = (id: string): Article | undefined => {
  const filePath = path.join(process.cwd(), "public", "articles.json");
  const fileContents = fs.readFileSync(filePath, "utf8");
  const articles: Article[] = JSON.parse(fileContents);
  return articles.find((article) => article.id === id);
};

export async function generateStaticParams() {
  const filePath = path.join(process.cwd(), "public", "articles.json");
  const fileContents = fs.readFileSync(filePath, "utf8");
  const articles: Article[] = JSON.parse(fileContents);

  return articles.map((article) => ({
    id: article.id,
  }));
}

interface Params {
  params: {
    id: string;
  };
}

const ArticlePage = ({ params }: Params) => {
  const article = getArticleData(params.id);

  if (!article) {
    notFound();
    return null;
  }

  return (
    <div className="container mx-auto p-10 py-20 md:p-40 md:px-64">
      <h1 className="text-3xl md:text-5xl font-bold mb-4 py-6" style={{ lineHeight: '1.5' }}>{article.title}</h1>
      <p className="text-gray-500">{article.date}</p>
      <img
        src={article.image}
        alt={article.title}
        className="rounded-lg my-10 shadow-md w-full h-[400px]"
      />
      <div
        className={"article-content"}
        dangerouslySetInnerHTML={{ __html: article.content }}
      />
    </div>
  );
};

export default ArticlePage;
