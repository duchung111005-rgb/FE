import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, Zap } from 'lucide-react';
import { useUser } from '@/context';

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { setUser } = useUser();
  const [emailOrPhone, setEmailOrPhone] = useState('admin@fashionstore.com');
  const [password, setPassword] = useState('123456');
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Set logged in user
    setUser({
      id: 1,
      fullName: 'Nguyễn Admin',
      email: emailOrPhone,
      phoneNumber: '0901 234 567',
      role: 'ADMIN',
      rank: 'DIAMOND',
      points: 8900,
    });
    alert('Đăng nhập thành công!');
    navigate('/admin/dashboard');
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-8 shadow-xl space-y-6">
        <div className="text-center space-y-2">
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[#1a2744] text-white shadow-md">
            <Zap className="h-6 w-6 text-amber-400 fill-amber-400" />
          </div>
          <h2 className="text-2xl font-black text-slate-900">Đăng nhập tài khoản</h2>
          <p className="text-xs text-slate-400">Chào mừng bạn trở lại với FashionStore</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4 text-xs">
          <div>
            <label className="block font-semibold text-slate-700">Email hoặc Số điện thoại</label>
            <div className="relative mt-1">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input
                type="text"
                required
                value={emailOrPhone}
                onChange={(e) => setEmailOrPhone(e.target.value)}
                placeholder="name@example.com hoặc 090..."
                className="w-full rounded-xl border border-slate-200 p-2.5 pl-9 focus:border-blue-600 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center">
              <label className="block font-semibold text-slate-700">Mật khẩu</label>
              <Link to="/forgot-password" className="text-blue-600 font-semibold hover:underline text-[11px]">
                Quên mật khẩu?
              </Link>
            </div>
            <div className="relative mt-1">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full rounded-xl border border-slate-200 p-2.5 pl-9 pr-9 focus:border-blue-600 focus:outline-none"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full rounded-xl bg-blue-600 py-3 font-bold text-white shadow-xl hover:bg-blue-700 transition"
          >
            ĐĂNG NHẬP
          </button>
        </form>

        <div className="text-center text-xs text-slate-500 pt-2 border-t border-slate-100">
          Chưa có tài khoản?{' '}
          <Link to="/register" className="font-bold text-blue-600 hover:underline">
            Đăng ký ngay
          </Link>
        </div>
      </div>
    </div>
  );
};

