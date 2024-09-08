"use client";  // Isso indica que o componente é um Client Component

import React, { useState } from 'react';
import Link from 'next/link';

const Header: React.FC = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);

  return (
    <header className="flex flex-wrap md:justify-start md:flex-nowrap z-50 w-full py-7 bg-[#043a81]">
      <nav className="relative max-w-7xl w-full flex flex-wrap md:grid md:grid-cols-12 basis-full items-center px-4 md:px-6 md:px-8 mx-auto">
        <div className="md:col-span-3">
          {/* Logo */}
          <Link href="/" passHref>
            <span className="flex-none rounded-xl text-xl inline-block font-semibold focus:outline-none focus:opacity-80" aria-label="Preline">
                OLIBERAL
              <svg className="w-28 h-auto" width="116" height="32" viewBox="0 0 116 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Substitua o conteúdo do logo pelo seu ou personalize */}
                <path d="..." className="fill-black" fill="currentColor"/>
                <path d="..." className="stroke-black" stroke="currentColor" strokeWidth="2"/>
                <path d="..." className="stroke-black" stroke="currentColor" strokeWidth="2"/>
                <circle cx="13" cy="16.5214" r="5" className="fill-black" fill="currentColor"/>
              </svg>
            </span>
          </Link>
          {/* End Logo */}
        </div>

        {/* Button Group */}
        <div className="flex items-center gap-x-1 md:gap-x-2 ms-auto py-1 md:ps-6 md:order-3 md:col-span-3">
          <button
            type="button"
            className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-xl bg-white border border-gray-200 text-black hover:bg-gray-100 focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none"
          >
            Sign in
          </button>
          <button
            type="button"
            className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-xl border border-transparent bg-lime-400 text-black hover:bg-lime-500 focus:outline-none focus:bg-lime-500 transition disabled:opacity-50 disabled:pointer-events-none"
          >
            Hire us
          </button>

          <div className="md:hidden">
            <button
              type="button"
              className="hs-collapse-toggle size-[38px] flex justify-center items-center text-sm font-semibold rounded-xl border border-gray-200 text-black hover:bg-gray-100 focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none"
              onClick={() => setIsNavOpen(!isNavOpen)}
              aria-expanded={isNavOpen}
              aria-controls="hs-navbar-hcail"
              aria-label="Toggle navigation"
            >
              {isNavOpen ? (
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 6L6 18"/>
                  <path d="M6 6l12 12"/>
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="3" x2="21" y1="6" y2="6"/>
                  <line x1="3" x2="21" y1="12" y2="12"/>
                  <line x1="3" x2="21" y1="18" y2="18"/>
                </svg>
              )}
            </button>
          </div>
        </div>
        {/* End Button Group */}

        {/* Collapse */}
        <div
          id="hs-navbar-hcail"
          className={`${isNavOpen ? 'block' : 'hidden'} hs-collapse overflow-hidden transition-all duration-300 basis-full grow md:block md:w-auto md:basis-auto md:order-2 md:col-span-6`}
        >
          <div className="flex flex-col gap-y-4 gap-x-0 mt-5 md:flex-row md:justify-center md:items-center md:gap-y-0 md:gap-x-7 md:mt-0">
            <div>
              <Link href="/" passHref>
                <span className="relative inline-block text-black focus:outline-none before:absolute before:bottom-0.5 before:start-0 before:-z-[1] before:w-full before:h-1 before:bg-lime-400">
                  Work
                </span>
              </Link>
            </div>
            <div>
              <Link href="/services">
                <span className="inline-block text-black hover:text-gray-600 focus:outline-none focus:text-gray-600">Services</span>
              </Link>
            </div>
            <div>
              <Link href="/about">
                <span className="inline-block text-black hover:text-gray-600 focus:outline-none focus:text-gray-600">About</span>
              </Link>
            </div>
            <div>
              <Link href="/careers">
                <span className="inline-block text-black hover:text-gray-600 focus:outline-none focus:text-gray-600">Careers</span>
              </Link>
            </div>
            <div>
              <Link href="/blog">
                <span className="inline-block text-black hover:text-gray-600 focus:outline-none focus:text-gray-600">Blog</span>
              </Link>
            </div>
          </div>
        </div>
        {/* End Collapse */}
      </nav>
    </header>
  );
};

export default Header;
