import Canvas from './canvas';
import Customizer from './pages/Customizer';
import Home from './pages/Home';
import './index.css'

function CustomShirtEditor() {
  return (
    <main className="app transition-all ease-in">
      <Home />
      <Canvas />
      <Customizer />
    </main>
  )
}

export default CustomShirtEditor
