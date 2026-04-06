'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
        className="relative"
      >
        <div className="w-[800px] h-[600px] bg-gradient-to-br from-amber-50 to-amber-100 rounded-lg shadow-2xl relative overflow-hidden">
          <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-amber-300" />
          
          <div className="absolute left-12 top-12">
            <Link href="/about">
              <motion.button
                whileHover={{ scale: 1.1, rotate: -5 }}
                whileTap={{ scale: 0.95 }}
                className="w-24 h-24 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center shadow-lg"
              >
                <span className="text-white text-3xl">👤</span>
              </motion.button>
            </Link>
            <p className="text-center text-gray-600 mt-2 text-sm">作者介绍</p>
          </div>

          <div className="absolute right-24 top-24">
            <Link href="/exhibitions">
              <motion.button
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.95 }}
                className="w-24 h-24 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center shadow-lg"
              >
                <span className="text-white text-3xl">🏛️</span>
              </motion.button>
            </Link>
            <p className="text-center text-gray-600 mt-2 text-sm">展览信息</p>
          </div>

          <div className="absolute left-24 bottom-24">
            <Link href="/gallery/1">
              <motion.button
                whileHover={{ scale: 1.1, rotate: -3 }}
                whileTap={{ scale: 0.95 }}
                className="w-20 h-20 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full flex items-center justify-center shadow-lg"
              >
                <span className="text-white text-2xl">🌸</span>
              </motion.button>
            </Link>
            <p className="text-center text-gray-600 mt-2 text-sm">系列一</p>
          </div>

          <div className="absolute right-12 bottom-32">
            <Link href="/gallery/2">
              <motion.button
                whileHover={{ scale: 1.1, rotate: 3 }}
                whileTap={{ scale: 0.95 }}
                className="w-20 h-20 bg-gradient-to-br from-red-400 to-red-600 rounded-full flex items-center justify-center shadow-lg"
              >
                <span className="text-white text-2xl">🔥</span>
              </motion.button>
            </Link>
            <p className="text-center text-gray-600 mt-2 text-sm">系列二</p>
          </div>

          <div className="absolute left-1/2 -translate-x-1/2 top-20">
            <Link href="/gallery/3">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="w-20 h-20 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center shadow-lg"
              >
                <span className="text-white text-2xl">☀️</span>
              </motion.button>
            </Link>
            <p className="text-center text-gray-600 mt-2 text-sm">系列三</p>
          </div>

          <div className="absolute left-32 top-1/2 -translate-y-1/2">
            <Link href="/gallery/4">
              <motion.button
                whileHover={{ scale: 1.1, rotate: -8 }}
                whileTap={{ scale: 0.95 }}
                className="w-20 h-20 bg-gradient-to-br from-teal-400 to-teal-600 rounded-full flex items-center justify-center shadow-lg"
              >
                <span className="text-white text-2xl">🌿</span>
              </motion.button>
            </Link>
            <p className="text-center text-gray-600 mt-2 text-sm">系列四</p>
          </div>

          <div className="absolute right-32 top-1/2 -translate-y-1/2">
            <Link href="/gallery/5">
              <motion.button
                whileHover={{ scale: 1.1, rotate: 8 }}
                whileTap={{ scale: 0.95 }}
                className="w-20 h-20 bg-gradient-to-br from-indigo-400 to-indigo-600 rounded-full flex items-center justify-center shadow-lg"
              >
                <span className="text-white text-2xl">✨</span>
              </motion.button>
            </Link>
            <p className="text-center text-gray-600 mt-2 text-sm">系列五</p>
          </div>
        </div>

        <Link href="/">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="absolute -top-12 left-0 text-gray-400 hover:text-white transition-colors"
          >
            ← 返回
          </motion.button>
        </Link>
      </motion.div>
    </div>
  );
}
