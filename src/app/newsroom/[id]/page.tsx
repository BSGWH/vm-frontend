import { notFound } from "next/navigation";
import fs from "fs";
import path from "path";
import "./index.css";

const getArticleData = (id) => {
  const filePath = path.join(process.cwd(), "public", "articles.json");
  const fileContents = fs.readFileSync(filePath, "utf8");
  const articles = JSON.parse(fileContents);
  return articles.find((article) => article.id === id);
};

export async function generateStaticParams() {
  const filePath = path.join(process.cwd(), "public", "articles.json");
  const fileContents = fs.readFileSync(filePath, "utf8");
  const articles = JSON.parse(fileContents);

  return articles.map((article) => ({
    id: article.id,
  }));
}

const ArticlePage = ({ params }) => {
  const article = getArticleData(params.id);

  if (!article) {
    notFound();
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
