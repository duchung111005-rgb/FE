import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Flame,
  Sparkles,
} from 'lucide-react';
import { ProductCard } from '@/components/client';
import { ClientProduct } from '@/types';

export const HomePage: React.FC = () => {
  const [gender, setGender] = useState<'NAM' | 'NU'>('NAM');
  const [favorites, setFavorites] = useState<Record<string, boolean>>({});
  const [products] = useState<ClientProduct[]>([]);

  const toggleFav = (id: string) => {
    setFavorites((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const categories = [
    { name: 'Áo Phông', icon: '👕', bg: 'bg-blue-50', link: '/products?cat=ao-phong' },
    { name: 'Áo Khoác', icon: '🧥', bg: 'bg-emerald-50', link: '/products?cat=ao-khoac' },
    { name: 'Đầm Váy', icon: '👗', bg: 'bg-rose-50', link: '/products?cat=dam-vay' },
    { name: 'Quần Nam', icon: '👖', bg: 'bg-amber-50', link: '/products?cat=quan' },
    { name: 'Giày', icon: '👟', bg: 'bg-purple-50', link: '/products?cat=giay' },
    { name: 'Áo Len', icon: '🧶', bg: 'bg-orange-50', link: '/products?cat=ao-len' },
  ];

  return (
    <div className="space-y-12">
      {/* 1. HERO SECTION */}
      <section className="relative bg-[#1a1a1a] text-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 py-20 lg:py-28 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-xs font-bold tracking-widest text-slate-200">
              <Sparkles className="h-3.5 w-3.5 text-amber-400" />
              <span>THU ĐÔNG 2026</span>
            </div>

            <div className="space-y-2">
              <h1 className="text-4xl sm:text-6xl font-black tracking-tight leading-tight">
                FALL / WINTER '26
              </h1>
              <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-400">
                NEW COLLECTION
              </h2>
            </div>

            <p className="text-sm text-slate-300 max-w-lg leading-relaxed">
              Bộ sưu tập thời trang Thu Đông 2026 với những thiết kế hiện đại, chất liệu len cashmere, phao lông vũ chống thấm cao cấp.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-4">
              <Link
                to="/products"
                className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-3.5 text-xs font-extrabold text-slate-900 shadow-xl hover:bg-slate-100 transition transform hover:-translate-y-0.5"
              >
                <span>MUA NGAY</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/products?sale=true"
                className="inline-flex items-center gap-2 rounded-full border border-white/30 px-6 py-3.5 text-xs font-bold text-white hover:bg-white/10 transition"
              >
                <span>KHÁM PHÁ SALE -50%</span>
              </Link>
            </div>
          </div>

          {/* Hero Visual Mockup */}
          <div className="grid grid-cols-3 gap-4 p-4 rounded-3xl bg-white/5 border border-white/10">
            <div className="rounded-2xl bg-slate-800/80 p-6 flex flex-col items-center justify-center text-center shadow-lg aspect-[3/4]">
              <span className="text-6xl">🧥</span>
              <p className="mt-4 text-xs font-bold text-slate-200">#Puffer Jacket</p>
              <p className="text-[10px] text-amber-400 mt-1">Giảm 35%</p>
            </div>
            <div className="rounded-2xl bg-slate-800/80 p-6 flex flex-col items-center justify-center text-center shadow-lg aspect-[3/4] translate-y-4">
              <span className="text-6xl">👗</span>
              <p className="mt-4 text-xs font-bold text-slate-200">#Maxi Dress</p>
              <p className="text-[10px] text-rose-400 mt-1">Mới ra mắt</p>
            </div>
            <div className="rounded-2xl bg-slate-800/80 p-6 flex flex-col items-center justify-center text-center shadow-lg aspect-[3/4]">
              <span className="text-6xl">👖</span>
              <p className="mt-4 text-xs font-bold text-slate-200">#Slimfit Jean</p>
              <p className="text-[10px] text-emerald-400 mt-1">Bán chạy nhất</p>
            </div>
          </div>
        </div>
      </section>

      {/* 2. CATEGORY CIRCLES */}
      <section className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between pb-6 border-b border-slate-100">
          <h3 className="text-lg font-bold text-slate-900">Danh mục mua sắm</h3>
          <div className="flex items-center rounded-full bg-slate-100 p-1 text-xs font-bold">
            <button
              onClick={() => setGender('NAM')}
              className={`rounded-full px-4 py-1.5 transition ${gender === 'NAM' ? 'bg-slate-900 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'
                }`}
            >
              NAM
            </button>
            <button
              onClick={() => setGender('NU')}
              className={`rounded-full px-4 py-1.5 transition ${gender === 'NU' ? 'bg-slate-900 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'
                }`}
            >
              NỮ
            </button>
          </div>
        </div>

        <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-6 gap-6 mt-6">
          {categories.map((c) => (
            <Link
              key={c.name}
              to={c.link}
              className="flex flex-col items-center gap-3 group text-center"
            >
              <div
                className={`h-20 w-20 rounded-full ${c.bg} flex items-center justify-center text-3xl shadow-sm border border-slate-200/50 group-hover:scale-110 group-hover:shadow-md transition`}
              >
                {c.icon}
              </div>
              <span className="text-xs font-bold text-slate-700 group-hover:text-blue-600 transition">
                {c.name}
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* 3. FLASH SALE SECTION */}
      <section className="max-w-7xl mx-auto px-6">
        <div className="rounded-2xl bg-rose-50 border border-rose-200 p-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-rose-600 text-white shadow-md shadow-rose-500/30">
              <Flame className="h-6 w-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-black text-rose-700">FLASH SALE HÔM NAY</h3>
                <span className="rounded-full bg-rose-600 px-2.5 py-0.5 text-[10px] font-extrabold text-white">
                  UP TO 50%
                </span>
              </div>
              <p className="text-xs text-rose-900/80 mt-0.5">
                Chỉ áp dụng trong khung giờ vàng hôm nay
              </p>
            </div>
          </div>

          {/* Countdown Clock */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-rose-800">Kết thúc sau:</span>
            <div className="flex items-center gap-1.5 text-xs font-black">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-rose-600 text-white">02</div>
              <span className="text-rose-600 font-bold">:</span>
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-rose-600 text-white">15</div>
              <span className="text-rose-600 font-bold">:</span>
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-rose-600 text-white">30</div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. FEATURED PRODUCTS GRID */}
      <section className="max-w-7xl mx-auto px-6 pb-12">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h3 className="text-2xl font-bold tracking-tight text-slate-900">
              Sản phẩm nổi bật
            </h3>
            <p className="text-xs text-slate-500 mt-1">Được lựa chọn nhiều nhất trong tuần</p>
          </div>
          <Link
            to="/products"
            className="flex items-center gap-1 text-xs font-bold text-blue-600 hover:underline"
          >
            <span>Xem tất cả sản phẩm</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.length === 0 ? (
            <div className="col-span-full py-12 text-center text-sm text-slate-400">
              Chưa có sản phẩm nào. Vui lòng kết nối API để hiển thị sản phẩm.
            </div>
          ) : (
            products.map((p) => (
              <ProductCard
                key={p.id}
                product={p}
                isFavorite={!!favorites[p.id]}
                onToggleFavorite={toggleFav}
              />
            ))
          )}
        </div>
      </section>
    </div>
  );
};

