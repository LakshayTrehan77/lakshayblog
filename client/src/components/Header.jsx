import React, { useRef } from 'react'
import { assets } from '../assets/assets'
import { useAppContext } from '../context/AppContext'

const Header = () => {

  const {setInput, input} = useAppContext()
  const inputRef = useRef()

  const onSubmitHandler = async (e)=>{
     e.preventDefault();
     setInput(inputRef.current.value)
  }

  const onClear = ()=>{
    setInput('')
    inputRef.current.value = ''
  }

  return (
    <div className="mx-8 sm:mx-16 xl:mx-24 relative">
      <div className="text-center mt-10 mb-8">
        <div className="inline-flex items-center justify-center gap-4 px-8 py-3 mb-4 border border-primary/40 bg-primary/10 rounded-full text-base font-semibold text-primary transition-transform duration-300 hover:scale-105 hover:shadow-md">
          <p>🔥 Now with Powerful AI Integration!</p>
          <img src={assets.star_icon} className="w-4" alt="star icon" />
        </div>

        <h1 className="text-4xl sm:text-7xl font-extrabold sm:leading-[5rem] text-center text-gray-800 animate-pulse mt-10">
          Welcome to{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-pink-500 to-red-500">
            LAKSHAYBLOG
          </span>{" "}
          <br></br>
          Your Ultimate <span className="text-primary">Blogging Space</span>
        </h1>

        <p className="my-8 sm:my-10 max-w-3xl mx-auto text-center text-base sm:text-lg text-gray-600 font-medium">
          Share your voice with the world — from thoughts to tutorials, this is
          where your digital journey begins. Start writing, expressing, and
          inspiring on <strong>LAKSHAYBLOG</strong>.
        </p>

        <form
          onSubmit={onSubmitHandler}
          className="flex justify-between max-w-xl max-sm:scale-90 mx-auto border border-gray-300 bg-white rounded-xl overflow-hidden shadow-md transition-transform duration-300"
        >
          <input
            ref={inputRef}
            type="text"
            placeholder="Search for blogs"
            required
            className="w-full pl-5 py-3 text-base font-medium outline-none text-gray-700 placeholder-gray-400"
          />
          <button
            type="submit"
            className="bg-primary text-white px-10 py-3 m-1 rounded-lg font-semibold hover:scale-105 transition-transform duration-300"
          >
            Search
          </button>
        </form>
      </div>

      <div className="text-center">
        {input && (
          <button
            onClick={onClear}
            className="border font-light text-xs py-1 px-3 rounded-sm shadow-custom-sm cursor-pointer"
          >
            Clear Search
          </button>
        )}
      </div>

      <img
        src={assets.gradientBackground}
        alt=""
        className="absolute -top-50 -z-1 opacity-50"
      />
    </div>
  );
}

export default Header
