import React, { useEffect, useRef, useState } from 'react';
import { assets, blogCategories } from '../../assets/assets';
import Quill from 'quill';
import { useAppContext } from '../../context/AppContext';
import toast from 'react-hot-toast';
import { parse } from 'marked';
import { motion } from 'framer-motion';

const AddBlog = () => {
  const { axios } = useAppContext();
  const [isAdding, setIsAdding] = useState(false);
  const [loading, setLoading] = useState(false);

  const editorRef = useRef(null);
  const quillRef = useRef(null);

  const [image, setImage] = useState(false);
  const [title, setTitle] = useState('');
  const [subTitle, setSubTitle] = useState('');
  const [category, setCategory] = useState('Startup');
  const [isPublished, setIsPublished] = useState(false);

  const generateContent = async () => {
    if (!title) return toast.error('Please enter a title');
    try {
      setLoading(true);
      const { data } = await axios.post('/api/blog/generate', { prompt: title });
      if (data.success) {
        quillRef.current.root.innerHTML = parse(data.content);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      setIsAdding(true);
      const blog = {
        title,
        subTitle,
        description: quillRef.current.root.innerHTML,
        category,
        isPublished,
      };
      const formData = new FormData();
      formData.append('blog', JSON.stringify(blog));
      formData.append('image', image);
      const { data } = await axios.post('/api/blog/add', formData);
      if (data.success) {
        toast.success(data.message);
        setImage(false);
        setTitle('');
        setSubTitle('');
        quillRef.current.root.innerHTML = '';
        setCategory('Startup');
        setIsPublished(false);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsAdding(false);
    }
  };

  useEffect(() => {
    if (!quillRef.current && editorRef.current) {
      quillRef.current = new Quill(editorRef.current, { theme: 'snow' });
    }
  }, []);

  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex-1 bg-gradient-to-br from-blue-50 to-white text-gray-700 min-h-screen overflow-y-auto py-10 px-4"
    >
      <motion.h1
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1, duration: 0.6 }}
        className="text-center text-4xl sm:text-5xl font-extrabold text-primary mb-12 drop-shadow-sm"
      >
        ✍️ Create a New Blog on <span className="text-purple-700">LakshayBlog</span>
      </motion.h1>

      <div className="bg-white w-full max-w-4xl p-8 sm:p-12 mx-auto shadow-2xl rounded-3xl space-y-8 transition-all duration-300">

        {/* Upload */}
        <div>
          <label className="block text-lg font-semibold mb-2">Thumbnail</label>
          <label htmlFor="image" className="cursor-pointer block">
            <img
              src={!image ? assets.upload_area : URL.createObjectURL(image)}
              alt="Upload"
              className="w-full max-w-md h-52 object-cover border-2 border-dashed border-primary/40 rounded-xl hover:scale-105 transition-all"
            />
            <input type="file" id="image" hidden required onChange={(e) => setImage(e.target.files[0])} />
          </label>
        </div>

        {/* Title */}
        <div>
          <label className="block text-lg font-semibold mb-2">Blog Title</label>
          <input
            type="text"
            required
            placeholder="Inspire your readers..."
            className="w-full border border-gray-300 p-4 rounded-lg text-base outline-primary"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        {/* Subtitle */}
        <div>
          <label className="block text-lg font-semibold mb-2">Subtitle</label>
          <input
            type="text"
            required
            placeholder="Something catchy & short"
            className="w-full border border-gray-300 p-4 rounded-lg text-base outline-primary"
            value={subTitle}
            onChange={(e) => setSubTitle(e.target.value)}
          />
        </div>

        {/* Editor */}
        <div className="relative">
          <label className="block text-lg font-semibold mb-2">Blog Content</label>
          <div className="border border-gray-300 rounded-lg overflow-hidden p-2 min-h-[150px] bg-white">
            <div ref={editorRef}></div>
          </div>
          {loading && (
            <div className="absolute inset-0 bg-white/60 z-10 flex items-center justify-center rounded">
              <div className="w-8 h-8 border-4 border-primary border-t-transparent animate-spin rounded-full"></div>
            </div>
          )}
          <button
            type="button"
            onClick={generateContent}
            disabled={loading}
            className="mt-4 inline-block bg-black text-white px-6 py-2 text-sm rounded-full hover:bg-gray-900 transition-all shadow-md"
          >
            🔮 Generate With AI
          </button>
        </div>

        {/* Category */}
        <div>
          <label className="block text-lg font-semibold mb-2">Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg text-base"
          >
            {blogCategories.map((item, index) => (
              <option key={index} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>

        {/* Publish Toggle */}
        <div className="flex items-center gap-4">
          <input
            type="checkbox"
            checked={isPublished}
            onChange={(e) => setIsPublished(e.target.checked)}
            className="scale-125 accent-primary"
          />
          <span className="text-base font-medium">Publish Immediately</span>
        </div>

        {/* Submit Button */}
        <div className="pt-6 text-center">
          <button
            type="submit"
            disabled={isAdding}
            className="px-10 py-3 bg-primary text-white font-semibold text-base rounded-full hover:scale-105 hover:bg-purple-700 transition-all duration-300 shadow-md"
          >
            {isAdding ? 'Adding...' : '🚀 Publish Blog'}
          </button>
        </div>
      </div>
    </form>
  );
};

export default AddBlog;
