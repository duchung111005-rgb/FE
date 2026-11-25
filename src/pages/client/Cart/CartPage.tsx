import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Trash2,
  ArrowRight,
  ShoppingBag,
  Tag,
  ShieldCheck,
} from 'lucide-react';
import { useCart } from '@/context';

export const CartPage: React.FC = () => {
  const { items, updateQuantity, removeItem, subTotal } = useCart();
  const navigate = useNavigate();

  const [couponCode, setCouponCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null);

  const shippingFee = subTotal >= 499000 ? 0 : 30000;

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    const code = couponCode.trim().toUpperCase();
    if (code === 'FASHION50K') {
      setDiscount(50000);
      setAppliedCoupon('FASHION50K (Giảm 50.000đ)');
      alert('Áp dụng mã giảm giá 50.000đ thành công!');
    } else if (code === 'FREESHIP') {
      setDiscount(shippingFee);
      setAppliedCoupon('FREESHIP (Miễn phí vận chuyển)');
      alert('Áp dụng mã miễn phí ship thành công!');
    } else {
      alert('Mã giảm giá không hợp lệ hoặc đã hết hạn.');
    }
  };

  const finalTotal = Math.max(0, subTotal - discount + shippingFee);

  if (items.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-6 py-20 text-center space-y-4">
        <div className="flex h-20 w-20 mx-auto items-center justify-center rounded-full bg-slate-100 text-slate-400 text-4xl">
          🛍️
        </div>
        <h2 className="text-2xl font-bold text-slate-900">Giỏ hàng của bạn đang trống</h2>
        <p className="text-xs text-slate-500 max-w-sm mx-auto">
          Hãy khám phá bộ sưu tập Thu Đông mới nhất để chọn cho mình những món đồ ưng ý nhé!
        </p>
        <div className="pt-2">
          <Link
            to="/products"
            className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-8 py-3 text-xs font-bold text-white hover:bg-blue-600 transition"
          >
            <span>Tiếp tục mua sắm</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <h1 className="text-2xl font-extrabold text-slate-900 mb-8">
        Giỏ hàng của bạn ({items.reduce((s, it) => s + it.quantity, 0)} món)
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Left: Items list (2 cols) */}
        <div className="lg:col-span-2 space-y-4">
          <div className="rounded-2xl border border-slate-200 bg-white shadow-sm divide-y divide-slate-100 overflow-hidden">
            {items.map((it) => (
              <div key={it.id} className="p-5 flex items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="h-16 w-16 rounded-xl bg-slate-100 flex items-center justify-center text-3xl shadow-inner border border-slate-200">
                    {it.thumbnail}
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-slate-900">{it.name}</h3>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Size: <strong className="text-slate-700">{it.size || 'L'}</strong>
                      {it.color && <> • Màu: <strong className="text-slate-700">{it.color}</strong></>}
                    </p>
                    <p className="font-bold text-xs text-blue-600 mt-1">
                      {it.price.toLocaleString('vi-VN')}đ
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-6">
                  {/* Quantity */}
                  <div className="flex items-center rounded-lg border border-slate-200 overflow-hidden bg-slate-50">
                    <button
                      onClick={() => updateQuantity(it.id, it.quantity - 1)}
                      className="px-2.5 py-1 text-xs text-slate-600 hover:bg-slate-200 font-bold"
                    >
                      -
                    </button>
                    <span className="px-3 py-1 text-xs font-bold text-slate-900">
                      {it.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(it.id, it.quantity + 1)}
                      className="px-2.5 py-1 text-xs text-slate-600 hover:bg-slate-200 font-bold"
                    >
                      +
                    </button>
                  </div>

                  {/* Line Total */}
                  <span className="font-black text-sm text-slate-900 min-w-[100px] text-right">
                    {(it.price * it.quantity).toLocaleString('vi-VN')}đ
                  </span>

                  {/* Remove */}
                  <button
                    onClick={() => removeItem(it.id)}
                    className="text-slate-400 hover:text-rose-600 p-1 rounded transition"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-between items-center text-xs text-slate-500 pt-2">
            <Link to="/products" className="font-semibold text-blue-600 hover:underline">
              ← Tiếp tục chọn thêm sản phẩm
            </Link>
            <span>Freeship cho mọi đơn hàng từ 499K</span>
          </div>
        </div>

        {/* Right: Summary & Checkout (1 col) */}
        <div className="space-y-6">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-6">
            <h3 className="font-bold text-base text-slate-900">Tóm tắt đơn hàng</h3>

            {/* Coupon Code Input */}
            <form onSubmit={handleApplyCoupon} className="flex gap-2">
              <div className="relative flex-1">
                <Tag className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
                <input
                  type="text"
                  placeholder="Mã voucher (FASHION50K)..."
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-8 pr-3 text-xs uppercase font-bold focus:border-blue-600 focus:bg-white focus:outline-none"
                />
              </div>
              <button
                type="submit"
                className="rounded-xl bg-slate-900 px-4 py-2 text-xs font-bold text-white hover:bg-blue-600 transition"
              >
                Áp dụng
              </button>
            </form>

            {appliedCoupon && (
              <div className="p-2 rounded-lg bg-emerald-50 text-emerald-700 text-xs font-semibold flex items-center justify-between">
                <span>{appliedCoupon}</span>
                <button onClick={() => setDiscount(0)} className="text-slate-400 hover:text-slate-600">×</button>
              </div>
            )}

            {/* Price breakdown */}
            <div className="space-y-3 text-xs border-t border-slate-100 pt-4">
              <div className="flex justify-between text-slate-600">
                <span>Tạm tính</span>
                <span className="font-semibold">{subTotal.toLocaleString('vi-VN')}đ</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Phí vận chuyển</span>
                <span className="font-semibold">
                  {shippingFee === 0 ? <span className="text-emerald-600 font-bold">MIỄN PHÍ</span> : `${shippingFee.toLocaleString('vi-VN')}đ`}
                </span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-emerald-600 font-semibold">
                  <span>Giảm giá voucher</span>
                  <span>-{discount.toLocaleString('vi-VN')}đ</span>
                </div>
              )}
              <div className="flex justify-between items-center text-sm font-black text-slate-900 border-t border-slate-100 pt-4">
                <span>Tổng cộng</span>
                <span className="text-lg text-blue-600">{finalTotal.toLocaleString('vi-VN')}đ</span>
              </div>
            </div>

            {/* Checkout Button */}
            <button
              onClick={() => navigate('/checkout')}
              className="w-full rounded-xl bg-blue-600 py-3.5 text-xs font-extrabold text-white shadow-xl hover:bg-blue-700 transition"
            >
              TIẾN HÀNH ĐẶT HÀNG
            </button>
          </div>

          <div className="rounded-xl bg-slate-50 p-4 border border-slate-200 text-xs text-slate-500 flex items-center gap-3">
            <ShieldCheck className="h-6 w-6 text-emerald-500 shrink-0" />
            <span>Thanh toán an toàn, bảo mật thông tin với chuẩn mã hóa SSL 256-bit.</span>
          </div>
        </div>
      </div>
    </div>
  );
};

