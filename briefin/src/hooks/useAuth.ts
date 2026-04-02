import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { login, signup } from '@/api/authApi';
import { clearExplicitLogout, markMayHaveRefresh } from '@/lib/refreshSession';
import { authStore } from '@/store/authStore';

export function useLogin(redirectTo?: string) {
  const router = useRouter();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      queryClient.clear();
      clearExplicitLogout();
      markMayHaveRefresh();
      authStore.setAccessToken(data.accessToken);
      const target = redirectTo && redirectTo.startsWith('/') ? redirectTo : '/';
      router.push(target);
    },
  });
}

export function useSignup() {
  const router = useRouter();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: signup,
    onSuccess: async (_, variables) => {
      queryClient.clear();
      try {
        const data = await login({ email: variables.email, password: variables.password });
        clearExplicitLogout();
        markMayHaveRefresh();
        authStore.setAccessToken(data.accessToken);
      } catch {
        // 자동 로그인 실패해도 온보딩으로 이동 (사용자가 수동 로그인 가능)
      }
      router.push('/onboarding');
    },
  });
}

