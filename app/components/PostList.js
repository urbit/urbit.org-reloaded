"use client";
import React, { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { formatDate, formatAuthors } from "../lib/utils";
import classNames from "classnames";
import Link from "next/link";

// Loader component to show while the page is waiting for the router
const Loader = () => <div>Loading...</div>;

const PostListContent = ({ allPostsYaml, categoryData }) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Initialize state based on URL parameters or default values
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get("category") || null);
  const [sortOption, setSortOption] = useState(searchParams.get("sort") || null);
  const [filteredSortedPosts, setFilteredSortedPosts] = useState(allPostsYaml);

  // Create category list for filter buttons
  const categoryList = Object.keys(categoryData).map((key) => ({
    title: key,
  }));

  // Update the URL whenever filters or sorting change
  const updateUrlParams = (category, sort) => {
    const params = new URLSearchParams();

    if (category) params.set("category", category);
    if (sort) params.set("sort", sort);

    router.push(`?${params.toString()}`, undefined, { shallow: true });
  };

  // Handle filtering and sorting logic within an effect
  useEffect(() => {
    let posts = [...allPostsYaml];

    // Apply category filtering
    if (selectedCategory) {
      posts = posts.filter((post) => post.data.category === selectedCategory);
    }

    // Apply sorting logic
    if (sortOption === "newest") {
      posts.sort((a, b) => new Date(b.data.date) - new Date(a.data.date));
    } else if (sortOption === "oldest") {
      posts.sort((a, b) => new Date(a.data.date) - new Date(b.data.date));
    }

    // Update the filtered and sorted post list
    setFilteredSortedPosts(posts);

    // Update the URL whenever state changes
    // updateUrlParams(selectedCategory,  sortOption);
  }, [selectedCategory, sortOption, allPostsYaml]);

  // Filter by category handler
  const handleCategoryClick = (category) => {
    setSelectedCategory((prevCategory) => (prevCategory === category ? null : category));
  };

  // Sort by option handler
  const handleSortClick = (option) => {
    setSortOption((prevOption) => (prevOption === option ? null : option));
  };

  return (
    <div>
      <div className="">
        {/* Filter Section */}
        <div className="">
          <span className="">Filter by: </span>
          <div className="flex gap-4 flex-wrap">
          {categoryList.map((category, index) => (
            <button
              key={index}
              onClick={() => handleCategoryClick(category.title)}
            >
              <div className="">
                <span>{category.title}</span>
                {selectedCategory === category.title && <span className="ml-2">×</span>}
              </div>
            </button>
          ))}
          </div>
        </div>

        {/* Sort Section */}
        <div className="">
          <span className="">Sort by: </span>
          <button
            onClick={() => handleSortClick("newest")}
          >
            <div className="">
              <span>Newest First</span>
              {sortOption === "newest'" && <span className="ml-2">×</span>}
            </div>
          </button>
          <button onClick={() => handleSortClick("oldest")}>
            <div className="">
              <span>Oldest First</span>
              {sortOption === "oldest'" && <span className="ml-2">×</span>}
            </div>
          </button>
        </div>
      </div>

      {/* Post List */}
      <div className="mb-4 flex flex-col">
        {filteredSortedPosts.map((postData) => (
          <Link
            key={postData.relativePath}
            href={postData.relativePath}
            data-category={postData.data.category}
            className={classNames("")}
          >
            ---
            <div className={classNames("")}>
              <span className="">{postData.data.title}</span>
              <div className="flex flex-col">
                <span className="">{formatDate(postData.data.date)}</span>
                <span className="">{formatAuthors(postData.data.authors)}</span>
              </div>
            </div>
            <div className={classNames("")}>{postData.data.short_description}</div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export const PostList = ({ allPostsYaml, categoryData }) => {
  return (
    <Suspense fallback={<Loader />}>
      <PostListContent allPostsYaml={allPostsYaml} categoryData={categoryData} />
    </Suspense>
  );
};
