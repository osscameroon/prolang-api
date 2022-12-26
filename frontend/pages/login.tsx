import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';

const Login = dynamic(() => import('@components/login/login'));

export default function LoginPage() {
  const router = useRouter();

  const redirectToDashboard = async () => {
    await router.push('/dashboard');
  };

  return <Login onSuccess={redirectToDashboard} />;
}
