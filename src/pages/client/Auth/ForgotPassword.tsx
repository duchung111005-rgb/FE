import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, ArrowLeft, CheckCircle } from 'lucide-react';

export const ForgotPasswordPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-8 shadow-xl space-y-6">
        <Link to="/login" className="inline-flex items-center gap-1 text-xs font-semibold text-slate-500 hover:text-blue-600">
          <ArrowLeft className="h-4 w-4" />
          <span>Quay lại đăng nhập</span>
        </Link>

        {!submitted ? (
          <>
            <div className="space-y-2">
              <h2 className="text-2xl font-black text-slate-900">Quên mật khẩu?</h2>
              <p className="text-xs text-slate-400">
                Nhập email hoặc số điện thoại đã đăng ký để nhận mã khôi phục mật khẩu.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-700">Email hoặc SĐT *</label>
                <div className="relative mt-1">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <input
                    type="text"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@example.com hoặc 090..."
                    className="w-full rounded-xl border border-slate-200 p-2.5 pl-9 focus:border-blue-600 focus:outline-none"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full rounded-xl bg-blue-600 py-3 font-bold text-white shadow-xl hover:bg-blue-700 transition"
              >
                GỬI MÃ XÁC THỰC
              </button>
            </form>
          </>
        ) : (
          <div className="text-center space-y-4 py-4">
            <div className="flex h-16 w-16 mx-auto items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
              <CheckCircle className="h-10 w-10" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">Đã gửi liên kết khôi phục!</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Chúng tôi đã gửi hướng dẫn đặt lại mật khẩu đến <strong className="text-slate-900">{email}</strong>. Vui lòng kiểm tra hộp thư đến hoặc tin nhắn SMS.
            </p>
            <div className="pt-2">
              <Link
                to="/login"
                className="inline-block rounded-xl bg-slate-900 px-6 py-2.5 text-xs font-bold text-white hover:bg-blue-600 transition"
              >
                Về trang đăng nhập
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

