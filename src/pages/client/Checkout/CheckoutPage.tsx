import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  CreditCard,
  Truck,
  CheckCircle,
  MapPin,
  ShieldCheck,
  ChevronLeft,
} from 'lucide-react';
import { useCart } from '@/context';
import { useUser } from '@/context';

export const CheckoutPage: React.FC = () => {
  const { items, subTotal, clearCart } = useCart();
  const { user } = useUser();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: user?.fullName || 'Trần Văn A',
    phone: user?.phoneNumber || '0901 234 567',
    email: user?.email || 'tran.vana@gmail.com',
    city: 'Hồ Chí Minh',
    district: 'Quận 1',
    address: '123 Nguyễn Huệ, Phường Bến Nghé',
    notes: 'Giao hàng giờ hành chính',
  });

  const [paymentMethod, setPaymentMethod] = useState<'cod' | 'vietqr' | 'card'>('cod');
  const [isSuccessModal, setIsSuccessModal] = useState(false);

  const shippingFee = subTotal >= 499000 ? 0 : 30000;
  const finalTotal = subTotal + shippingFee;

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSuccessModal(true);
    clearCart();
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <Link to="/cart" className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-blue-600 mb-6">
        <ChevronLeft className="h-4 w-4" />
        <span>Quay lại giỏ hàng</span>
      </Link>

      <h1 className="text-2xl font-extrabold text-slate-900 mb-8">Thanh toán đơn hàng</h1>

      <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Left: Address & Payment Method (2 cols) */}
        <div className="lg:col-span-2 space-y-8">
          {/* 1. Thông tin giao hàng */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
            <h3 className="font-bold text-base text-slate-900 flex items-center gap-2">
              <MapPin className="h-5 w-5 text-blue-600" />
              <span>1. Thông tin người nhận & Địa chỉ giao hàng</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-700">Họ và tên *</label>
                <input
                  type="text"
                  required
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className="mt-1 w-full rounded-xl border border-slate-200 p-2.5 focus:border-blue-600 focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700">Số điện thoại nhận hàng *</label>
                <input
                  type="text"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="mt-1 w-full rounded-xl border border-slate-200 p-2.5 focus:border-blue-600 focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700">Tỉnh / Thành phố *</label>
                <input
                  type="text"
                  required
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  className="mt-1 w-full rounded-xl border border-slate-200 p-2.5 focus:border-blue-600 focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700">Quận / Huyện *</label>
                <input
                  type="text"
                  required
                  value={formData.district}
                  onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                  className="mt-1 w-full rounded-xl border border-slate-200 p-2.5 focus:border-blue-600 focus:outline-none"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block font-semibold text-slate-700">Địa chỉ cụ thể (Số nhà, tên đường) *</label>
                <input
                  type="text"
                  required
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="mt-1 w-full rounded-xl border border-slate-200 p-2.5 focus:border-blue-600 focus:outline-none"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block font-semibold text-slate-700">Ghi chú giao hàng</label>
                <input
                  type="text"
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="Ví dụ: Gọi trước khi giao 15 phút"
                  className="mt-1 w-full rounded-xl border border-slate-200 p-2.5 focus:border-blue-600 focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* 2. Phương thức thanh toán */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
            <h3 className="font-bold text-base text-slate-900 flex items-center gap-2">
              <CreditCard className="h-5 w-5 text-blue-600" />
              <span>2. Phương thức thanh toán</span>
            </h3>

            <div className="space-y-3 text-xs">
              {[
                { id: 'cod', label: 'Thanh toán tiền mặt khi nhận hàng (COD)', desc: 'Kiểm tra hàng trước khi thanh toán' },
                { id: 'vietqr', label: 'Chuyển khoản Ngân hàng (VietQR)', desc: 'Quét mã VietQR trên ứng dụng Mobile Banking' },
                { id: 'card', label: 'Thẻ Quốc tế Visa, MasterCard, JCB', desc: 'Cổng thanh toán bảo mật OnePay' },
              ].map((m) => (
                <label
                  key={m.id}
                  className={`flex items-start gap-3 p-3.5 rounded-xl border cursor-pointer transition ${
                    paymentMethod === m.id
                      ? 'border-blue-600 bg-blue-50/50 shadow-sm'
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <input
                    type="radio"
                    name="payment"
                    value={m.id}
                    checked={paymentMethod === m.id}
                    onChange={() => setPaymentMethod(m.id as any)}
                    className="mt-0.5"
                  />
                  <div>
                    <p className="font-bold text-slate-900">{m.label}</p>
                    <p className="text-[11px] text-slate-500 mt-0.5">{m.desc}</p>
                  </div>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Order Summary (1 col) */}
        <div className="space-y-6">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
            <h3 className="font-bold text-base text-slate-900">Chi tiết đơn hàng</h3>

            {/* List items */}
            <div className="divide-y divide-slate-100 max-h-60 overflow-y-auto pr-1">
              {items.map((it) => (
                <div key={it.id} className="py-3 flex items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{it.thumbnail}</span>
                    <div>
                      <p className="font-bold text-slate-900 line-clamp-1">{it.name}</p>
                      <p className="text-[11px] text-slate-400">
                        Size: {it.size || 'L'} x {it.quantity}
                      </p>
                    </div>
                  </div>
                  <span className="font-bold text-slate-900">
                    {(it.price * it.quantity).toLocaleString('vi-VN')}đ
                  </span>
                </div>
              ))}
            </div>

            {/* Summary */}
            <div className="space-y-2.5 text-xs border-t border-slate-100 pt-4">
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
              <div className="flex justify-between items-center text-sm font-black text-slate-900 border-t border-slate-100 pt-3">
                <span>Tổng thanh toán</span>
                <span className="text-xl text-blue-600">{finalTotal.toLocaleString('vi-VN')}đ</span>
              </div>
            </div>

            <button
              type="submit"
              className="w-full rounded-xl bg-blue-600 py-3.5 text-xs font-black text-white shadow-xl hover:bg-blue-700 transition"
            >
              ĐẶT HÀNG NGAY
            </button>
          </div>
        </div>
      </form>

      {/* SUCCESS MODAL */}
      {isSuccessModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-3xl bg-white p-8 text-center shadow-2xl space-y-4">
            <div className="flex h-16 w-16 mx-auto items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
              <CheckCircle className="h-10 w-10" />
            </div>
            <h3 className="text-xl font-bold text-slate-900">Đặt hàng thành công!</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Cảm ơn bạn đã mua sắm tại FashionStore. Mã đơn hàng của bạn là{' '}
              <strong className="text-blue-600">#DH-{Math.floor(1000 + Math.random() * 9000)}</strong>. Chúng tôi sẽ liên hệ sớm để xác nhận giao hàng.
            </p>

            <div className="pt-4 flex gap-3">
              <button
                onClick={() => navigate('/orders')}
                className="flex-1 rounded-xl bg-slate-900 py-3 text-xs font-bold text-white hover:bg-blue-600 transition"
              >
                Xem đơn hàng của tôi
              </button>
              <button
                onClick={() => navigate('/')}
                className="flex-1 rounded-xl border border-slate-200 py-3 text-xs font-bold text-slate-700 hover:bg-slate-50 transition"
              >
                Về trang chủ
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

