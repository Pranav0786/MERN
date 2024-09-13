import "./App.css";
import { useContext, useEffect } from "react";
import { AppContext } from "./context/AppContext";

import { Routes , Route, useSearchParams, useLocation } from "react-router-dom";
import { CssSyntaxError } from "postcss";
import Home from "./context/Pages/Home";
import BlogPage from "./context/Pages/BlogPage";
import CategoryPage from "./context/Pages/CategoryPage";
import TagPage from "./context/Pages/TagPage";


export default function App() {
  const { fetchBlogPosts } = useContext(AppContext);

  const [searchParams, setSearchParams] = useSearchParams() ;
  const location = useLocation() ;

  useEffect(() => {
    const page = searchParams.get("page") ?? 1 ;
    if( location.pathname.includes("tags")) {
      // show tag page
      const tag = location.pathname.split("/").at(-1).replaceAll("-"," ") ;
      fetchBlogPosts(Number(page), tag) ;
    }
    else if( location.pathname.includes("categories")) {
      const category = location.pathname.split("/").at(-1).replaceAll("-"," ") ;
      fetchBlogPosts(Number(page), null , category) ;
    }
    else {
      fetchBlogPosts(Number(page)) ;
    }

  }, [location.pathname, location.search]);




  return (
      <Routes>
        <Route path="/" element= { <Home />} />
        <Route path="/blog/:blogId" element= { <BlogPage />} />
        <Route path="/tags/:tag" element= { <TagPage />} />
        <Route path="/categories/:category" element= { <CategoryPage />} />
      </Routes>
  ) ;
}
