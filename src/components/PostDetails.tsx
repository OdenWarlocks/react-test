import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import Loader from './Loader';

// Style for the detail container with a clean and modern look.
const DetailContainer = styled.article`
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  padding: 20px;
  max-width: 800px;
  margin: 20px auto;
  font-family: Arial, sans-serif;
`;

// Larger title to emphasize the post title.
const Title = styled.h1`
  color: #333;
  font-size: 24px;
`;

// Styled paragraph for author information.
const Author = styled.p`
  color: #666;
  font-size: 16px;
`;

// Styled paragraph for the summary to make it stand out.
const Summary = styled.p`
  color: #444;
  margin-top: 20px;
`;

// TypeScript interface for the post structure, ensuring type safety.
interface Post {
  id: string;
  title: string;
  author: {
    name: string;
    avatar: string;
  };
  summary: string;
  categories: Array<{
    id: string;
    name: string;
  }>;
}

const PostDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // Extract post ID from the URL.
  const [post, setPost] = useState<Post | null>(null); // State for storing the post data.
  const [loading, setLoading] = useState<boolean>(true); // Loading state to manage UI feedback.
  const [error, setError] = useState<string | null>(null); // Error state for error handling.

  useEffect(() => {
     // Fetches post data from an API and updates the state accordingly.
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/posts');
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        const foundPost = data.posts.find((p: Post) => p.id === id);
        if (!foundPost) {
          throw new Error('Post not found');
        }
        setPost(foundPost);
        setLoading(false);
      } catch (error) {
        setError('Failed to fetch posts.');
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [id]); // Dependency on 'id' to re-fetch if the ID changes

 

  // Conditional rendering based on the state.
  if (loading) return <Loader />;
  if (error) return <div>Error: {error}</div>;
  if (!post) return <div>Post not found.</div>;

  return (
    <DetailContainer>
      <Title>{post.title}</Title>
      <Author>By: {post.author.name}</Author>
      <Summary>{post.summary}</Summary>
      {/* Placeholder for additional post details rendering */}
    </DetailContainer>
  );
};

export default PostDetail;
