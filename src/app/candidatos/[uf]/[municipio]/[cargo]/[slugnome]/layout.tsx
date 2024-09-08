// /app/candidatos/[uf]/[municipio]/[cargo]/[slug-nome-candidato]/layout.tsx

import { ReactNode } from 'react';

interface CandidateLayoutProps {
  children: ReactNode;
}
export default function CandidateLayout({ children }: CandidateLayoutProps) {
  return (
    <>
      {children}
    </>
  );
}
