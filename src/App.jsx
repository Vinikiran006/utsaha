import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Events from './pages/Events'
import EventDetail from './pages/EventDetail'
import ScrollToTop from './components/ScrollToTop'
import Alumni from './components/Alumini'


function App() {
    return (
        <BrowserRouter>
            <ScrollToTop />
            <div className="app-wrapper">
                <Navbar />
                <main>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/events" element={<Events />} />
                        <Route path="/events/:id" element={<EventDetail />} />
                        <Route path="/alumni" element={<Alumni />} />
                    </Routes>
                </main>
                <Footer />
            </div>
        </BrowserRouter>
    )
}

export default App
