import { LoginPage } from '@/components'
import { getServerSession } from 'next-auth';
import { authOptions } from './api/auth/[...nextauth]/route';
import Logout from '@/components/login/Logout';


export default async function Home() {
  const session = await getServerSession(authOptions);

  if (session) {
    return (
      <div>
        <h1>Welcome {session.user?.name}</h1>
        <p>This is a protected page</p>
        <div><Logout /></div>
      </div>
    );
  }

  return (
    <LoginPage />
  );
}

