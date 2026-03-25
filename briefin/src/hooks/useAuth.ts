import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { login, signup } from '@/api/authApi';
import { authStore } from '@/store/authStore';

export function useLogin(redirectTo?: string) {
  const router = useRouter();
  return useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      authStore.setAccessToken(data.accessToken);
      const target = redirectTo && redirectTo.startsWith('/') ? redirectTo : '/';
      router.push(target);
    },
  });
}

export function useSignup() {
  const router = useRouter();
  return useMutation({
    mutationFn: signup,
    onSuccess: () => {
      router.push('/onboarding');
    },
  });
}
