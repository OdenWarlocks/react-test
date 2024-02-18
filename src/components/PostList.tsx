import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import PostItem from './PostItem';
import CategoryFilter from './CategoryFilter';
import Loader from './Loader';
import Pagination from './Pagination';

// Styled-components for layout. Using grid for responsive design.
const PostListContainer = styled.section` 
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;

  @media (max-width: 820px) { // Responsive adjustments for smaller screens
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 540px) { // Adjust for very small screens
    grid-template-columns: 1fr;
  }
`;

// Wrapper for the category filter to center it on the page
const FilterWrapper = styled.div`
  display: flex;
  justify-content: center;
  padding: 20px;
`;

// Define TypeScript interfaces for props to ensure type safety
interface Category {
  id: string;
  name: string;
}

interface Author {
  name: string;
  avatar: string;
}

interface Post {
  id: string;
  title: string;
  publishDate: string;
  author: Author;
  summary: string;
  categories: Category[];
}

const PostList: React.FC = () => {
  const [allPosts, setAllPosts] = useState<Post[]>([]);
  const [displayPosts, setDisplayPosts] = useState<Post[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const location = useLocation(); // React Router hook for accessing the URL.
  const postsPerPage = 6; // Limit the number of posts per page.

  // Fetch posts from an API on component mount.
  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        const response = await fetch('/api/posts');
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        setAllPosts(data.posts);
        setLoading(false);
      } catch (error) {
        setError('Failed to fetch posts.');
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false); // Ensure loading state is updated in case of success or failure.
      }
    };

    fetchPosts();
  }, []);

  // Update displayed posts based on category filter changes.
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const categoryFilter = params.get('category');
    const filteredPosts = categoryFilter
      ? allPosts.filter(post => post.categories.some(category => category.id === categoryFilter))
      : allPosts;

    setDisplayPosts(filteredPosts);
    setCurrentPage(1); // Reset to the first page whenever the filter changes.
  }, [location.search, allPosts]); // Depend on URL search params and allPosts to trigger updates.

  // Pagination logic: calculate total pages and slice posts for the current page.
  const totalPages = Math.ceil(displayPosts.length / postsPerPage);
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = displayPosts.slice(indexOfFirstPost, indexOfLastPost);

  // Update current page state when pagination control is used.
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  if (loading) return <Loader />;
  if (error) return <div>Error: {error}</div>;

  return (
    <>
      <FilterWrapper>
        {/* Category filter component for selecting post categories */}
        <CategoryFilter categories={allPosts.reduce((acc: Category[], post) => {
          post.categories.forEach((category) => {
            if (!acc.some(accCategory => accCategory.id === category.id)) {
              acc.push(category);
            }
          });
          return acc;
        }, [])} />
      </FilterWrapper>
      {/* Display posts in a responsive grid */}
      <PostListContainer>
        {currentPosts.map((post) => (
          <PostItem key={post.id} post={post} />
        ))}
      </PostListContainer>
      {/* Pagination controls */}
      {totalPages > 1 && (
        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={paginate} />
      )}
    </>
  );
};

export default PostList;
