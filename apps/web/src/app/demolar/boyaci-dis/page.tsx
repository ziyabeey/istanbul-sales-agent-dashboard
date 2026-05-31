import { THEME_CATALOG } from '@kepenk/templates';
import ClientPage from './client';
import { notFound } from 'next/navigation';

export async function generateMetadata() {
  const theme = THEME_CATALOG.find((t) => t.id === 'boyaci-dis');
  if (!theme) return { title: 'Not Found' };
  
  return {
    title: `${theme.name} | Kepenk Demo`,
    description: theme.description,
  };
}

export default function Page() {
  const theme = THEME_CATALOG.find((t) => t.id === 'boyaci-dis');
  
  if (!theme) {
    notFound();
  }

  return <ClientPage theme={theme} />;
}
