import React from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';

const Home = () => {
  const { isDark } = useTheme();

  return (
    <div className={`min-h-screen ${isDark ? 'bg-gradient-to-br from-slate-950 via-luxe-950 to-slate-900' : 'bg-gradient-to-br from-white via-gray-50 to-gray-100'}`}>
      {/* HERO SECTION */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        {/* Background accent */}
        <div className={`absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l ${isDark ? 'from-gold-500/10 to-transparent' : 'from-gold-200/30 to-transparent'}`}></div>
        <div className={`absolute bottom-0 left-0 w-1/2 h-1/2 bg-gradient-to-t ${isDark ? 'from-rose-500/10 to-transparent' : 'from-rose-200/30 to-transparent'}`}></div>

        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          {/* Top accent */}
          <div className="flex justify-center mb-8">
            <div className={`w-12 h-px bg-gradient-to-r ${isDark ? 'from-transparent via-gold-400 to-transparent' : 'from-transparent via-gold-500 to-transparent'}`}></div>
          </div>

          <h1 className={`text-5xl md:text-7xl font-serif mb-6 leading-tight animate-fade-in ${isDark ? 'text-white' : 'text-gray-950'}`}>
            Radiant
            <span className={`block text-3xl md:text-5xl mt-4 bg-gradient-to-r ${isDark ? 'from-gold-300 via-rose-300 to-gold-300' : 'from-gold-600 via-rose-600 to-gold-600'} bg-clip-text text-transparent`}>
              Luxe & Éclat
            </span>
          </h1>

          <p className={`text-lg md:text-xl mb-8 max-w-2xl mx-auto leading-relaxed italic font-light animate-slide-up ${isDark ? 'text-gray-200' : 'text-gray-700'}`}>
            Découvrez notre collection de soins premium conçue pour sublimer votre beauté naturelle. 
            Chaque produit est une promesse de luxe, d'efficacité et de bien-être.
          </p>

          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              <div className={`${isDark ? 'bg-white/5 backdrop-blur-md border border-gold-500/20' : 'bg-white/80 backdrop-blur-md border border-gold-200'} rounded-lg p-6 hover:shadow-lg transition`}>
                <div className="text-3xl mb-3">✨</div>
                <h3 className={`font-semibold mb-2 ${isDark ? 'text-gold-300' : 'text-gold-800'}`}>Premium</h3>
                <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-800'}`}>Ingrédients sélectionnés avec soin</p>
              </div>
              <div className={`${isDark ? 'bg-white/5 backdrop-blur-md border border-rose-500/20' : 'bg-white/80 backdrop-blur-md border border-rose-200'} rounded-lg p-6 hover:shadow-lg transition`}>
                <div className="text-3xl mb-3">🌿</div>
                <h3 className={`font-semibold mb-2 ${isDark ? 'text-rose-300' : 'text-rose-800'}`}>Naturel</h3>
                <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-800'}`}>Formules respectueuses de la peau</p>
              </div>
              <div className={`${isDark ? 'bg-white/5 backdrop-blur-md border border-gold-500/20' : 'bg-white/80 backdrop-blur-md border border-gold-200'} rounded-lg p-6 hover:shadow-lg transition`}>
                <div className="text-3xl mb-3">🎁</div>
                <h3 className={`font-semibold mb-2 ${isDark ? 'text-gold-300' : 'text-gold-800'}`}>Luxe</h3>
                <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-800'}`}>Expérience de bien-être complète</p>
              </div>
            </div>

            <Link
              to="/shop"
              className={`inline-block px-12 py-4 font-semibold rounded-lg transition transform hover:scale-105 uppercase tracking-widest text-sm ${isDark ? 'bg-gold-500 hover:bg-gold-600 text-white' : 'bg-gold-700 hover:bg-gold-800 text-white'}`}
            >
              Découvrir la Collection
            </Link>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
          <svg className={`w-6 h-6 ${isDark ? 'text-gold-400' : 'text-gold-600'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </section>

      {/* VALUES SECTION */}
      <section className={`py-20 md:py-32 ${isDark ? 'bg-gradient-to-b from-transparent to-slate-900/50' : 'bg-gradient-to-b from-transparent to-gray-100/50'}`}>
        <div className="max-w-5xl mx-auto px-6">
          <h2 className={`text-4xl md:text-5xl font-serif text-center mb-16 ${isDark ? 'text-white' : 'text-gray-950'}`}>
            Nos Principes
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className={`text-2xl mt-1 ${isDark ? 'text-gold-400' : 'text-gold-700'}`}>★</div>
                <div>
                  <h3 className={`text-xl font-semibold mb-2 ${isDark ? 'text-white' : 'text-gray-950'}`}>Qualité Exceptionnelle</h3>
                  <p className={isDark ? 'text-gray-300' : 'text-gray-800'}>Seuls les meilleurs ingrédients pour une efficacité maximale</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className={`text-2xl mt-1 ${isDark ? 'text-rose-400' : 'text-rose-700'}`}>★</div>
                <div>
                  <h3 className={`text-xl font-semibold mb-2 ${isDark ? 'text-white' : 'text-gray-950'}`}>Innovation</h3>
                  <p className={isDark ? 'text-gray-300' : 'text-gray-800'}>Formules modernes basées sur la recherche scientifique</p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className={`text-2xl mt-1 ${isDark ? 'text-gold-400' : 'text-gold-700'}`}>★</div>
                <div>
                  <h3 className={`text-xl font-semibold mb-2 ${isDark ? 'text-white' : 'text-gray-950'}`}>Durabilité</h3>
                  <p className={isDark ? 'text-gray-300' : 'text-gray-800'}>Engagement envers l'environnement et l'éthique</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className={`text-2xl mt-1 ${isDark ? 'text-rose-400' : 'text-rose-700'}`}>★</div>
                <div>
                  <h3 className={`text-xl font-semibold mb-2 ${isDark ? 'text-white' : 'text-gray-950'}`}>Résultats Visibles</h3>
                  <p className={isDark ? 'text-gray-300' : 'text-gray-800'}>Transformations remarquables en quelques semaines</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;