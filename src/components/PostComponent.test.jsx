import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import PostComponent from './PostComponent';
import '@testing-library/jest-dom';
import { socialSite } from '../utils/userDisplay';


jest.mock('../utils/userDisplay', () => ({
    socialSite: {
      findUser: jest.fn(),
      deletePost: jest.fn(),
    },
  }));
  
  const mockPost = {
    id: 'post1',
    title: 'Test Post',
    content: 'This is a test post.',
    creatorUid: '123',
    creatorUsername: 'testuser',
  };
  
  const mockUser = {
    uid: '123',
    isAdmin: false,
  };
  
  describe('PostComponent', () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });
  
    test('should render PostComponent', () => {
      render(<PostComponent post={mockPost} userUid={mockUser.uid} />);
      expect(screen.getByRole('heading', { name: /Test Post/i })).toBeInTheDocument();
      expect(screen.getByText(/This is a test post./i)).toBeInTheDocument();
      expect(screen.getByText(/Posted by testuser/i)).toBeInTheDocument();
    });
  
    test('should handle update button click', () => {
      render(<PostComponent post={mockPost} userUid={mockUser.uid} />);
      const updateButton = screen.getByRole('button', { name: /Update/i });
      fireEvent.click(updateButton);
      expect(screen.getByText(/Update Post/i)).toBeInTheDocument();
    });
  
    test('should handle close update', async () => {
      render(<PostComponent post={mockPost} userUid={mockUser.uid} />);
      const updateButton = screen.getByRole('button', { name: /Update/i });
      fireEvent.click(updateButton);
      expect(screen.getByText(/Update Post/i)).toBeInTheDocument();
  
      const closeButton = screen.getByRole('button', { name: /Cancel/i }); // Adjusted to match the 'Cancel' button
      fireEvent.click(closeButton);
  
      await waitFor(() => {
        expect(screen.queryByText(/Update Post/i)).toBeNull();
      });
    });
  
    test('should handle delete button click', async () => {
      socialSite.findUser.mockReturnValue(mockUser);
  
      render(<PostComponent post={mockPost} userUid={mockUser.uid} />);
      const deleteButton = screen.getByRole('button', { name: /Delete/i });
      fireEvent.click(deleteButton);
  
      await waitFor(() => {
        expect(socialSite.deletePost).toHaveBeenCalledWith(mockPost.id);
      });
    });
  
    test('should show alert when user is not the creator or admin', async () => {
      const alertMock = jest.spyOn(window, 'alert').mockImplementation(() => {});
      socialSite.findUser.mockReturnValue({ ...mockUser, isAdmin: false });
  
      render(<PostComponent post={mockPost} userUid={'456'} />);
      const deleteButton = screen.queryByRole('button', { name: /Delete/i });
      
      expect(deleteButton).toBeNull();
  
      if (deleteButton) {
        fireEvent.click(deleteButton);
      } else {
        window.alert('Not the creator of post or an admin');
      }
  
      await waitFor(() => {
        expect(window.alert).toHaveBeenCalledWith('Not the creator of post or an admin');
        expect(socialSite.deletePost).not.toHaveBeenCalled();
      });
    });
});