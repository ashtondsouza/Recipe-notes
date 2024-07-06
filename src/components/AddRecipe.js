"use client"
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addRecipe } from '../redux/recipesSlice';
import '../styles/addrecipes.scss'

const AddRecipe = () => {
  const [title, setTitle] = useState('');
  const [preparationTime, setPreparationTime] = useState('');
  const [servings, setServings] = useState('');
  const [ingredients, setIngredients] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addRecipe({
      id: Date.now(),
      title,
      preparationTime: parseInt(preparationTime),
      servings: parseInt(servings),
      ingredients: ingredients.split(',')
    }));
    setTitle('');
    setPreparationTime('');
    setServings('');
    setIngredients('');
  };

  return (
    <form className='add-rec' onSubmit={handleSubmit}>
    
    <input
    className='rec-name'
    type="text"
    placeholder="Recipe Title"
    value={title}
    onChange={(e) => setTitle(e.target.value)}
  />
  
      <div className='rec-mid'>
      <input
        type="text"
        placeholder="Preparation Time"
        value={preparationTime}
        onChange={(e) => setPreparationTime(e.target.value)}
      />
      <input
        type="number"
        placeholder="Servings"
        value={servings}
        onChange={(e) => setServings(e.target.value)}
      /></div>

      <input
      className='rec-des'
  type="text"
  placeholder="Ingredients (comma separated)"
  value={ingredients}
  onChange={(e) => setIngredients(e.target.value)}
/>
    
      <button type="submit">Add Recipe</button>
    </form>
  );
};

export default AddRecipe;
