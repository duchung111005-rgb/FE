import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ClientFilterSidebar, ProductCard } from '@/components/client';
import { ClientProduct } from '@/types';

export const ProductListPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const keyword = searchParams.get('keyword') || '';
  const categoryParam = searchParams.get('category') || 'all';

  const [products] = useState<ClientProduct[]>([]);
  const [selectedCat, setSelectedCat] = useState(categoryParam);
  const [sortBy, setSortBy] = useState('popular');
  const [priceRange, setPriceRange] = useState('all');

  const filtered = products.filter((p) => {
    if (keyword && !p.name.toLowerCase().includes(keyword.toLowerCase())) return false;
    if (selectedCat !== 'all' && selectedCat !== 'thu-dong' && selectedCat !== 'nam' && selectedCat !== 'nu') {
      if (!p.category.toLowerCase().includes(selectedCat.toLowerCase())) return false;
    }
    if (priceRange === 'under-500' && p.price >= 500000) return false;
    if (priceRange === '500-1000' && (p.price < 500000 || p.price > 1000000)) return false;
    if (priceRange === 'over-1000' && p.price <= 1000000) return false;
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-slate-900">
          {keyword ? `Kết quả tìm kiếm cho "${keyword}"` : 'Danh mục sản phẩm thời trang'}
        </h2>
        <p className="text-xs text-slate-500 mt-1">Tìm thấy {filtered.length} sản phẩm phù hợp</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Filter Sidebar (1 col) */}
        <ClientFilterSidebar
          selectedCat={selectedCat}
          onSelectCat={setSelectedCat}
          priceRange={priceRange}
          onSelectPriceRange={setPriceRange}
        />

        {/* Product Grid (3 cols) */}
        <div className="lg:col-span-3 space-y-6">
          <div className="flex items-center justify-between bg-slate-50 p-3 rounded-xl border border-slate-200 text-xs">
            <span className="font-semibold text-slate-600">Sắp xếp theo:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-white border border-slate-200 rounded-lg px-3 py-1.5 font-semibold text-slate-700 focus:outline-none focus:border-blue-600"
            >
              <option value="popular">Phổ biến nhất</option>
              <option value="price-asc">Giá: Thấp đến Cao</option>
              <option value="price-desc">Giá: Cao đến Thấp</option>
              <option value="newest">Mới nhất 2026</option>
            </select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {filtered.map((p) => (
              <ProductCard key={p.id} product={p} showRating={false} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

