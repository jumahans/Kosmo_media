import { useEffect, useMemo, useState } from 'react';

export default function Reporter() {
  const [articles, setArticlesState] = useState([]);
  const [filter, setFilter] = useState('');
  const [showDelete, setShowDelete] = useState(null);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [form, setForm] = useState({ id: null, title: '', category: '', imageUrl: '', content: '' });
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [flash, setFlash] = useState({ message: '', type: null });
  const [reporterName, setReporterName] = useState('Reporter');
  const [reporterEmail, setReporterEmail] = useState('');

  useEffect(() => {
    // Load from localStorage if available
    const savedArticles = JSON.parse(localStorage.getItem('articles') || '[]');
    setArticlesState(savedArticles);

    const name = localStorage.getItem('reporterName') || 'John Doe';
    setReporterName(name);

    const email = localStorage.getItem('reporterEmail') || '';
    setReporterEmail(email);

    // Initialize TinyMCE editor
    const initEditor = () => {
      if (window.tinymce && document.getElementById('article-content')) {
        window.tinymce.init({
          selector: '#article-content',
          plugins: 'link image lists table',
          toolbar:
            'undo redo | blocks | bold italic | alignleft aligncenter alignright | bullist numlist | link image',
          height: 300,
        });
      }
    };
    setTimeout(initEditor, 0);
  }, []);

  const filtered = useMemo(() => {
    const s = filter.toLowerCase();
    return articles.filter(a => a.title.toLowerCase().includes(s));
  }, [articles, filter]);

  function saveArticles(next) {
    setArticlesState(next);
    localStorage.setItem('articles', JSON.stringify(next));
  }

  function remove(id) {
    const next = articles.filter(a => a.id !== id);
    saveArticles(next);
  }

  function openCreate() {
    setForm({ id: null, title: '', category: '', imageUrl: '', content: '' });
    setActiveTab('new');
    setTimeout(() => {
      if (window.tinymce) {
        const ed = window.tinymce.get('article-content');
        if (ed) ed.setContent('');
      }
    }, 50);
  }

  function openEdit(a) {
    setForm({ id: a.id, title: a.title, category: a.category || 'General', imageUrl: a.imageUrl || '', content: a.content || '' });
    setActiveTab('new');
    setTimeout(() => {
      if (window.tinymce) {
        const ed = window.tinymce.get('article-content');
        if (ed) ed.setContent(a.content || '');
      }
    }, 50);
  }

  function saveForm(e) {
    e.preventDefault();
    if (!form.title) return;
    const editorContent = window.tinymce?.get('article-content')?.getContent() || form.content;
    if (form.id) {
      const next = articles.map(a =>
        a.id === form.id ? { ...a, title: form.title, category: form.category, imageUrl: form.imageUrl, content: editorContent } : a
      );
      saveArticles(next);
      setFlash({ message: 'Article updated successfully!', type: 'success' });
    } else {
      const newArticle = {
        id: Date.now(),
        title: form.title,
        reporterName,
        date: new Date().toISOString().slice(0, 10),
        status: 'pending',
        category: form.category,
        imageUrl: form.imageUrl || '/placeholder.jpg',
        content: editorContent,
      };
      const next = [newArticle, ...articles];
      saveArticles(next);
      setFlash({ message: 'Article published successfully!', type: 'success' });
    }
    setActiveTab('list');
    setTimeout(() => setFlash({ message: '', type: null }), 3000);
  }

  return (
    <div className="bg-[#F9FAFB] text-[#111827] min-h-screen">
      <header className="bg-[#111827] text-white p-4 flex justify-between items-center h-16">
        <div className="flex items-center">
          <button onClick={() => setSidebarOpen(s => !s)} className="md:hidden mr-4 text-white"><i className="fas fa-bars"></i></button>
          <div className="flex items-center">
            <i className="fas fa-newspaper text-[#F59E0B] text-2xl mr-2"></i>
            <h1 className="font-bold text-xl">KOSMO MEDIA</h1>
          </div>
        </div>
        <button className="bg-[#1E3A8A] hover:bg-blue-700 text-white py-2 px-4 rounded transition-all">Logout</button>
      </header>

      <div className="flex">
        <aside className={`${sidebarOpen ? 'block' : 'hidden'} md:block bg-[#111827] text-white w-64 p-4 fixed md:static top-16 left-0 z-40`}>
          <nav>
            <ul>
              <li className="mb-2"><button onClick={() => setActiveTab('dashboard')} className={`w-full text-left flex items-center p-3 rounded hover:bg-[#1E3A8A] hover:text-[#F59E0B] ${activeTab==='dashboard' ? 'bg-[#1E3A8A]' : ''}`}>Dashboard</button></li>
              <li className="mb-2"><button onClick={openCreate} className={`w-full text-left flex items-center p-3 rounded hover:bg-[#1E3A8A] hover:text-[#F59E0B] ${activeTab==='new' ? 'bg-[#1E3A8A]' : ''}`}>Post New Article</button></li>
              <li className="mb-2"><button onClick={() => setActiveTab('list')} className={`w-full text-left flex items-center p-3 rounded hover:bg-[#1E3A8A] hover:text-[#F59E0B] ${activeTab==='list' ? 'bg-[#1E3A8A]' : ''}`}>My Articles</button></li>
              <li className="mb-2"><button onClick={() => setActiveTab('profile')} className={`w-full text-left flex items-center p-3 rounded hover:bg-[#1E3A8A] hover:text-[#F59E0B] ${activeTab==='profile' ? 'bg-[#1E3A8A]' : ''}`}>Profile</button></li>
            </ul>
          </nav>
        </aside>

        <main className="flex-grow p-6">
          {flash.type && <div className={`mb-4 p-4 rounded text-white text-center ${flash.type==='success' ? 'bg-[#10B981]' : 'bg-[#EF4444]'}`}>{flash.message}</div>}

          {activeTab==='dashboard' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              <div className="bg-white p-6 rounded shadow border-l-4 border-[#1E3A8A]">
                <h3>Total Articles</h3>
                <p className="text-3xl font-bold">{articles.length}</p>
              </div>
              <div className="bg-white p-6 rounded shadow border-l-4 border-[#F59E0B]">
                <h3>Most Popular</h3>
                <p>{articles[0]?.title || 'No articles yet'}</p>
              </div>
              <div className="bg-white p-6 rounded shadow border-l-4 border-[#10B981]">
                <h3>Recent Activity</h3>
                <p>{articles.length ? new Date(articles[0].date).toLocaleDateString() : 'No recent activity'}</p>
              </div>
            </div>
          )}

          {activeTab==='list' && (
            <div>
              <div className="flex gap-2 items-center mb-4">
                <input value={filter} onChange={e=>setFilter(e.target.value)} placeholder="Search..." className="p-2 border rounded" />
                <button onClick={openCreate} className="bg-[#1E3A8A] text-white py-2 px-4 rounded">Create New</button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filtered.length===0 ? <div>No articles</div> : filtered.map(a=>(
                  <div key={a.id} className="bg-white rounded shadow overflow-hidden">
                    <img src={`https://picsum.photos/seed/${a.id}/400/200`} className="w-full h-40 object-cover"/>
                    <div className="p-4">
                      <h4 className="font-bold">{a.title}</h4>
                      <p>{a.reporterName} - {a.date}</p>
                      <div className="flex gap-2 mt-2">
                        <button onClick={()=>openEdit(a)} className="bg-[#F59E0B] text-white px-3 py-1 rounded">Edit</button>
                        <button onClick={()=>setShowDelete(a.id)} className="bg-[#EF4444] text-white px-3 py-1 rounded">Delete</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab==='new' && (
            <div className="bg-white p-6 rounded shadow max-w-3xl">
              <h3>{form.id ? 'Edit Article' : 'Post New Article'}</h3>
              <form onSubmit={saveForm} className="space-y-4">
                <input value={form.title} onChange={e=>setForm(f=>({...f,title:e.target.value}))} placeholder="Title" className="w-full p-2 border rounded" required/>
                <input value={form.category} onChange={e=>setForm(f=>({...f,category:e.target.value}))} placeholder="Category" className="w-full p-2 border rounded"/>
                <input value={form.imageUrl} onChange={e=>setForm(f=>({...f,imageUrl:e.target.value}))} placeholder="Image URL" className="w-full p-2 border rounded"/>
                <textarea id="article-content" rows={6} placeholder="Content" className="w-full p-2 border rounded"></textarea>
                <div className="flex justify-end gap-2">
                  <button type="button" onClick={()=>setActiveTab('list')} className="bg-gray-300 px-4 py-2 rounded">Cancel</button>
                  <button type="submit" className="bg-[#1E3A8A] text-white px-4 py-2 rounded">{form.id?'Save':'Publish'}</button>
                </div>
              </form>
            </div>
          )}

          {activeTab==='profile' && (
            <div className="bg-white p-6 rounded shadow max-w-xl">
              <h3>Profile</h3>
              <input value={reporterName} onChange={e=>setReporterName(e.target.value)} placeholder="Name" className="w-full p-2 border rounded mb-2"/>
              <input value={reporterEmail} onChange={e=>setReporterEmail(e.target.value)} placeholder="Email" className="w-full p-2 border rounded mb-2"/>
              <button onClick={()=>{
                localStorage.setItem('reporterName', reporterName);
                localStorage.setItem('reporterEmail', reporterEmail);
                setFlash({message:'Profile saved',type:'success'});
                setTimeout(()=>setFlash({message:'',type:null}),3000);
              }} className="bg-[#1E3A8A] text-white px-4 py-2 rounded">Save</button>
            </div>
          )}

        </main>
      </div>

      {showDelete && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow max-w-md w-full">
            <h3>Confirm Delete</h3>
            <p>Are you sure?</p>
            <div className="flex justify-end gap-2 mt-4">
              <button onClick={()=>setShowDelete(null)} className="bg-gray-300 px-4 py-2 rounded">Cancel</button>
              <button onClick={()=>{remove(showDelete); setShowDelete(null)}} className="bg-[#EF4444] text-white px-4 py-2 rounded">Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
