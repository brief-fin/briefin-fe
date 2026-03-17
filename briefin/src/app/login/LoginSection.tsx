'use client';

import { useState } from 'react';
import Link from 'next/link';
import { LogoIcon } from '../../../public/icon';

export default function LoginSection() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <section className="auth-scene">
      <div
        className="auth-deco"
        style={{
          width: 600,
          height: 600,
          top: -250,
          left: -200,
          background: 'radial-gradient(circle, rgba(44,74,143,0.45) 0%, transparent 70%)',
        }}
      />
      <div
        className="auth-deco"
        style={{
          width: 350,
          height: 350,
          bottom: -120,
          right: -80,
          background: 'radial-gradient(circle, rgba(26,50,112,0.55) 0%, transparent 70%)',
        }}
      />
      <div
        className="auth-deco"
        style={{
          width: 180,
          height: 180,
          top: '20%',
          right: '8%',
          background: 'radial-gradient(circle, rgba(255,255,255,0.05) 0%, transparent 70%)',
        }}
      />
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
          pointerEvents: 'none',
        }}
      />

      <div className="auth-card">
        <div className="auth-card-top">
          <div className="auth-card-logo">
            <span className="auth-card-logo-icon">
              <LogoIcon />
            </span>
            <span>Brie<b>Fin</b></span>
          </div>
          <h2>다시 만나서 반가워요</h2>
          <p>로그인하고 나만의 투자 피드를 확인하세요</p>
        </div>
        <div className="auth-card-body">
          <div className="auth-input-group">
            <label className="auth-input-label">이메일</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@example.com"
              className="auth-input"
            />
          </div>
          <div className="auth-input-group">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
              <label className="auth-input-label" style={{ marginBottom: 0 }}>
                비밀번호
              </label>
              <Link href="#" className="text-xs font-semibold text-[var(--mint)] hover:underline">
                비밀번호 찾기
              </Link>
            </div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="비밀번호를 입력하세요"
              className="auth-input"
            />
          </div>
          <button type="button" className="auth-btn-cta">
            로그인
          </button>
          <div className="auth-divider">
            <span>또는</span>
          </div>
          <p className="auth-footer-text" style={{ marginTop: 0 }}>
            아직 계정이 없으신가요? <Link href="/signup">무료 가입하기</Link>
          </p>
        </div>
      </div>
    </section>
  );
}
