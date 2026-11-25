import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Package,
  Truck,
  CheckCircle,
  Clock,
  RotateCcw,
  ArrowRight,
} from 'lucide-react';
import { ClientOrder } from '@/types';

export const OrderHistoryPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [orders] = useState<ClientOrder[]>([]);

  const filteredOrders = orders.filter((o) => {
    if (activeTab === 'shipping' && o.status !== 'shipping') return false;
    if (activeTab === 'pending' && o.status !== 'pending') return false;
    if (activeTab === 'completed' && o.status !== 'completed') return false;
    return true;
  });

  return (
    <div className="max-w-5xl mx-auto px-6 py-10 space-y-8">
      <div>
        <h1 className="text-2xl font-extrabold text-slate-900">Lịch sử đơn hàng của tôi</h1>
        <p className="text-xs text-slate-500 mt-1">Theo dõi quá trình vận chuyển và lịch sử mua sắm</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-6 border-b border-slate-200 text-xs font-bold">
        {[
          { key: 'all', label: 'Tất cả đơn' },
          { key: 'pending', label: 'Chờ xác nhận' },
          { key: 'shipping', label: 'Đang vận chuyển' },
          { key: 'completed', label: 'Đã hoàn tất' },
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`pb-3 transition ${
              activeTab === tab.key
                ? 'border-b-2 border-blue-600 text-blue-600'
                : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* List */}
      <div className="space-y-4">
        {filteredOrders.map((o) => {
          let badgeClass = 'bg-blue-50 text-blue-700';
          let label = 'Đang giao hàng';
          let icon = <Truck className="h-3.5 w-3.5" />;

          if (o.status === 'pending') {
            badgeClass = 'bg-amber-50 text-amber-700';
            label = 'Chờ người bán xác nhận';
            icon = <Clock className="h-3.5 w-3.5" />;
          } else if (o.status === 'completed') {
            badgeClass = 'bg-emerald-50 text-emerald-700';
            label = 'Giao hàng thành công';
            icon = <CheckCircle className="h-3.5 w-3.5" />;
          }

          return (
            <div key={o.id} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3 text-xs">
                <div>
                  <span className="font-bold text-slate-900">Mã đơn: #{o.orderCode}</span>
                  <span className="text-slate-400 ml-3">Đặt ngày: {o.createdAt}</span>
                </div>
                <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 font-bold ${badgeClass}`}>
                  {icon}
                  <span>{label}</span>
                </span>
              </div>

              <div className="flex items-center justify-between text-xs py-2">
                <div>
                  <p className="font-semibold text-slate-900">{o.itemsSummary}</p>
                  <p className="text-[11px] text-slate-400 mt-1">Phương thức: {o.paymentMethod}</p>
                  <p className="text-[11px] text-slate-500 mt-0.5">Địa chỉ: {o.shippingAddress}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-slate-500">Tổng thanh toán:</p>
                  <p className="text-base font-black text-slate-900 mt-0.5">
                    {o.totalAmount.toLocaleString('vi-VN')}đ
                  </p>
                </div>
              </div>

              <div className="flex justify-end gap-3 border-t border-slate-100 pt-3 text-xs">
                <button
                  onClick={() => alert(`Theo dõi đơn hàng #${o.orderCode}: Đang điều phối shipper`)}
                  className="rounded-xl border border-slate-200 px-4 py-2 font-bold text-slate-700 hover:bg-slate-50"
                >
                  Theo dõi đơn
                </button>
                <Link
                  to="/products"
                  className="rounded-xl bg-slate-900 px-4 py-2 font-bold text-white hover:bg-blue-600 transition"
                >
                  Mua lại
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

