import { render, screen, fireEvent } from '@testing-library/react';
import { HeroImage } from "../components/herocontent";
import React from "react";
import { useAppContext } from '../context/appcontext';
import { beforeEach } from 'node:test';

beforeEach(() => {
  jest.mock('../context/appcontext', () => ({
    useAppContext: jest.fn()
  }));
})

describe('HeroImage', () => {
  test('renders correctly', () => {
    useAppContext.mockReturnValue({
      domains: [],
      setDomains: jest.fn()
    });

    render(<HeroImage />);
    
    // Check if the hero image is displayed
    const heroImage = screen.getByAltText('Hero Image');
    expect(heroImage).toBeInTheDocument();
    
    // Check if the search input is displayed
    const searchInput = screen.getByPlaceholderText('Search');
    expect(searchInput).toBeInTheDocument();
  });

  test('handles input change correctly', () => {
    useAppContext.mockReturnValue({
      domains: [],
      setDomains: jest.fn()
    });

    render(<HeroImage />);

    // Get the search input
    const searchInput = screen.getByPlaceholderText('Search');
    
    // Simulate typing in the search input
    fireEvent.change(searchInput, { target: { value: 'example.com' } });

    // Check if the input value is updated
    expect(searchInput.value).toBe('example.com');
  });

  test('handles key press event correctly', () => {
    useAppContext.mockReturnValue({
      domains: [],
      setDomains: jest.fn()
    });

    render(<HeroImage />);

    // Get the search input
    const searchInput = screen.getByPlaceholderText('Search');

    // Simulate pressing the Enter key
    fireEvent.keyDown(searchInput, { key: 'Enter' });

    // Check if the addDomain function is called
    expect(useAppContext().setDomains).toHaveBeenCalled();
  });

  test('displays error message correctly', () => {
    useAppContext.mockReturnValue({
      domains: [],
      setDomains: jest.fn()
    });

    render(<HeroImage />);

    // Get the search input
    const searchInput = screen.getByPlaceholderText('Search');

    // Simulate typing an invalid input
    fireEvent.change(searchInput, { target: { value: '' } });

    // Simulate pressing the Enter key
    fireEvent.keyDown(searchInput, { key: 'Enter' });

    // Check if the error message is displayed
    const errorMessage = screen.getByText('Please enter a valid domain name');
    expect(errorMessage).toBeInTheDocument();
  });

  test('handles button click correctly', () => {
    useAppContext.mockReturnValue({
      domains: [],
      setDomains: jest.fn()
    });

    render(<HeroImage />);

    // Get the add button
    const addButton = screen.getByText('Add');

    // Simulate clicking the add button
    fireEvent.click(addButton);

    // Check if the addDomain function is called
    expect(useAppContext().setDomains).toHaveBeenCalled();
  });
});