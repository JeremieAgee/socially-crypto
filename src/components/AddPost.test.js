import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import AddPost from './AddPost';
import React from 'react';
import '@testing-library/jest-dom';
import { socialSite } from '../utils/userDisplay';

const mockOnClose = jest.fn();

jest.mock('../utils/userDisplay', () => ({
  socialSite: {
    findUser: jest.fn(),
    addPost: jest.fn(() => Promise.resolve('newPostId')),
    updatePost: jest.fn(),
  },
}));

const mockUser = {
  uid: '123',
  username: 'testuser',
};

describe('AddPost Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should render AddPost component', () => {
    render(<AddPost onClose={mockOnClose} userUid={mockUser.uid} />);
    expect(screen.getByText(/Post Something/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Title/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Content/i)).toBeInTheDocument();
  });

  test('should handle input change', () => {
    render(<AddPost onClose={mockOnClose} userUid={mockUser.uid} />);
    const titleInput = screen.getByLabelText(/Title/i);
    const contentInput = screen.getByLabelText(/Content/i);

    fireEvent.change(titleInput, { target: { value: 'Test Title' } });
    fireEvent.change(contentInput, { target: { value: 'Test Content' } });

    expect(titleInput.value).toBe('Test Title');
    expect(contentInput.value).toBe('Test Content');
  });

  test('should submit form correctly', async () => {
    socialSite.findUser.mockReturnValue(mockUser);
  
    render(<AddPost onClose={mockOnClose} userUid={mockUser.uid} />);
    const titleInput = screen.getByLabelText(/Title/i);
    const contentInput = screen.getByLabelText(/Content/i);
    const submitButton = screen.getByText(/Add Post/i);
  
    fireEvent.change(titleInput, { target: { value: 'Test Title' } });
    fireEvent.change(contentInput, { target: { value: 'Test Content' } });
  
    fireEvent.click(submitButton);
  
    // Wait for async function to finish
    await waitFor(() => {
      // Check if updatePost is called with id after addPost resolves
      expect(socialSite.updatePost).toHaveBeenCalledWith(expect.objectContaining({
        creatorUid: mockUser.uid,
        title: 'Test Title',
        content: 'Test Content',
        creatorUsername: mockUser.username,
        id: 'newPostId',
      }));
  
      expect(mockOnClose).toHaveBeenCalled();
    });
  });

  test('should display error when user is not authenticated', () => {
    socialSite.findUser.mockReturnValue(null);

    render(<AddPost onClose={mockOnClose} userUid={mockUser.uid} />);

    const submitButton = screen.getByText(/Add Post/i);

    fireEvent.click(submitButton);

    expect(socialSite.addPost).not.toHaveBeenCalled();
    expect(socialSite.updatePost).not.toHaveBeenCalled();
    expect(screen.queryByText(/newPostId/i)).toBeNull();
  });
});