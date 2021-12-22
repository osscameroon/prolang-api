import dynamic from 'next/dynamic';

const Login = dynamic(() => import('@components/login/login'));

export default function LoginPage() {
  return <Login />;
}
