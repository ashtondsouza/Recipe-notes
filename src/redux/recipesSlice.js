import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  recipes: [],
  status: 'idle',
  error: null,
};

export const fetchRecipes = createAsyncThunk('recipes/fetchRecipes', async () => {
  const response = await fetch('./recipe.json');
  if (!response.ok) {
    throw new Error('Failed to fetch recipes');
  }
  const data = await response.json();
  return data;
});

const recipesSlice = createSlice({
  name: 'recipes',
  initialState,
  reducers: {
    addRecipe: (state, action) => {
      state.recipes.push(action.payload);
    },
    editRecipe: (state, action) => {
      const { id, title, preparationTime, servings, ingredients } = action.payload;
      const recipe = state.recipes.find((recipe) => recipe.id === id);
      if (recipe) {
        recipe.title = title;
        recipe.preparationTime = preparationTime;
        recipe.servings = servings;
        recipe.ingredients = ingredients;
      }
    },
    deleteRecipe: (state, action) => {
      state.recipes = state.recipes.filter((recipe) => recipe.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRecipes.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchRecipes.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.recipes = action.payload;
      })
      .addCase(fetchRecipes.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { addRecipe, editRecipe, deleteRecipe } = recipesSlice.actions;

export default recipesSlice.reducer;
