"use client";
import React, { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { formatDate, formatAuthors } from "../lib/utils";
import classNames from "classnames";
import Link from "next/link";

// Loader component to show while the page is waiting for the router
const Loader = () => <div>Loading...</div>;

const PostListContent = ({ allPostFrontMatter, statuses, programs }) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Initialize state based on URL parameters or default values
  const [selectedCategory, setSelectedCategory] = useState(
    searchParams.get("category") || null
  );
  const [selectedStatus, setSelectedStatus] = useState(
    searchParams.get("status") || null
  );
  const [selectedProgram, setSelectedProgram] = useState(
    searchParams.get("program") || null
  );
  const [sortOption, setSortOption] = useState(
    searchParams.get("sort") || null
  );
  const [filteredSortedPosts, setFilteredSortedPosts] = useState(allPostFrontMatter);

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
    let posts = [...allPostFrontMatter];

    // Apply category filtering
    if (selectedCategory) {
      posts = posts.filter((post) => post?.taxonomies?.grant_type === selectedCategory);
    }

    // Apply status filteringselec
    if (selectedStatus) {
      posts = posts.filter((post) => post.extra.status === selectedStatus);
    }

    // Apply program filtering
    if (selectedProgram) {
      posts = posts.filter((post) => post.data.program === selectedProgram);
    }

    // Update the filtered and sorted post list
    setFilteredSortedPosts(posts);

    // Update the URL whenever state changes
    updateUrlParams(
      selectedCategory,
      selectedStatus,
      selectedProgram,
      sortOption
    );
  }, [
    selectedCategory,
    selectedStatus,
    selectedProgram,
    sortOption,
    allPostFrontMatter,
  ]);

  // Filter by category handler
  const handleCategoryClick = (category) => {
    setSelectedCategory((prevCategory) =>
      prevCategory === category ? null : category
    );
  };

  // Filter by status handler
  const handleStatusClick = (status) => {
    setSelectedStatus((prevStatus) => (prevStatus === status ? null : status));
  };

  // Filter by program handler
  const handleProgramClick = (program) => {
    setSelectedProgram((prevProgram) =>
      prevProgram === program ? null : program
    );
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
                <div
                  className={classNames({
                    "text-white": selectedStatus === status,
                  })}
                >
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
                <div
                  className={classNames({
                    "text-white": selectedProgram === program,
                  })}
                >
                  <span>{program}</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Post List */}
      <div className="mb-4 mt-[.2em] flex flex-col col-span-5">
        <span className="leading-[1cap] mb-4">
          Showing {filteredSortedPosts.length} grants
        </span>
        {/* <div className="border-b-[.7px] border-white w-full pt-21px"></div> */}
        {filteredSortedPosts.map((postData) => {
          const { title, date, extra, taxonomies } = postData.data;
          let reward = extra?.reward?.match(/\d+/)[0];
          // console.log(title, reward);
          // console.log(postData.data)
          return (
            <React.Fragment key={postData.relativePath}>
              <Link
                href={postData.relativePath}
                data-category={taxonomies?.grant_type}
                className="pt-[10px] pb-[10px] px-[9px] bg-gray-d9 text-black text-25px group rounded-[5px] mb-2 hover:text-gray-87 font-[400]"
              >
                <div className={classNames("leading-120 ")}>
                  <div>{title}</div>
                  <div className="flex flex-col">
                    <div className="flex flex-row text-gray-87">
                      Reward:
                      <div className="flex flex-row ml-[.2em]">
                        {[...Array(Number(reward))].map((_, i) => (
                          <div key={i}></div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                <div className={classNames("pt-5")}>{extra?.description}</div>
                <div
                  className={classNames("text-gray-87 !text-21px pt-6 flex gap-x-1")}
                >
                  <span className="bg-black text-white !font-[600] rounded-[5px] px-[6px] py-[2px]">
                    {extra?.completed ? "Completed" : "Open"}
                  </span>
                  {taxonomies?.grant_type &&
                  <span className="bg-gray-87 text-black rounded-[5px] px-[6px] py-[2px]">
                    {taxonomies?.grant_type}
                    </span>
                  }
                </div>
              </Link>
              {/* <div className="border-b-[.7px] border-white w-full"></div> */}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};

export const PostList = ({
  allPostFrontMatter,
  categoryData,
  statuses,
  programs,
}) => {
  return (
    <Suspense fallback={<Loader />}>
      <PostListContent
        allPostFrontMatter={allPostFrontMatter}
        categoryData={categoryData}
        statuses={statuses}
        programs={programs}
      />
    </Suspense>
  );
};
