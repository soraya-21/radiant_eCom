import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-luxe-950 to-slate-900">
      {/* HERO SECTION */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        {/* Background accent */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-gold-500/10 to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-gradient-to-t from-rose-500/10 to-transparent"></div>

        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          {/* Top accent */}
          <div className="flex justify-center mb-8">
            <div className="w-12 h-px bg-gradient-to-r from-transparent via-gold-400 to-transparent"></div>
          </div>

          <h1 className="text-5xl md:text-7xl font-serif text-white mb-6 leading-tight animate-fade-in">
            Radiant
            <span className="block text-3xl md:text-5xl mt-4 bg-gradient-to-r from-gold-300 via-rose-300 to-gold-300 bg-clip-text text-transparent">
              Luxe & Éclat
            </span>
          </h1>

          <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed italic font-light animate-slide-up">
            Découvrez notre collection de soins premium conçue pour sublimer votre beauté naturelle. 
            Chaque produit est une promesse de luxe, d'efficacité et de bien-être.
          </p>

          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              <div className="bg-white/5 backdrop-blur-md border border-gold-500/20 rounded-lg p-6 hover:border-gold-400/50 transition">
                <div className="text-3xl mb-3">✨</div>
                <h3 className="text-gold-300 font-semibold mb-2">Premium</h3>
                <p className="text-gray-400 text-sm">Ingrédients sélectionnés avec soin</p>
              </div>
              <div className="bg-white/5 backdrop-blur-md border border-rose-500/20 rounded-lg p-6 hover:border-rose-400/50 transition">
                <div className="text-3xl mb-3">🌿</div>
                <h3 className="text-rose-300 font-semibold mb-2">Naturel</h3>
                <p className="text-gray-400 text-sm">Formules respectueuses de la peau</p>
              </div>
              <div className="bg-white/5 backdrop-blur-md border border-gold-500/20 rounded-lg p-6 hover:border-gold-400/50 transition">
                <div className="text-3xl mb-3">🎁</div>
                <h3 className="text-gold-300 font-semibold mb-2">Luxe</h3>
                <p className="text-gray-400 text-sm">Expérience de bien-être complète</p>
              </div>
            </div>

            <Link
              to="/shop"
              className="inline-block px-12 py-4 bg-gradient-to-r from-gold-500 to-rose-500 text-white font-semibold rounded-lg hover:shadow-2xl hover:shadow-gold-500/50 transition transform hover:scale-105 uppercase tracking-widest text-sm"
            >
              Découvrir la Collection
            </Link>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
          <svg className="w-6 h-6 text-gold-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </section>

      {/* VALUES SECTION */}
      <section className="py-20 md:py-32 bg-gradient-to-b from-transparent to-slate-900/50">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-4xl md:text-5xl font-serif text-center text-white mb-16">
            Nos Principes
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="text-gold-400 text-2xl mt-1">★</div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">Qualité Exceptionnelle</h3>
                  <p className="text-gray-400">Seuls les meilleurs ingrédients pour une efficacité maximale</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="text-rose-400 text-2xl mt-1">★</div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">Innovation</h3>
                  <p className="text-gray-400">Formules modernes basées sur la recherche scientifique</p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="text-gold-400 text-2xl mt-1">★</div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">Durabilité</h3>
                  <p className="text-gray-400">Engagement envers l'environnement et l'éthique</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="text-rose-400 text-2xl mt-1">★</div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">Résultats Visibles</h3>
                  <p className="text-gray-400">Transformations remarquables en quelques semaines</p>
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