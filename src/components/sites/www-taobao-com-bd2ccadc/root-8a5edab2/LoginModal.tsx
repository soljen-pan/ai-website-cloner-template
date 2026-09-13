"use client";

import { CloseIcon, LockFieldIcon, QrIcon, UserFieldIcon } from "@/components/sites/www-taobao-com-bd2ccadc/shared/icons";

export function LoginModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/45">
      <div className="relative w-[360px] rounded-2xl bg-white px-8 py-7 shadow-[0_12px_40px_rgba(0,0,0,0.18)]">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-3 right-3 grid size-7 place-items-center rounded-full text-[#999] hover:bg-[#f5f5f5]"
          aria-label="关闭"
        >
          <CloseIcon />
        </button>
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-[18px] font-semibold text-[#1f1f1f]">密码登录</h2>
          <span className="inline-flex items-center gap-1 text-[12px] text-[#7a7a7a]">
            <QrIcon className="text-[#ff5000]" />
            扫码登录
          </span>
        </div>
        <form
          className="space-y-3"
          onSubmit={(event) => {
            event.preventDefault();
            onClose();
          }}
        >
          <label className="flex h-10 items-center gap-2 rounded-lg border border-[#d6d6d6] px-3">
            <UserFieldIcon className="text-[#999]" />
            <input
              className="h-full w-full border-0 text-[14px] outline-none"
              placeholder="账号/手机号"
              autoComplete="username"
            />
          </label>
          <label className="flex h-10 items-center gap-2 rounded-lg border border-[#d6d6d6] px-3">
            <LockFieldIcon className="text-[#999]" />
            <input
              type="password"
              className="h-full w-full border-0 text-[14px] outline-none"
              placeholder="请输入登录密码"
              autoComplete="current-password"
            />
          </label>
          <button
            type="submit"
            className="mt-2 h-10 w-full rounded-lg bg-[#ff5000] text-[15px] font-medium text-white"
          >
            登录
          </button>
        </form>
        <div className="mt-4 flex justify-between text-[12px] text-[#7a7a7a]">
          <a href="https://passport.taobao.com/ac/password_find.htm" className="hover:text-[#ff5000]">
            忘记密码
          </a>
          <a href="https://register.taobao.com/" className="hover:text-[#ff5000]">
            免费注册
          </a>
        </div>
      </div>
    </div>
  );
}
