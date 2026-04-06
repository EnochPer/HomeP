'use client';

import { use, useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import artworksData from '../../../../data/artworks.json';

const colorMap: Record<string, string> = {
  'color-1': 'from-purple-400 to-pink-400',
  'color-2': 'from-orange-400 to-yellow-400',
  'color-3': 'from-blue-400 to-cyan-400',
  'color-4': 'from-red-400 to-orange-400',
  'color-5': 'from-blue-500 to-indigo-500',
  'color-6': 'from-yellow-400 to-amber-400',
  'color-7': 'from-green-400 to-teal-400',
  'color-8': 'from-indigo-400 to-purple-400',
};

export default function GalleryPage({ params }: { params: Promise<{ seriesId: string }> }) {
  const { seriesId } = use(params);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const seriesKey = `series_${seriesId}` as keyof typeof artworksData;
  const artworks = artworksData[seriesKey] || [];

  const goToSlide = useCallback((index: number) => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((index + artworks.length) % artworks.length);
    setTimeout(() => setIsAnimating(false), 400);
  }, [artworks.length, isAnimating]);

  const nextSlide = useCallback(() => {
    goToSlide(currentIndex + 1);
  }, [currentIndex, goToSlide]);

  const prevSlide = useCallback(() => {
    goToSlide(currentIndex - 1);
  }, [currentIndex, goToSlide]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') nextSlide();
      else if (e.key === 'ArrowLeft') prevSlide();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextSlide, prevSlide]);

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      if (Math.abs(e.deltaY) < 10) return;

      if (e.deltaY > 0) {
        nextSlide();
      } else {
        prevSlide();
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('wheel', handleWheel, { passive: false });
      return () => container.removeEventListener('wheel', handleWheel);
    }
  }, [nextSlide, prevSlide]);

  const getVisibleSlides = () => {
    const slides = [];
    for (let offset = -1; offset <= 1; offset++) {
      const index = (currentIndex + offset + artworks.length) % artworks.length;
      slides.push({ artwork: artworks[index], offset, index });
    }
    return slides;
  };

  if (artworks.length === 0) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-white text-center">
          <h1 className="text-2xl mb-4">系列未找到</h1>
          <Link href="/home" className="text-blue-400 hover:text-blue-300">
            返回首页
          </Link>
        </div>
      </div>
    );
  }

  const currentArtwork = artworks[currentIndex];
  const bgGradient = colorMap[currentArtwork.image_url] || 'from-gray-400 to-gray-500';

  return (
    <motion.div
      ref={containerRef}
      key={currentArtwork.id}
      initial={{ backgroundColor: currentArtwork.bgColor }}
      animate={{ backgroundColor: currentArtwork.bgColor }}
      transition={{ duration: 0.8 }}
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className={`absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-br ${bgGradient} rounded-full blur-3xl opacity-30`}
          animate={{ 
            x: [0, 30, -30, 0],
            y: [0, -20, 20, 0],
            scale: [1, 1.1, 0.9, 1]
          }}
          transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className={`absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-br ${bgGradient} rounded-full blur-3xl opacity-30`}
          animate={{ 
            x: [0, -40, 40, 0],
            y: [0, 30, -30, 0],
            scale: [1, 0.95, 1.05, 1]
          }}
          transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        />
      </div>

      <div className="relative z-10 max-w-6xl w-full px-8">
        <div className="flex items-center justify-between mb-8">
          <Link href="/home">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="text-gray-700 hover:text-gray-900 transition-colors font-medium"
            >
              ← 返回首页
            </motion.button>
          </Link>
          <h1 className="text-2xl font-light text-gray-800 tracking-wide">
            系列 {seriesId}
          </h1>
          <div className="w-24" />
        </div>

        <div className="flex items-center justify-center gap-8">
          <motion.button
            whileHover={{ scale: 1.15, backgroundColor: 'rgba(0,0,0,0.4)' }}
            whileTap={{ scale: 0.9 }}
            onClick={prevSlide}
            disabled={isAnimating}
            className="w-14 h-14 bg-black/20 hover:bg-black/30 rounded-full flex items-center justify-center text-white text-2xl transition-all disabled:opacity-50"
          >
            ←
          </motion.button>

          <div className="flex-1 flex flex-col items-center relative">
            <div className="w-full max-w-3xl aspect-[4/3] relative overflow-hidden rounded-2xl shadow-2xl">
              <AnimatePresence mode='wait'>
                {getVisibleSlides().map(({ artwork, offset, index }) => {
                  const isCurrent = offset === 0;
                  const x = offset * 100;
                  
                  if (Math.abs(offset) > 1) return null;

                  return (
                    <motion.div
                      key={`${artwork.id}-${isCurrent}`}
                      initial={false}
                      animate={{
                        x: `${x}%`,
                        opacity: isCurrent ? 1 : 0.5,
                        scale: isCurrent ? 1 : 0.9,
                      }}
                      transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                      className={`absolute inset-0 ${isCurrent ? '' : 'pointer-events-none'}`}
                    >
                      {artwork.image_url.startsWith('/') ? (
                        <Image
                          src={artwork.image_url}
                          alt={artwork.title}
                          fill
                          className="object-cover"
                          loading={isCurrent ? 'eager' : 'lazy'}
                          priority={isCurrent}
                        />
                      ) : (
                        <div className={`w-full h-full bg-gradient-to-br ${colorMap[artwork.image_url] || bgGradient} flex items-center justify-center`}>
                          <div className="text-white text-8xl">🎨</div>
                        </div>
                      )}
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>

            <motion.div
              key={currentArtwork.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mt-8 text-center max-w-2xl"
            >
              <h2 className="text-4xl font-light text-gray-800 mb-4">
                {currentArtwork.title}
              </h2>
              <p className="text-gray-600 mb-3 text-lg leading-relaxed">
                {currentArtwork.desc_zh}
              </p>
              <p className="text-gray-500 text-sm italic">
                {currentArtwork.desc_en}
              </p>
            </motion.div>

            <div className="mt-8 flex gap-3 items-center">
              {artworks.map((_, index) => (
                <motion.button
                  key={index}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => goToSlide(index)}
                  className={`rounded-full transition-all ${
                    index === currentIndex 
                      ? 'w-10 h-3 bg-gray-800' 
                      : 'w-3 h-3 bg-gray-400 hover:bg-gray-500'
                  }`}
                />
              ))}
            </div>

            <p className="mt-4 text-gray-500 text-sm">
              {currentIndex + 1} / {artworks.length} · 使用键盘箭头或滚轮切换
            </p>
          </div>

          <motion.button
            whileHover={{ scale: 1.15, backgroundColor: 'rgba(0,0,0,0.4)' }}
            whileTap={{ scale: 0.9 }}
            onClick={nextSlide}
            disabled={isAnimating}
            className="w-14 h-14 bg-black/20 hover:bg-black/30 rounded-full flex items-center justify-center text-white text-2xl transition-all disabled:opacity-50"
          >
            →
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
