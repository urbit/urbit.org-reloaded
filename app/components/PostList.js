"use client";
import React, { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { formatDate, formatAuthors } from "../lib/utils";
import classNames from "classnames";
import Link from "next/link";

// Loader component to show while the page is waiting for the router
const Loader = () => <div>Loading...</div>;

const PostListContent = ({ allPostsYaml, statuses, programs }) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Initialize state based on URL parameters or default values
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get("category") || null);
  const [selectedStatus, setSelectedStatus] = useState(searchParams.get("status") || null);
  const [selectedProgram, setSelectedProgram] = useState(searchParams.get("program") || null);
  const [sortOption, setSortOption] = useState(searchParams.get("sort") || null);
  const [filteredSortedPosts, setFilteredSortedPosts] = useState(allPostsYaml);

  // const categoryList = categoryData;

  // Update the URL whenever filters or sorting change
  const updateUrlParams = (category, status, program, sort) => {
    const params = new URLSearchParams();

    if (category) params.set("category", category);
    if (status) params.set("status", status);
    if (program) params.set("program", program);
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

    // Apply status filtering
    if (selectedStatus) {
      posts = posts.filter((post) => post.data.status === selectedStatus);
    }

    // Apply program filtering
    if (selectedProgram) {
      posts = posts.filter((post) => post.data.program === selectedProgram);
    }

    // Update the filtered and sorted post list
    setFilteredSortedPosts(posts);

    // Update the URL whenever state changes
    updateUrlParams(selectedCategory, selectedStatus, selectedProgram, sortOption);
  }, [selectedCategory, selectedStatus, selectedProgram, sortOption, allPostsYaml]);

  // Filter by category handler
  const handleCategoryClick = (category) => {
    setSelectedCategory((prevCategory) => (prevCategory === category ? null : category));
  };

  // Filter by status handler
  const handleStatusClick = (status) => {
    setSelectedStatus((prevStatus) => (prevStatus === status ? null : status));
  };

  // Filter by program handler
  const handleProgramClick = (program) => {
    setSelectedProgram((prevProgram) => (prevProgram === program ? null : program));
  };

  // Sort by option handler
  const handleSortClick = (option) => {
    setSortOption((prevOption) => (prevOption === option ? null : option));
  };

  return (
    <div className="grid md:grid-cols-6 w-full mb-[5rem]">
      <div className="col-span-1">
        {/* Filter Section */}
        <div className="md:mt-[0rem]  flex flex-col font-[500] mb-12 md:mb-0">
          {/* Category Filter */}

          <span className="">Status:</span>
          <div className="flex gap-x-4 md:flex-col items-start text-gray-87">
            {statuses.map((status, index) => (
              <button
                key={index}
                className="link"
                onClick={() => handleStatusClick(status)}
              >
                <div className={classNames({ "text-white": selectedStatus === status })}>
                  <span>{status}</span>
                </div>
              </button>
            ))}
          </div>

          <span className="pt-4">Program:</span>
          <div className="flex flex-row gap-x-4 md:flex-col items-start text-gray-87">
            {programs.map((program, index) => (
              <button
                key={index}
                className="link"
                onClick={() => handleProgramClick(program)}
              >
                <div className={classNames({ "text-white": selectedProgram === program })}>
                  <span>{program}</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Post List */}
      <div className="mb-4 mt-[.2em] flex flex-col col-span-4">
        <span className="leading-[1cap]">Showing {filteredSortedPosts.length} grants</span>
        <div className="border-b-[.7px] border-white w-full pt-21px"></div>
        {filteredSortedPosts.map((postData) => (
          <React.Fragment key={postData.relativePath}>
            <Link
              href={postData.relativePath}
              data-category={postData.data.category}
              className="pt-12px text-25px group hover:text-gray-87 font-[400]"
            >
              <div className={classNames("leading-120 ")}>
                <div>{postData.data.title}</div>
                <div className="flex flex-col">
                  <div className="flex flex-row">
                    Reward:
                    <div className="flex flex-row ml-[.2em]">
                      {[...Array(postData?.data?.reward)].map((_, i) => (
                        <div key={i}></div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <div className={classNames("pt-5")}>{postData.data.subtitle}</div>
              <div className={classNames("text-gray-87 !text-21px pt-6 pb-2 ")}>
                {postData.data.status}, {postData.data.category}
              </div>
            </Link>
            <div className="border-b-[.7px] border-white w-full"></div>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export const PostList = ({ allPostsYaml, categoryData, statuses, programs }) => {
  return (
    <Suspense fallback={<Loader />}>
      <PostListContent
        allPostsYaml={allPostsYaml}
        categoryData={categoryData}
        statuses={statuses}
        programs={programs}
      />
    </Suspense>
  );
};
