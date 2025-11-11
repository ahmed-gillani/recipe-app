import { createContext, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

export const RecipeContext = createContext();

export default function App() {
  const [recipes] = useState([
    {
      id: 1,
      title: "Fluffy Pancakes",
      image: "https://via.placeholder.com/300x200?text=Pancakes",
      description: "Light and fluffy breakfast pancakes",
      rating: 4.7,
      category: "Breakfast",
      difficulty: "Easy",
      cookingTime: 15
    },
    {
      id: 2,
      title: "Chocolate Cake",
      image: "https://via.placeholder.com/300x200?text=Chocolate+Cake",
      description: "Rich and moist chocolate cake",
      rating: 4.8,
      category: "Desserts",
      difficulty: "Medium",
      cookingTime: 45
    }
  ]);
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <RecipeContext.Provider value={{ recipes, searchTerm, setSearchTerm }}>
      <Router>
        <nav style={{ 
          background: '#333', 
          color: 'white', 
          padding: '15px 20px', 
          display: 'flex', 
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <div style={{ fontWeight: 'bold', fontSize: '20px' }}>🍳 RecipeApp</div>
          <div>
            <a href="/" style={{ color: 'white', margin: '0 15px', textDecoration: 'none' }}>Home</a>
            <a href="/browse" style={{ color: 'white', margin: '0 15px', textDecoration: 'none' }}>Browse</a>
            <a href="/submit" style={{ color: 'white', margin: '0 15px', textDecoration: 'none' }}>Submit</a>
            <a href="/profile" style={{ color: 'white', margin: '0 15px', textDecoration: 'none' }}>Profile</a>
          </div>
        </nav>

        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
          <Routes>
            <Route path="/" element={<HomePage recipes={recipes} searchTerm={searchTerm} />} />
            <Route path="/browse" element={<BrowsePage recipes={recipes} searchTerm={searchTerm} />} />
            <Route path="/submit" element={<SubmitPage />} />
            <Route path="/profile" element={<ProfilePage />} />
          </Routes>
        </div>
      </Router>
    </RecipeContext.Provider>
  );
}

// Home Page
function HomePage({ recipes, searchTerm }) {
  return (
    <div>
      <input
        type="text"
        placeholder="Search recipes..."
        value={searchTerm}
        onChange={(e) => {/* Search logic */}}
        style={{ 
          width: '100%', 
          padding: '15px', 
          margin: '20px 0', 
          fontSize: '16px',
          border: '1px solid #ddd',
          borderRadius: '8px'
        }}
      />
      
      <div style={{ textAlign: 'center', padding: '50px', background: '#f8f9fa' }}>
        <h1 style={{ fontSize: '3em', margin: '0 0 20px', color: '#333' }}>
          Welcome to RecipeApp
        </h1>
        <p style={{ fontSize: '1.2em', color: '#666' }}>
          Discover amazing recipes from around the world
        </p>
        <div style={{ marginTop: '30px' }}>
          <a href="/browse" style={{ 
            padding: '15px 30px', 
            background: '#007bff', 
            color: 'white', 
            textDecoration: 'none', 
            borderRadius: '8px',
            fontSize: '18px',
            margin: '0 10px'
          }}>Browse Recipes</a>
          <a href="/submit" style={{ 
            padding: '15px 30px', 
            background: '#28a745', 
            color: 'white', 
            textDecoration: 'none', 
            borderRadius: '8px',
            fontSize: '18px',
            margin: '0 10px'
          }}>Submit Recipe</a>
        </div>
      </div>

      <div>
        <h2 style={{ margin: '40px 0 20px' }}>Featured Categories</h2>
        <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
          {['Breakfast', 'Desserts', 'Vegan'].map(cat => (
            <a key={cat} href="/browse" style={{
              padding: '12px 24px',
              background: '#007bff',
              color: 'white',
              borderRadius: '25px',
              textDecoration: 'none'
            }}>
              {cat}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

// Browse Page
function BrowsePage({ recipes, searchTerm }) {
  const filtered = recipes.filter(r => 
    r.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h1 style={{ marginBottom: '30px' }}>Browse Recipes</h1>
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', 
        gap: '20px',
        marginTop: '20px'
      }}>
        {filtered.map(recipe => (
          <div key={recipe.id} style={{
            border: '1px solid #ddd',
            borderRadius: '12px',
            overflow: 'hidden',
            background: 'white',
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
          }}>
            <img src={recipe.image} alt={recipe.title} style={{ width: '100%', height: '200px', objectFit: 'cover' }} />
            <div style={{ padding: '20px' }}>
              <h3 style={{ margin: '0 0 10px', fontSize: '1.4em' }}>{recipe.title}</h3>
              <p style={{ color: '#666', marginBottom: '10px' }}>{recipe.description}</p>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                <span>⭐ {recipe.rating}</span>
                <span>{recipe.category}</span>
              </div>
              <span style={{ color: '#28a745', fontWeight: 'bold' }}>{recipe.difficulty} • {recipe.cookingTime}min</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Submit Page
function SubmitPage() {
  return (
    <div style={{ maxWidth: '600px' }}>
      <h1 style={{ marginBottom: '30px' }}>Submit a Recipe</h1>
      <form style={{ background: 'white', padding: '30px', borderRadius: '12px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
        <input type="text" placeholder="Recipe Title" style={{ width: '100%', padding: '12px', marginBottom: '15px', border: '1px solid #ddd', borderRadius: '8px' }} />
        <textarea placeholder="Ingredients (one per line)" rows="4" style={{ width: '100%', padding: '12px', marginBottom: '15px', border: '1px solid #ddd', borderRadius: '8px' }} />
        <textarea placeholder="Instructions (one per line)" rows="6" style={{ width: '100%', padding: '12px', marginBottom: '15px', border: '1px solid #ddd', borderRadius: '8px' }} />
        <select style={{ width: '100%', padding: '12px', marginBottom: '15px', border: '1px solid #ddd', borderRadius: '8px' }}>
          <option>Category</option>
          <option>Breakfast</option>
          <option>Desserts</option>
          <option>Vegan</option>
        </select>
        <input type="number" placeholder="Cooking Time (minutes)" style={{ width: '100%', padding: '12px', marginBottom: '20px', border: '1px solid #ddd', borderRadius: '8px' }} />
        <button type="submit" style={{
          width: '100%',
          padding: '15px',
          background: '#28a745',
          color: 'white',
          border: 'none',
          borderRadius: '8px',
          fontSize: '18px',
          cursor: 'pointer'
        }}>
          Submit Recipe
        </button>
      </form>
    </div>
  );
}

// Profile Page
function ProfilePage() {
  return (
    <div>
      <h1>User Profile</h1>
      <p>Coming soon...</p>
    </div>
  );
}