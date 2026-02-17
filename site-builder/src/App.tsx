import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Editor } from '@/pages/Editor';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Editor />} />
        {/* Placeholder for other routes */}
        <Route path="/dashboard" element={<div>Dashboard</div>} />
        <Route path="/templates" element={<div>Templates</div>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;
