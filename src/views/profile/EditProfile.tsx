'use client';

import { notFound } from 'next/navigation';

import { EditForm } from '@/modules/user/components/EditForm/EditForm';
import { useCurrentUser } from '@/modules/user/hooks/useCurrentUser';

import { Loader } from '@/components/ui/loader/Loader';
import SectionTitle from '@/components/ui/sectionTitle/SectionTitle';

import styles from './styles/EditProfile.module.scss';

export const EditProfile = () => {
  const { data: me, isLoading: isLoadingMe, error: errorMe } = useCurrentUser();
  if (isLoadingMe) return <Loader />;
  if (errorMe) return notFound();
  if (!me) return null;

  return (
    <div className={styles.editWrapper}>
      <SectionTitle title="Редагування Профілю" />
      <EditForm user={me} />
    </div>
  );
};
