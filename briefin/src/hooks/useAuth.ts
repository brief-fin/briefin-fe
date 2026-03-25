import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { login, signup } from '@/api/authApi';
import { tokenStorage } from '@/lib/token';

export function useLogin() {
  const router = useRouter();
  return useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      tokenStorage.set(data.accessToken);
      router.push('/home');
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
