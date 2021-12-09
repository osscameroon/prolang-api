import dynamic from 'next/dynamic';

const Login = dynamic(() => import('@components/login/Login'));

export default function LoginPage() {
  return <Login />;
}
