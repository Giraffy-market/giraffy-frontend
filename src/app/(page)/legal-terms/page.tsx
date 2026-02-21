import LegalTermsPage from '@/views/legal-terms/LegalTermsPage';
import { getServerSession } from 'next-auth';

import { authOptions } from '@/modules/auth';

export default async function Page() {
  const session = await getServerSession(authOptions);
  console.log(session);

  return (
    <>
      <LegalTermsPage />
    </>
  );
}
