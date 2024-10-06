import { lazy } from 'react';
import { Navigate, RouteObject, useRoutes } from 'react-router-dom';
import { UiLayout } from './ui/ui-layout';

const AccountListFeature = lazy(() => import('./account/account-list-feature'));
const AccountDetailFeature = lazy(() => import('./account/account-detail-feature'));
const ClusterFeature = lazy(() => import('./cluster/cluster-feature'));
const DashboardFeature = lazy(() => import('./dashboard/dashboard-feature'));
const SolanaSandboxFeature = lazy(() => import('./solana-sandbox/solana-sandbox-feature'));
const NewsletterFeature = lazy(() => import('./newsletter/newsletter-feature'));
const NftAdminFeature = lazy(() => import('./admin/nfts/nft-admin-feature'));
const NewsletterAdminFeature = lazy(() => import('./admin/newsletter-admin-feature'));
const FirstStepFeature = lazy(() => import('./user/first-step-feature'));
const SecondStepFeature = lazy(() => import('./user/second-step-feature'));
const ThirdStepFeature = lazy(() => import('./user/third-step-feature'));
const GDPRPage = lazy(() => import('./user/gdpr'));
const TermsPage = lazy(() => import('./user/terms'));
const NftMintFeature = lazy(() => import('./solana-sandbox/solana-sandbox-nft'));

const links = [
  // { label: 'Account', path: '/account' },
  // { label: 'Clusters', path: '/clusters' },
  // { label: 'SolanaSandbox Program', path: '/solana-sandbox' },
  { label: 'USER', path: '/user/first-step' },
  { label: 'NFT Mint Admin', path: '/admin/nft-mint' },
  { label: 'NFT Admin', path: '/admin/nfts' },
  { label: 'Newsletter Admin', path: '/admin/newsletter' },
  { label: 'Final Design', path: 'https://www.figma.com/proto/CMbGqUe5Vsgaz0TYuWo6ls/Rabbit-vision?page-id=1%3A4&node-id=1-6&node-type=frame&viewport=360%2C315%2C0.09&t=sKoQv0PnFQV3NzEf-1&scaling=scale-down&content-scaling=fixed&starting-point-node-id=1%3A6' }
];

const routes: RouteObject[] = [
  { path: '/account/', element: <AccountListFeature /> },
  { path: '/account/:address', element: <AccountDetailFeature /> },
  { path: '/clusters', element: <ClusterFeature /> },
  { path: 'solana-sandbox/*', element: <SolanaSandboxFeature /> },
  { path: '/newsletter', element: <NewsletterFeature /> },
  { path: '/admin/nft-mint', element: <NftMintFeature /> },
  { path: '/admin/nfts', element: <NftAdminFeature /> },
  { path: '/admin/newsletter', element: <NewsletterAdminFeature /> },
  { path: '/user/first-step', element: <FirstStepFeature /> },
  { path: '/user/second-step', element: <SecondStepFeature /> },
  { path: '/user/third-step', element: <ThirdStepFeature /> },
  { path: '/gdpr', element: <GDPRPage /> },
  { path: '/terms', element: <TermsPage /> },
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
