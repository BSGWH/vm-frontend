"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

interface Article {
  id: string;
  title: string;
  date: string;
  image: string;
  content: string;
}

const HomePage = () => {
  const [articles, setArticles] = useState<Article[]>([]);

  useEffect(() => {
    const fetchArticles = async () => {
      const res = await fetch("/articles.json");
      const data: Article[] = await res.json();
      setArticles(data);
    };
    fetchArticles();
  }, []);

  return (
    <div className="container mx-auto">
      <section className="md:px-6 border-b border-gray-200 md:py-12">
        <div className="flex flex-wrap justify-between my-10 mt-20">
          {articles.length > 0 && (
            <div className="w-full">
              <div className="flex-col md:flex-row-reverse p-4 rounded-lg shadow-md h-[400px] flex">
                <img
                  src={articles[0].image}
                  alt={articles[0].title}
                  className="md:w-2/3 rounded-lg mb-4 md:mb-0 md:mr-4"
                />
                <div className="w-full mt-auto md:my-auto md:w-1/2 lg:w-2/5 justify-center flex flex-col pl-4 md:pr-10 lg:pr-20">
                  <p className="text-gray-500 mb-2">{articles[0].date}</p>
                  <h2 className="text-xl md:text-2xl lg:text-3xl font-semibold mb-2 md:mb-6">
                    {articles[0].title}
                  </h2>
                  <Link href={`/newsroom/${articles[0].id}`} passHref>
                    <Button className="border inline-block px-4 py-2 text-white rounded-lg bg-black">
                      Read more
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      <section className="my-8 md:my-16 md:px-6">
        <h2 className="text-xl md:text-3xl font-bold">Latest News</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
          {articles.slice(1, 5).map((article) => (
            <Link href={`/newsroom/${article.id}`} key={article.id} passHref>
              <div className="bg-white p-4 rounded-lg shadow-md cursor-pointer hover:shadow-lg transition-shadow duration-200 flex flex-col h-[300px]">
                <img
                  src={article.image}
                  alt={article.title}
                  className="rounded-lg mb-4 object-cover h-[220px]"
                />
                <div className="flex flex-col flex-grow">
                  <h3 className="text-regular md:text-xl font-semibold line-clamp-2">{article.title}</h3>
                  <p className="text-gray-500">{article.date}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="my-16 md:px-6">
        <h2 className="text-xl md:text-3xl font-bold">News by topic</h2>
        <div className="flex flex-wrap my-2 md:my-4">
          <button className="px-4 py-2 m-2 bg-gray-200 rounded-full">
            All
          </button>
          <button className="px-4 py-2 m-2 bg-gray-200 rounded-full">
            Company
          </button>
          <button className="px-4 py-2 m-2 bg-gray-200 rounded-full">
            Product
          </button>
          <button className="px-4 py-2 m-2 bg-gray-200 rounded-full">
            Policy
          </button>
          <button className="px-4 py-2 m-2 bg-gray-200 rounded-full">
            Community
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {articles.slice(5).map((article) => (
            <Link href={`/newsroom/${article.id}`} key={article.id} passHref>
              <div className="bg-white p-4 rounded-lg shadow-md cursor-pointer hover:shadow-lg transition-shadow duration-200 h-[300px] flex flex-col">
                <img
                  src={article.image}
                  alt={article.title}
                  className="rounded-lg mb-2 object-cover h-[220px]"
                />
                <div className="flex flex-col flex-grow">
                  <h3 className="text-regular md:text-xl font-semibold line-clamp-2">{article.title}</h3>
                  <p className="text-gray-500">{article.date}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
};

export default HomePage;
