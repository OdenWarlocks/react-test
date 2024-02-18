import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

// Styling for the post card with hover effects for interactivity.
const PostCard = styled.article`
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
  cursor: pointer;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 12px rgba(0,0,0,0.2);
  }
`;

// Title styling with emphasis on readability and importance.
const PostTitle = styled.h2`
  font-size: 24px;
  margin: 16px;
  color: #343a40;
`;

// Summary styling for good readability.
const PostSummary = styled.p`
  font-size: 16px;
  margin: 0 16px 16px;
  color: #495057;
`;

// Author information layout with alignment.
const AuthorInfo = styled.div`
  display: flex;
  align-items: center;
  margin: 16px;
`;

// Avatar styling for visual representation of the author.
const Avatar = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-right: 15px;
  border: 2px solid #343a40;
`;


interface PostProps {
  post: {
    id: string;
    title: string;
    publishDate: string;
    author: {
      name: string;
      avatar: string;
    };
    summary: string;
    categories: Array<{
      id: string;
      name: string;
    }>;
  };
}

const PostItem: React.FC<PostProps> = ({ post }) => {
  const navigate = useNavigate();

  // Function to navigate to the post's detail page on click.
  const goToDetailPage = () => {
    navigate(`/posts/${post.id}`);
  };

  return (
    
    <PostCard onClick={goToDetailPage} role="button" tabIndex={0} aria-label={`Read more about ${post.title}`}>
      <PostTitle>{post.title}</PostTitle>
      <AuthorInfo>
        <Avatar src={post.author.avatar} alt={`Avatar of ${post.author.name}`} />
        <div>
          <div>{post.author.name}</div>
          <div>{new Date(post.publishDate).toLocaleDateString()}</div>
        </div>
      </AuthorInfo>
      <PostSummary>{post.summary}</PostSummary>
    </PostCard>
  );
};

export default PostItem;
