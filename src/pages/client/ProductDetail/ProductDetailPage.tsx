import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  Star,
  Heart,
  ShoppingBag,
  Truck,
  RotateCcw,
  ShieldCheck,
  Check,
  Share2,
} from 'lucide-react';
import { useCart } from '@/context';
import { ClientProduct } from '@/types';

export const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const [products] = useState<ClientProduct[]>([]);
  const product = products.find((p) => p.id === id);

  const [selectedSize, setSelectedSize] = useState('L');
  const [selectedColor, setSelectedColor] = useState('Đen');
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'desc' | 'guide' | 'reviews'>('desc');

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-20 text-center space-y-4">
        <p className="text-lg font-bold text-slate-900">Không tìm thấy sản phẩm</p>
        <p className="text-xs text-slate-500">Vui lòng kết nối API để tải thông tin chi tiết sản phẩm.</p>
        <Link to="/products" className="inline-block rounded-xl bg-slate-900 px-5 py-2.5 text-xs font-bold text-white">
          Quay lại danh sách
        </Link>
      </div>
    );
  }

  const sizes = ['S', 'M', 'L', 'XL', 'XXL'];
  const colors = ['Đen', 'Trắng', 'Xanh Navy', 'Be Vintage'];

  const handleAddToCart = () => {
    addToCart({
      productId: product.id,
      name: product.name,
      price: product.price,
      originalPrice: product.originalPrice,
      quantity,
      size: selectedSize,
      color: selectedColor,
      thumbnail: product.thumbnail,
    });
    alert(`Đã thêm ${quantity} sản phẩm vào giỏ hàng!`);
  };

  const handleBuyNow = () => {
    addToCart({
      productId: product.id,
      name: product.name,
      price: product.price,
      originalPrice: product.originalPrice,
      quantity,
      size: selectedSize,
      color: selectedColor,
      thumbnail: product.thumbnail,
    });
    navigate('/checkout');
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-10 space-y-12">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs text-slate-500">
        <Link to="/" className="hover:text-blue-600">Trang chủ</Link>
        <span>/</span>
        <Link to="/products" className="hover:text-blue-600">Sản phẩm</Link>
        <span>/</span>
        <span className="font-semibold text-slate-900">{product.name}</span>
      </nav>

      {/* Main Product Info Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Left: Product Image */}
        <div className="space-y-4">
          <div className="rounded-3xl bg-slate-100 aspect-square flex items-center justify-center text-9xl shadow-inner border border-slate-200">
            {product.thumbnail}
          </div>
          <div className="grid grid-cols-4 gap-3">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="rounded-xl bg-slate-100 aspect-square flex items-center justify-center text-3xl border border-slate-200 cursor-pointer hover:border-blue-600 transition"
              >
                {product.thumbnail}
              </div>
            ))}
          </div>
        </div>

        {/* Right: Info & Actions */}
        <div className="space-y-6">
          <div>
            <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-blue-700">
              {product.category}
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2">
              {product.name}
            </h1>
            <p className="text-xs text-slate-400 mt-1">Mã sản phẩm: {product.sku}</p>

            <div className="flex items-center gap-3 mt-3">
              <div className="flex items-center text-amber-500 text-xs">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star key={s} className="h-4 w-4 fill-amber-400 text-amber-400" />
                ))}
                <span className="ml-1.5 font-bold text-slate-800">4.9</span>
              </div>
              <span className="text-xs text-slate-400">|</span>
              <span className="text-xs text-slate-600">128 đánh giá</span>
              <span className="text-xs text-slate-400">|</span>
              <span className="text-xs font-semibold text-emerald-600">Đã bán 520+</span>
            </div>
          </div>

          {/* Price */}
          <div className="flex items-baseline gap-3 p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
            <span className="text-3xl font-black text-slate-900">
              {product.price.toLocaleString('vi-VN')}đ
            </span>
            {product.originalPrice > product.price && (
              <>
                <span className="text-sm text-slate-400 line-through">
                  {product.originalPrice.toLocaleString('vi-VN')}đ
                </span>
                <span className="rounded-md bg-rose-600 px-2 py-0.5 text-xs font-bold text-white">
                  -35%
                </span>
              </>
            )}
          </div>

          {/* Color Selection */}
          <div className="space-y-2">
            <label className="block text-xs font-bold text-slate-700 uppercase">
              Màu sắc: <span className="text-blue-600">{selectedColor}</span>
            </label>
            <div className="flex flex-wrap gap-2">
              {colors.map((c) => (
                <button
                  key={c}
                  onClick={() => setSelectedColor(c)}
                  className={`rounded-xl border px-4 py-2 text-xs font-semibold transition ${selectedColor === c
                    ? 'border-blue-600 bg-blue-50 text-blue-700 shadow-sm'
                    : 'border-slate-200 hover:border-slate-400'
                    }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          {/* Size Selection */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="block text-xs font-bold text-slate-700 uppercase">
                Kích thước: <span className="text-blue-600">{selectedSize}</span>
              </label>
              <button
                onClick={() => setActiveTab('guide')}
                className="text-xs font-semibold text-blue-600 hover:underline"
              >
                Bảng quy đổi size 📏
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {sizes.map((s) => (
                <button
                  key={s}
                  onClick={() => setSelectedSize(s)}
                  className={`h-10 w-12 rounded-xl border flex items-center justify-center text-xs font-bold transition ${selectedSize === s
                    ? 'border-blue-600 bg-blue-600 text-white shadow-md shadow-blue-500/30'
                    : 'border-slate-200 hover:border-slate-400'
                    }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity */}
          <div className="flex items-center gap-4">
            <span className="text-xs font-bold text-slate-700 uppercase">Số lượng:</span>
            <div className="flex items-center rounded-xl border border-slate-200 overflow-hidden bg-white">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="px-3 py-1.5 text-slate-600 hover:bg-slate-100 font-bold"
              >
                -
              </button>
              <span className="px-4 py-1.5 text-xs font-bold">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="px-3 py-1.5 text-slate-600 hover:bg-slate-100 font-bold"
              >
                +
              </button>
            </div>
            <span className="text-xs text-slate-500">Còn {product.stock} sản phẩm</span>
          </div>

          {/* CTA Buttons */}
          <div className="flex gap-4 pt-2">
            <button
              onClick={handleAddToCart}
              className="flex-1 flex items-center justify-center gap-2 rounded-xl border-2 border-slate-900 bg-white py-3.5 text-xs font-bold text-slate-900 hover:bg-slate-100 transition"
            >
              <ShoppingBag className="h-4 w-4" />
              <span>Thêm vào giỏ</span>
            </button>
            <button
              onClick={handleBuyNow}
              className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-slate-900 py-3.5 text-xs font-bold text-white shadow-xl hover:bg-blue-600 transition"
            >
              <span>Mua ngay</span>
            </button>
          </div>

          {/* Policies */}
          <div className="grid grid-cols-3 gap-3 pt-4 border-t border-slate-100 text-[11px] text-slate-600">
            <div className="flex items-center gap-2">
              <Truck className="h-4 w-4 text-blue-600" />
              <span>Giao 2-3 ngày</span>
            </div>
            <div className="flex items-center gap-2">
              <RotateCcw className="h-4 w-4 text-emerald-600" />
              <span>Đổi trả 30 ngày</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-amber-600" />
              <span>Chính hãng 100%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs: Description / Size Guide / Reviews */}
      <div className="border-t border-slate-200 pt-8 space-y-6">
        <div className="flex gap-8 border-b border-slate-200 pb-3 text-sm font-bold">
          <button
            onClick={() => setActiveTab('desc')}
            className={`pb-3 transition ${activeTab === 'desc' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-slate-500'}`}
          >
            Mô tả sản phẩm
          </button>
          <button
            onClick={() => setActiveTab('guide')}
            className={`pb-3 transition ${activeTab === 'guide' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-slate-500'}`}
          >
            Bảng quy đổi Size
          </button>
          <button
            onClick={() => setActiveTab('reviews')}
            className={`pb-3 transition ${activeTab === 'reviews' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-slate-500'}`}
          >
            Đánh giá từ khách hàng (128)
          </button>
        </div>

        {activeTab === 'desc' && (
          <div className="prose text-xs text-slate-600 max-w-none space-y-3 leading-relaxed">
            <p>
              Sản phẩm {product.name} thuộc bộ sưu tập Thu Đông 2026 của FashionStore. Được hoàn thiện từ chất liệu cao cấp với công nghệ may dệt hiện đại, mang lại cảm giác thoải mái, giữ ấm tuyệt đối mà vẫn đảm bảo tính thẩm mỹ thanh lịch.
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Chất liệu: Bền nhẹ, thoáng khí, chống nhăn và chống xù lông.</li>
              <li>Form dáng: Thiết kế chuẩn người Việt Nam, tôn dáng lịch sự.</li>
              <li>Đường chỉ may tỉ mỉ, độ hoàn thiện cao cấp.</li>
              <li>Hướng dẫn giặt: Giặt tay hoặc giặt máy ở chế độ nhẹ, không dùng chất tẩy mạnh.</li>
            </ul>
          </div>
        )}

        {activeTab === 'guide' && (
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left border border-slate-200 rounded-xl overflow-hidden">
              <thead className="bg-slate-50 text-[11px] font-bold text-slate-700 uppercase">
                <tr>
                  <th className="p-3 border-b">Size</th>
                  <th className="p-3 border-b">Chiều cao (cm)</th>
                  <th className="p-3 border-b">Cân nặng (kg)</th>
                  <th className="p-3 border-b">Vòng ngực (cm)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-600">
                <tr><td className="p-3 font-bold text-slate-900">S</td><td className="p-3">155 - 165</td><td className="p-3">48 - 56</td><td className="p-3">84 - 88</td></tr>
                <tr><td className="p-3 font-bold text-slate-900">M</td><td className="p-3">160 - 170</td><td className="p-3">56 - 65</td><td className="p-3">88 - 92</td></tr>
                <tr><td className="p-3 font-bold text-slate-900">L</td><td className="p-3">168 - 176</td><td className="p-3">65 - 73</td><td className="p-3">92 - 96</td></tr>
                <tr><td className="p-3 font-bold text-slate-900">XL</td><td className="p-3">174 - 182</td><td className="p-3">73 - 82</td><td className="p-3">96 - 102</td></tr>
              </tbody>
            </table>
          </div>
        )}

        {activeTab === 'reviews' && (
          <div className="space-y-4">
            {[
              { name: 'Nguyễn Hoàng Nam', rating: 5, time: '2 ngày trước', text: 'Chất vải rất đẹp, mặc ấm và form vừa vặn với mình. Đóng gói rất cẩn thận!' },
              { name: 'Lê Thị Thu Trang', rating: 5, time: '1 tuần trước', text: 'Giao hàng nhanh, đúng mô tả, đường may rất tỉ mỉ. Rất đáng tiền!' },
            ].map((r, i) => (
              <div key={i} className="p-4 rounded-xl border border-slate-200 bg-white space-y-1.5 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900">{r.name}</span>
                  <span className="text-[11px] text-slate-400">{r.time}</span>
                </div>
                <div className="flex text-amber-400 text-xs">
                  {'★'.repeat(r.rating)}
                </div>
                <p className="text-slate-600">{r.text}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

