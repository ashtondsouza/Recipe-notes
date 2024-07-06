"use client"
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { editRecipe, deleteRecipe } from '../redux/recipesSlice';
import '../styles/recipelist.scss'

const RecipeList = () => {
  const recipes = useSelector((state) => state.recipes.recipes);
  const dispatch = useDispatch();
  const [editId, setEditId] = useState(null);
  const [editTitle, setEditTitle] = useState('');
  const [editPreparationTime, setEditPreparationTime] = useState('');
  const [editServings, setEditServings] = useState('');
  const [editIngredients, setEditIngredients] = useState('');

  const handleEdit = (recipe) => {
    setEditId(recipe.id);
    setEditTitle(recipe.title);
    setEditPreparationTime(recipe.preparationTime);
    setEditServings(recipe.servings);
    setEditIngredients(recipe.ingredients.join(', '));
  };

  const handleSave = (id) => {
    dispatch(editRecipe({
      id,
      title: editTitle,
      preparationTime: parseInt(editPreparationTime),
      servings: parseInt(editServings),
      ingredients: editIngredients.split(',')
    }));
    setEditId(null);
    setEditTitle('');
    setEditPreparationTime('');
    setEditServings('');
    setEditIngredients('');
  };

  return (
    <ul className='newcard-container'>
      {recipes.map((recipe) => (
        <li className='rec-newcard' key={recipe.id}>
          {editId === recipe.id ? (
            <>
              <input
                type="text"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
              />
              <input
                type="number"
                value={editPreparationTime}
                onChange={(e) => setEditPreparationTime(e.target.value)}
              />
              <input
                type="number"
                value={editServings}
                onChange={(e) => setEditServings(e.target.value)}
              />
              <input
                type="text"
                value={editIngredients}
                onChange={(e) => setEditIngredients(e.target.value)}
              />
             <div className='btns'> <button className='btn btn-save' onClick={() => handleSave(recipe.id)}>Save</button>
             <button className='btn btn-del' onClick={() => dispatch(deleteRecipe(recipe.id))}>Delete</button>
   </div>
            </>
          ) : (
            <>
              <h2>{recipe.title}</h2>
              <p>Preparation Time: {recipe.preparationTime} minutes</p>
              <p>Servings: {recipe.servings}</p>
              <p>Ingredients: {recipe.ingredients.join(', ')}</p>
              <div className='btns'><button className='btn btn-save' onClick={() => handleEdit(recipe)}>Edit</button>
              <button className='btn btn-del'  onClick={() => dispatch(deleteRecipe(recipe.id))}>Delete</button>
    </div>
            </>
          )}
        </li>
      ))}
    </ul>
  );
};

export default RecipeList;
