import React, { useState } from 'react';
import {
  DollarSign,
  ShoppingCart,
  Users,
  Package,
  ArrowUpRight,
  Sparkles,
} from 'lucide-react';
import { StatCard, RevenueChart, RecentOrdersTable, TopProductsCard } from '@/components/dashboard';
import { OrderDetailModal } from '@/components/orders/OrderDetailModal';
import { useOrderStore } from '@/store/useOrderStore';
import { useProductStore } from '@/store/useProductStore';
import { useCustomerStore } from '@/store/useCustomerStore';
import { DateFilterOption, Order, RevenueDataPoint } from '@/types';
import { formatCurrency } from '@/lib/utils';
import { Link } from 'react-router-dom';

const EMPTY_ANALYTICS = {
  summary: {
    revenue: 0,
    revenueChange: 0,
    orders: 0,
    ordersChange: 0,
    customersChange: 0,
    productsChange: 0,
  },
  chartData: [] as RevenueDataPoint[],
};

export const DashboardPage: React.FC = () => {
  const [period, setPeriod] = useState<DateFilterOption['value']>('30d');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const { orders, updateOrderStatus } = useOrderStore();
  const { products } = useProductStore();
  const { customers } = useCustomerStore();

  const currentAnalytics = EMPTY_ANALYTICS;

  return (
    <div className="space-y-6">
      {/* Top Welcome Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 p-6 rounded-[14px] text-white shadow-lg shadow-blue-500/15">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="flex h-6 items-center gap-1.5 rounded-full bg-white/20 px-2.5 text-[11px] font-semibold backdrop-blur-sm">
              <Sparkles className="h-3.5 w-3.5" />
              Tổng quan hoạt động
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black tracking-tight">
            Chào mừng trở lại, Fashion Admin!
          </h2>
          <p className="text-xs text-blue-100 mt-1">
            Hôm nay bạn có {orders.filter((o) => o.status === 'pending').length} đơn hàng mới cần xử lý và giao cho đơn vị vận chuyển.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link
            to="/admin/products"
            className="rounded-[10px] bg-white px-3.5 py-2 text-xs font-bold text-blue-700 shadow-sm hover:bg-blue-50 transition"
          >
            Quản lý sản phẩm
          </Link>
          <Link
            to="/admin/orders"
            className="rounded-[10px] bg-white/10 border border-white/20 px-3.5 py-2 text-xs font-bold text-white hover:bg-white/20 transition flex items-center gap-1"
          >
            <span>Đơn hàng</span>
            <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>

      {/* 4 Statistics Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Tổng doanh thu"
          value={formatCurrency(currentAnalytics.summary.revenue)}
          change={currentAnalytics.summary.revenueChange}
          icon={<DollarSign className="h-5 w-5" />}
          iconBgColor="bg-emerald-50 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-400"
        />
        <StatCard
          title="Tổng số đơn hàng"
          value={`${currentAnalytics.summary.orders} đơn`}
          change={currentAnalytics.summary.ordersChange}
          icon={<ShoppingCart className="h-5 w-5" />}
          iconBgColor="bg-blue-50 text-blue-600 dark:bg-blue-950/40 dark:text-blue-400"
        />
        <StatCard
          title="Khách hàng tích lũy"
          value={`${customers.length * 42} khách`}
          change={currentAnalytics.summary.customersChange}
          icon={<Users className="h-5 w-5" />}
          iconBgColor="bg-purple-50 text-purple-600 dark:bg-purple-950/40 dark:text-purple-400"
        />
        <StatCard
          title="Sản phẩm đang bán"
          value={`${products.length} sản phẩm`}
          change={currentAnalytics.summary.productsChange}
          icon={<Package className="h-5 w-5" />}
          iconBgColor="bg-amber-50 text-amber-600 dark:bg-amber-950/40 dark:text-amber-400"
        />
      </div>

      {/* Recharts Revenue Area Chart with Period Filter */}
      <RevenueChart
        data={currentAnalytics.chartData}
        period={period}
        onPeriodChange={(newPeriod) => setPeriod(newPeriod)}
      />

      {/* Bottom Grid: Recent Orders (2/3) + Top Products (1/3) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <RecentOrdersTable
            orders={orders}
            onViewOrder={(order) => setSelectedOrder(order)}
          />
        </div>
        <div>
          <TopProductsCard products={products} />
        </div>
      </div>

      {/* Order Detail Modal */}
      <OrderDetailModal
        order={selectedOrder}
        isOpen={Boolean(selectedOrder)}
        onClose={() => setSelectedOrder(null)}
        onUpdateStatus={(id, status) => {
          updateOrderStatus(id, status);
        }}
      />
    </div>
  );
};

