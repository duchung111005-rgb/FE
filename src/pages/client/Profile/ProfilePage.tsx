import React, { useState } from 'react';
import {
  User,
  MapPin,
  Award,
  Lock,
  LogOut,
  Edit2,
  Plus,
  Trash2,
  CheckCircle,
} from 'lucide-react';
import { useUser } from '@/context';
import { useNavigate } from 'react-router-dom';

export const ProfilePage: React.FC = () => {
  const { user, setUser, logout } = useUser();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState<'info' | 'address' | 'points'>('info');

  const [addresses, setAddresses] = useState([
    { id: 1, type: 'Nhà riêng', name: 'Trần Văn A', phone: '0901 234 567', detail: '123 Nguyễn Huệ, P. Bến Nghé, Quận 1, TP.HCM', isDefault: true },
    { id: 2, type: 'Văn phòng', name: 'Trần Văn A (Công ty)', phone: '028 3822 1234', detail: '456 Lý Tự Trọng, P. Bến Thành, Quận 1, TP.HCM', isDefault: false },
  ]);

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    fullName: user?.fullName || 'Trần Văn A',
    email: user?.email || 'tran.vana@gmail.com',
    phoneNumber: user?.phoneNumber || '0901 234 567',
    address: user?.address || '123 Nguyễn Huệ, P. Bến Nghé, Quận 1, TP.HCM',
  });

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    if (user) {
      setUser({ ...user, ...formData });
    }
    setIsEditing(false);
    alert('Cập nhật thông tin thành công!');
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="max-w-5xl mx-auto px-6 py-10 space-y-8">
      <h1 className="text-2xl font-extrabold text-slate-900">Tài khoản của tôi</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left: User Card & Menu (1 col) */}
        <div className="space-y-6">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm text-center space-y-3">
            <div className="flex h-20 w-20 mx-auto items-center justify-center rounded-full bg-blue-600 font-extrabold text-2xl text-white shadow-md">
              {user?.fullName?.split(' ').map((n) => n[0]).join('').slice(-2) || 'AD'}
            </div>
            <div>
              <h3 className="font-bold text-base text-slate-900">{user?.fullName}</h3>
              <p className="text-xs text-slate-400">{user?.email}</p>
            </div>
            <div className="inline-flex items-center gap-1.5 rounded-full bg-amber-50 px-3 py-1 text-xs font-bold text-amber-700 border border-amber-200">
              <Award className="h-3.5 w-3.5" />
              <span>🥇 HỘI VIÊN GOLD ({user?.points || 4250} điểm)</span>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-2 shadow-sm text-xs font-semibold space-y-1">
            <button
              onClick={() => setActiveTab('info')}
              className={`flex items-center gap-3 w-full p-3 rounded-xl transition ${
                activeTab === 'info' ? 'bg-blue-50 text-blue-600 font-bold' : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              <User className="h-4 w-4" />
              <span>Thông tin tài khoản</span>
            </button>
            <button
              onClick={() => setActiveTab('address')}
              className={`flex items-center gap-3 w-full p-3 rounded-xl transition ${
                activeTab === 'address' ? 'bg-blue-50 text-blue-600 font-bold' : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              <MapPin className="h-4 w-4" />
              <span>Địa chỉ nhận hàng</span>
            </button>
            <button
              onClick={() => setActiveTab('points')}
              className={`flex items-center gap-3 w-full p-3 rounded-xl transition ${
                activeTab === 'points' ? 'bg-blue-50 text-blue-600 font-bold' : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              <Award className="h-4 w-4" />
              <span>Điểm thưởng & Voucher</span>
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center gap-3 w-full p-3 rounded-xl text-rose-600 hover:bg-rose-50 transition"
            >
              <LogOut className="h-4 w-4" />
              <span>Đăng xuất</span>
            </button>
          </div>
        </div>

        {/* Right Content (2 cols) */}
        <div className="md:col-span-2">
          {activeTab === 'info' && (
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-6">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <h3 className="font-bold text-base text-slate-900">Hồ sơ cá nhân</h3>
                {!isEditing && (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="flex items-center gap-1.5 text-xs font-bold text-blue-600 hover:underline"
                  >
                    <Edit2 className="h-3.5 w-3.5" />
                    <span>Chỉnh sửa</span>
                  </button>
                )}
              </div>

              <form onSubmit={handleSaveProfile} className="space-y-4 text-xs">
                <div>
                  <label className="block font-semibold text-slate-700">Họ và tên</label>
                  <input
                    type="text"
                    disabled={!isEditing}
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="mt-1 w-full rounded-xl border border-slate-200 p-2.5 disabled:bg-slate-50 disabled:text-slate-500 focus:border-blue-600 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700">Email</label>
                  <input
                    type="email"
                    disabled={!isEditing}
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="mt-1 w-full rounded-xl border border-slate-200 p-2.5 disabled:bg-slate-50 disabled:text-slate-500 focus:border-blue-600 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700">Số điện thoại</label>
                  <input
                    type="text"
                    disabled={!isEditing}
                    value={formData.phoneNumber}
                    onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                    className="mt-1 w-full rounded-xl border border-slate-200 p-2.5 disabled:bg-slate-50 disabled:text-slate-500 focus:border-blue-600 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700">Địa chỉ mặc định</label>
                  <input
                    type="text"
                    disabled={!isEditing}
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    className="mt-1 w-full rounded-xl border border-slate-200 p-2.5 disabled:bg-slate-50 disabled:text-slate-500 focus:border-blue-600 focus:outline-none"
                  />
                </div>

                {isEditing && (
                  <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
                    <button
                      type="button"
                      onClick={() => setIsEditing(false)}
                      className="rounded-xl border border-slate-200 px-4 py-2 font-semibold text-slate-600 hover:bg-slate-50"
                    >
                      Hủy
                    </button>
                    <button
                      type="submit"
                      className="rounded-xl bg-blue-600 px-5 py-2 font-bold text-white hover:bg-blue-700"
                    >
                      Lưu thay đổi
                    </button>
                  </div>
                )}
              </form>
            </div>
          )}

          {activeTab === 'address' && (
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-6">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <h3 className="font-bold text-base text-slate-900">Địa chỉ giao hàng</h3>
                <button
                  onClick={() => alert('Thêm địa chỉ mới')}
                  className="flex items-center gap-1 rounded-xl bg-blue-600 px-3 py-1.5 text-xs font-bold text-white hover:bg-blue-700"
                >
                  <Plus className="h-3.5 w-3.5" />
                  <span>Thêm địa chỉ</span>
                </button>
              </div>

              <div className="space-y-4">
                {addresses.map((a) => (
                  <div
                    key={a.id}
                    className={`rounded-2xl border p-4 text-xs space-y-2 ${
                      a.isDefault ? 'border-blue-600 bg-blue-50/20' : 'border-slate-200'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-900">{a.name}</span>
                        <span className="rounded bg-slate-100 px-2 py-0.5 text-[10px] font-bold text-slate-600">
                          {a.type}
                        </span>
                        {a.isDefault && (
                          <span className="rounded bg-amber-100 px-2 py-0.5 text-[10px] font-bold text-amber-800">
                            Mặc định
                          </span>
                        )}
                      </div>
                      <span className="text-slate-500">{a.phone}</span>
                    </div>

                    <p className="text-slate-600">{a.detail}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'points' && (
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-6">
              <h3 className="font-bold text-base text-slate-900">Điểm tích lũy & Ưu đãi thành viên</h3>
              <div className="rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-700 p-6 text-white space-y-3">
                <p className="text-xs uppercase tracking-wider text-blue-200">Điểm hiện có</p>
                <h2 className="text-4xl font-black">{user?.points || 4250} Điểm</h2>
                <p className="text-xs text-blue-100">
                  Tương đương 425.000đ khi quy đổi thành voucher giảm giá thanh toán.
                </p>
              </div>

              <div className="space-y-3">
                <h4 className="font-bold text-xs text-slate-700 uppercase">Voucher của bạn</h4>
                <div className="p-4 rounded-xl border border-dashed border-blue-300 bg-blue-50/50 flex items-center justify-between">
                  <div>
                    <p className="font-bold text-xs text-blue-900">VOUCHER 50K - THU ĐÔNG '26</p>
                    <p className="text-[11px] text-slate-500">Giảm 50.000đ cho đơn từ 499K • HSD: 31/12/2026</p>
                  </div>
                  <span className="font-mono text-xs font-bold text-blue-600 bg-white px-3 py-1 rounded-lg border border-blue-200">
                    FASHION50K
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

