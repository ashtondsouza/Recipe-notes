"use client"
import '../styles/main.scss'
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import AddRecipe from '../components/AddRecipe';
import RecipeList from '../components/RecipeList';
import { fetchRecipes } from '../redux/recipesSlice';

export default function Home() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchRecipes());
  }, [dispatch]);

  return (
    <div className='main'>
      <h1 className='title'>Recipe Note</h1>
      <AddRecipe />
      <RecipeList />
    </div>
  );
}
