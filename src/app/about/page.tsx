'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function AboutPage() {
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-gray-900 to-blue-900 flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-3xl mx-auto p-8"
      >
        <h1 className="text-4xl font-light text-white mb-8 text-center">关于艺术家</h1>
        
        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-8 mb-8">
          <div className="w-32 h-32 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full mx-auto mb-6 flex items-center justify-center">
            <span className="text-white text-4xl">👨‍🎨</span>
          </div>
          
          <h2 className="text-2xl text-white text-center mb-4">艺术家名字</h2>
          
          <p className="text-gray-300 text-center mb-4 leading-relaxed">
            这里是艺术家介绍的内容。讲述艺术家的创作理念、艺术风格和创作历程。
          </p>
          
          <p className="text-gray-300 text-center leading-relaxed">
            继续介绍艺术家的成就、展览经历以及艺术追求。
          </p>
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
