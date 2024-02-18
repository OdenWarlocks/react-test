import React from 'react';
import styled from 'styled-components';
import PostList from "./PostList";
import PostDetail from './PostDetails'; 
import Nav from './Nav';
import Footer from './Footer';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Using `main` for the main content wrapper for semantic purposes
const MainContent = styled.main`
  min-height: 100vh; // Ensures the content fills the viewport height
  padding: 20px; // Provides consistent spacing around the content
  background-color: #f0f2f5; // Sets a neutral background color
`;

const App: React.FC = () => {
  return (
    <Router> {/* Encapsulates the application within a Router component */}
      <>
        <Nav /> {/* Navigation bar at the top of the page */}
        <MainContent>
          <Routes>
            {/* Defines the main route to list posts */}
            <Route path="/" element={<PostList />} />
            {/* Defines a dynamic route for accessing individual post details */}
            <Route path="/posts/:id" element={<PostDetail />} />
          </Routes>
        </MainContent>
        <Footer /> {/* Footer component displayed at the bottom */}
      </>
    </Router>
  );
};

export default App;
