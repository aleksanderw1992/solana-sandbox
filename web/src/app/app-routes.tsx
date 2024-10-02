import { lazy } from 'react';
import { Navigate, RouteObject, useRoutes } from 'react-router-dom';
import { UiLayout } from './ui/ui-layout';

const AccountListFeature = lazy(() => import('./account/account-list-feature'));
const AccountDetailFeature = lazy(
  () => import('./account/account-detail-feature')
);
const ClusterFeature = lazy(() => import('./cluster/cluster-feature'));
const DashboardFeature = lazy(() => import('./dashboard/dashboard-feature'));

const SolanaSandboxFeature = lazy(
  () => import('./solana-sandbox/solana-sandbox-feature')
);
const NewsletterFeature = lazy(() => import('./newsletter/newsletter-feature'));
const NftAdminFeature = lazy(() => import('./admin/nfts/nft-admin-feature'));

const links: { label: string; path: string }[] = [
  { label: 'Account', path: '/account' },
  { label: 'Clusters', path: '/clusters' },
  { label: 'SolanaSandbox Program', path: '/solana-sandbox' },
  { label: 'Newsletter', path: '/newsletter' },
  { label: 'NFT Admin', path: '/admin/nfts' },
];

const routes: RouteObject[] = [
  { path: '/account/', element: <AccountListFeature /> },
  { path: '/account/:address', element: <AccountDetailFeature /> },
  { path: '/clusters', element: <ClusterFeature /> },
  { path: 'solana-sandbox/*', element: <SolanaSandboxFeature /> },
  { path: '/newsletter', element: <NewsletterFeature /> },
  { path: '/admin/nfts', element: <NftAdminFeature /> },
];

export function AppRoutes() {
  return (
    <UiLayout links={links}>
      {useRoutes([
        { index: true, element: <Navigate to={'/dashboard'} replace={true} /> },
        { path: '/dashboard', element: <DashboardFeature /> },
        ...routes,
        { path: '*', element: <Navigate to={'/dashboard'} replace={true} /> },
      ])}
    </UiLayout>
  );
}
