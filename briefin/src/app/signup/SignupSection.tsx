'use client';

import { useState } from 'react';
import Link from 'next/link';
import { LogoIcon } from '../../../public/icon';

export default function SignupSection() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');

  return (
    <section className="auth-scene">
      <div
        className="auth-deco"
        style={{
          width: 500,
          height: 500,
          top: -200,
          right: -150,
          background: 'radial-gradient(circle, rgba(44,74,143,0.5) 0%, transparent 70%)',
        }}
      />
      <div
        className="auth-deco"
        style={{
          width: 400,
          height: 400,
          bottom: -180,
          left: -100,
          background: 'radial-gradient(circle, rgba(26,50,112,0.6) 0%, transparent 70%)',
        }}
      />
      <div
        className="auth-deco"
        style={{
          width: 200,
          height: 200,
          top: '30%',
          left: '5%',
          background: 'radial-gradient(circle, rgba(255,255,255,0.04) 0%, transparent 70%)',
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
          <h2>시작해볼까요</h2>
          <p>지금 가입하고 나만의 투자 뉴스 피드를 받아보세요</p>
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
            <label className="auth-input-label">비밀번호</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="8자 이상 입력"
              className="auth-input"
            />
          </div>
          <div className="auth-input-group">
            <label className="auth-input-label">비밀번호 확인</label>
            <input
              type="password"
              value={passwordConfirm}
              onChange={(e) => setPasswordConfirm(e.target.value)}
              placeholder="비밀번호를 다시 입력"
              className="auth-input"
            />
          </div>
          <button type="button" className="auth-btn-cta">
            시작하기 →
          </button>
          <p className="auth-footer-text">
            이미 계정이 있으신가요? <Link href="/login">로그인</Link>
          </p>
        </div>
      </div>
    </section>
  );
}
