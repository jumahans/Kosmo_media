import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

export default function News() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')

  useEffect(() => {
    if (!localStorage.getItem('reporters')) localStorage.setItem('reporters', JSON.stringify([]))
    if (!localStorage.getItem('admins'))
      localStorage.setItem(
        'admins',
        JSON.stringify([{ id: 1, username: 'admin', password: 'admin123', name: 'Admin User' }])
      )
    if (!localStorage.getItem('articles')) localStorage.setItem('articles', JSON.stringify([]))
    if (!localStorage.getItem('newsletter_subscribers'))
      localStorage.setItem('newsletter_subscribers', JSON.stringify([]))
  }, [])

  function subscribe(e) {
    e.preventDefault()
    if (!email) {
      setMessage('Please enter your email address')
      return
    }
    const subscribers = JSON.parse(localStorage.getItem('newsletter_subscribers') || '[]')
    subscribers.push(email)
    localStorage.setItem('newsletter_subscribers', JSON.stringify(subscribers))
    setMessage('Thank you for subscribing to our newsletter!')
    setEmail('')
    setTimeout(() => setMessage(''), 5000)
  }

  return (
    <div>
      {/* Navbar */}
      <nav className="sticky top-0 bg-white shadow-md z-50">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <Link to="/news" className="text-3xl font-bold text-[#FF6600]">
            <span className="text-black">KOSMO </span> MEDIA
          </Link>

          <div className="hidden md:flex items-center space-x-6">
            <div className="relative">
              <input
                type="text"
                placeholder="Search news..."
                className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#FF6600] focus:border-transparent"
              />
              <div className="absolute left-3 top-2.5 text-gray-400">
                <i className="fas fa-search"></i>
              </div>
            </div>
            <Link to="/login" className="px-4 py-2 text-[#FF6600] font-medium">Reporter Login</Link>
            <Link to="/admin" className="px-4 py-2 bg-[#FF6600] text-white rounded-md">Admin Login</Link>
          </div>

          <button onClick={() => setMobileOpen((v) => !v)} className="md:hidden text-black text-2xl">
            <i className="fas fa-bars"></i>
          </button>
        </div>

        {mobileOpen && (
          <div className="md:hidden px-4 pb-4">
            <div className="flex flex-col space-y-3 mt-2">
              <input
                type="text"
                placeholder="Search news..."
                className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#FF6600] focus:border-transparent"
              />
              <Link to="/login" className="px-4 py-2 text-[#FF6600] font-medium border border-[#FF6600] rounded-md text-center">
                Reporter Login
              </Link>
              <Link to="/admin" className="px-4 py-2 bg-[#FF6600] text-white rounded-md text-center">
                Admin Login
              </Link>
            </div>
          </div>
        )}
      </nav>

      {/* Featured Banner */}
      <section
        className="featured-banner mb-8 bg-cover bg-center h-96 flex items-end"
        style={{ backgroundImage: `url('https://picsum.photos/id/1011/1200/600')` }}
      >
        <div className="container mx-auto px-4 pb-12 w-full md:w-2/3">
          <span className="bg-[#FF6600] text-white px-3 py-1 rounded-md text-sm font-medium mb-2 inline-block">
            Breaking News
          </span>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3">
            Technological Innovations Reshape Global Communications
          </h1>
          <p className="text-gray-200 mb-4 text-lg">
            Revolutionary breakthroughs in quantum networking promise to transform how we connect across continents.
          </p>
          <Link to="/news" className="inline-block px-6 py-3 bg-[#FF6600] text-white rounded-md font-medium">
            Read Full Story
          </Link>
        </div>
      </section>

      {/* Latest Updates */}
      <div className="container mx-auto px-4 pb-16">
        <div className="mb-8 overflow-x-auto">
          <div className="flex space-x-4 pb-2">
            {['All News', 'Politics', 'Sports', 'Technology', 'Business', 'Entertainment', 'Africa', 'World', 'Lifestyle'].map((cat) => (
              <a key={cat} href="#" className={`px-4 py-2 ${cat === 'All News' ? 'bg-[#FF6600] text-white' : 'bg-gray-100 hover:bg-gray-200'} rounded-md whitespace-nowrap`}>
                {cat}
              </a>
            ))}
          </div>
        </div>

        <h2 className="text-2xl md:text-3xl font-bold mb-6">Latest Updates</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1012, 1013, 1015, 1016, 1018, 1020].map((id, idx) => (
            <div key={idx} className="card bg-white rounded-lg overflow-hidden shadow-md">
              <div className="h-48 overflow-hidden">
                <img src={`https://picsum.photos/id/${id}/600/400`} alt="News" className="w-full h-full object-cover" />
              </div>
              <div className="p-4">
                <span className="inline-block px-2 py-1 bg-[#A8D5BA] text-black text-xs font-semibold rounded mb-2">Business</span>
                <h3 className="font-bold text-xl mb-2">Global Markets Respond to New Economic Policies</h3>
                <p className="text-gray-700 mb-3">
                  Financial experts weigh in on the implications of recent economic reforms and their impact on international markets.
                </p>
                <Link to="/news" className="text-[#FF6600] font-medium flex items-center">
                  Read More
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                  </svg>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Newsletter + Editor's Pick */}
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-8 mb-12">
          <div className="lg:w-2/3"></div>
          <div className="lg:w-1/3">
            <div className="bg-[#A8D5BA] bg-opacity-20 rounded-lg p-6 mb-8">
              <h3 className="text-xl font-bold mb-3">Subscribe to Our Newsletter</h3>
              <p className="text-gray-700 mb-4">Get the latest news and updates delivered straight to your inbox.</p>
              <form onSubmit={subscribe}>
                <div className="mb-3">
                  <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                    placeholder="Your email address"
                    className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#FF6600] focus:border-transparent"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-[#FF6600] text-white py-2 rounded-md hover:bg-orange-700 transition-colors duration-300"
                >
                  Subscribe
                </button>
              </form>
              {message && <p className="mt-2 text-sm text-green-600">{message}</p>}
            </div>

            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
              <h3 className="text-xl font-bold mb-3">Editor's Pick</h3>
              <div className="mb-4">
                <img src="https://picsum.photos/id/1025/600/400" alt="Opinion" className="w-full h-40 object-cover rounded-md" />
              </div>
              <h4 className="font-bold text-lg mb-2">The Future of Work in a Digital Economy</h4>
              <p className="text-gray-700 mb-3">
                How remote work and AI technologies are reshaping the global workforce and creating new opportunities.
              </p>
              <Link to="/news" className="text-[#FF6600] font-medium">Continue Reading →</Link>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-black text-white pt-12 pb-6">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="text-2xl font-bold mb-4">KOSMO MEDIA</h3>
              <p className="text-gray-300 mb-4">
                Delivering the most important stories from around the globe, with accuracy, fairness and insight.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-300 hover:text-white"><i className="fab fa-facebook-f"></i></a>
                <a href="#" className="text-gray-300 hover:text-white"><i className="fab fa-twitter"></i></a>
                <a href="#" className="text-gray-300 hover:text-white"><i className="fab fa-instagram"></i></a>
                <a href="#" className="text-gray-300 hover:text-white"><i className="fab fa-linkedin-in"></i></a>
              </div>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                {['Politics','Business','Technology','Entertainment','Sports'].map((link) => (
                  <li key={link}><a href="#" className="text-gray-300 hover:text-white">{link}</a></li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Company</h3>
              <ul className="space-y-2">
                {['About Us','Contact','Careers','Privacy Policy','Terms of Service'].map((link) => (
                  <li key={link}><a href="#" className="text-gray-300 hover:text-white">{link}</a></li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Contact Us</h3>
              <ul className="space-y-2">
                <li className="flex items-start"><i className="fas fa-map-marker-alt mt-1 mr-3 text-[#FF6600]"></i><span>123 News Street, Nairobi, Kenya</span></li>
                <li className="flex items-start"><i className="fas fa-phone-alt mt-1 mr-3 text-[#FF6600]"></i><span>+254 123 456 789</span></li>
                <li className="flex items-start"><i className="fas fa-envelope mt-1 mr-3 text-[#FF6600]"></i><span>info@Newsnews.com</span></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 pt-6 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">© 2025 KOSMO MEDIA. All rights reserved.</p>
            <div className="flex space-x-4 mt-4 md:mt-0">
              {['Privacy Policy','Terms of Service','Cookie Policy'].map((link) => (
                <a key={link} href="#" className="text-gray-400 text-sm hover:text-white">{link}</a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
