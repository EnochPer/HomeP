'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function ExhibitionsPage() {
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-gray-900 to-green-900 flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-4xl mx-auto p-8"
      >
        <h1 className="text-4xl font-light text-white mb-8 text-center">展览信息</h1>
        
        <div className="space-y-6 mb-8">
          {[
            { title: '个展：光之回响', date: '2024年12月 - 2025年2月', location: '当代艺术中心' },
            { title: '群展：自然之声', date: '2024年9月 - 2024年11月', location: '城市美术馆' },
            { title: '个展：记忆碎片', date: '2024年3月 - 2024年5月', location: '艺术空间画廊' },
          ].map((exhibition, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white/10 backdrop-blur-lg rounded-xl p-6"
            >
              <h2 className="text-xl text-white mb-2">{exhibition.title}</h2>
              <p className="text-gray-300">{exhibition.date}</p>
              <p className="text-gray-400">{exhibition.location}</p>
            </motion.div>
          ))}
        </div>

        <div className="flex justify-center">
          <Link href="/home">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 bg-white/20 hover:bg-white/30 text-white rounded-lg transition-colors"
            >
              返回首页
            </motion.button>
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
