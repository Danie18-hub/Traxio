import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { ToastProvider } from './components/ui/Toast';
import { MainLayout } from './components/layout/MainLayout';
import { AdminLayout } from './components/admin/AdminLayout';

// Public pages
import { HomePage } from './pages/HomePage';
import { TrackingResultPage } from './pages/tracking/TrackingResultPage';
import { TrackingLandingPage } from './pages/tracking/TrackingLandingPage';
import { AdvancedTrackingPage } from './pages/tracking/AdvancedTrackingPage';
import { RatesPage } from './pages/rates/RatesPage';

// Shipping
import { ShippingOverviewPage } from './pages/shipping/ShippingOverviewPage';
import { CreateShipmentPage } from './pages/shipping/CreateShipmentPage';
import { PickupsPage } from './pages/shipping/PickupsPage';
import { PackagingPage } from './pages/shipping/PackagingPage';
import { InternationalGuidePage } from './pages/shipping/InternationalGuidePage';
import { FreightPage } from './pages/shipping/FreightPage';
import { ReturnsPage } from './pages/shipping/ReturnsPage';

// Locations
import { LocationsPage } from './pages/locations/LocationsPage';
import { DropOffPage } from './pages/locations/DropOffPage';
import { LocationDetailPage } from './pages/locations/LocationDetailPage';

// Delivery management
import { ManageDeliveryPage } from './pages/delivery/ManageDeliveryPage';
import { ServiceAlertsPage } from './pages/delivery/ServiceAlertsPage';
import { ProofOfDeliveryPage } from './pages/delivery/ProofOfDeliveryPage';

// Support
import { SupportHubPage } from './pages/support/SupportHubPage';
import { FAQsPage } from './pages/support/FAQsPage';
import { ContactPage } from './pages/support/ContactPage';
import { ClaimsPage } from './pages/support/ClaimsPage';
import { ServiceGuidePage } from './pages/support/ServiceGuidePage';
import { BillingExplainerPage } from './pages/support/BillingExplainerPage';
import { AccountToolsPage } from './pages/support/AccountToolsPage';
import { SmallBusinessPage } from './pages/support/SmallBusinessPage';

// Account
import { LoginPage } from './pages/account/LoginPage';
import { SignupPage } from './pages/account/SignupPage';
import { ForgotPasswordPage } from './pages/account/ForgotPasswordPage';
import { OpenAccountPage } from './pages/account/OpenAccountPage';
import { DashboardPage } from './pages/account/DashboardPage';
import { CustomerShipmentsPage } from './pages/account/CustomerShipmentsPage';
import { AddressBookPage } from './pages/account/AddressBookPage';
import { ProfilePage } from './pages/account/ProfilePage';
import { EmailPreferencesPage } from './pages/account/EmailPreferencesPage';
import { CustomerBillingPage } from './pages/account/CustomerBillingPage';

// Company & Legal
import { AboutPage } from './pages/company/AboutPage';
import { CareersPage } from './pages/company/CareersPage';
import { NewsroomPage } from './pages/company/NewsroomPage';
import { BlogPage } from './pages/company/BlogPage';
import { BlogPostPage } from './pages/company/BlogPostPage';
import { InvestorsPage } from './pages/company/InvestorsPage';
import { CorporateResponsibilityPage } from './pages/company/CorporateResponsibilityPage';
import { DeveloperPage } from './pages/company/DeveloperPage';
import { LogisticsPage } from './pages/company/LogisticsPage';
import { CompatiblePartnersPage } from './pages/company/CompatiblePartnersPage';
import { RewardsPage } from './pages/company/RewardsPage';
import { OneRatePage } from './pages/company/OneRatePage';
import { SitemapPage } from './pages/company/SitemapPage';

// Legal
import { TermsPage } from './pages/legal/TermsPage';
import { PrivacyPage } from './pages/legal/PrivacyPage';
import { AdChoicesPage } from './pages/legal/AdChoicesPage';
import { CookieSettingsPage } from './pages/legal/CookieSettingsPage';

// Admin
import { AdminOverviewPage } from './pages/admin/AdminOverviewPage';
import { AdminShipmentsPage } from './pages/admin/AdminShipmentsPage';
import { AdminNewShipmentPage } from './pages/admin/AdminNewShipmentPage';
import { AdminShipmentDetailPage } from './pages/admin/AdminShipmentDetailPage';
import { AdminLocationsPage } from './pages/admin/AdminLocationsPage';
import { AdminCustomersPage } from './pages/admin/AdminCustomersPage';
import { AdminSupportPage } from './pages/admin/AdminSupportPage';
import { AdminSettingsPage } from './pages/admin/AdminSettingsPage';

// 404
import { NotFoundPage } from './pages/NotFoundPage';

// Scroll to top upon route change
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  return (
    <ToastProvider>
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          {/* Main Storefront & Customer Portal Routes */}
          <Route element={<MainLayout />}>
            <Route path="/" element={<HomePage />} />

            {/* Tracking */}
            <Route path="/track/:trackingNumber" element={<TrackingResultPage />} />
            <Route path="/tracking" element={<TrackingLandingPage />} />
            <Route path="/tracking/advanced" element={<AdvancedTrackingPage />} />

            {/* Rates */}
            <Route path="/rates" element={<RatesPage />} />

            {/* Shipping */}
            <Route path="/shipping" element={<ShippingOverviewPage />} />
            <Route path="/shipping/create" element={<CreateShipmentPage />} />
            <Route path="/shipping/pickups" element={<PickupsPage />} />
            <Route path="/shipping/packaging" element={<PackagingPage />} />
            <Route path="/shipping/international" element={<InternationalGuidePage />} />
            <Route path="/shipping/freight" element={<FreightPage />} />
            <Route path="/shipping/returns" element={<ReturnsPage />} />

            {/* Locations */}
            <Route path="/locations" element={<LocationsPage />} />
            <Route path="/locations/drop-off" element={<DropOffPage />} />
            <Route path="/locations/:id" element={<LocationDetailPage />} />

            {/* Delivery tools */}
            <Route path="/manage-delivery" element={<ManageDeliveryPage />} />
            <Route path="/service-alerts" element={<ServiceAlertsPage />} />
            <Route path="/proof-of-delivery" element={<ProofOfDeliveryPage />} />

            {/* Support */}
            <Route path="/support" element={<SupportHubPage />} />
            <Route path="/support/faqs" element={<FAQsPage />} />
            <Route path="/support/contact" element={<ContactPage />} />
            <Route path="/support/claims" element={<ClaimsPage />} />
            <Route path="/support/service-guide" element={<ServiceGuidePage />} />
            <Route path="/support/billing" element={<BillingExplainerPage />} />
            <Route path="/support/account-tools" element={<AccountToolsPage />} />
            <Route path="/small-business" element={<SmallBusinessPage />} />

            {/* Account & Auth */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
            <Route path="/open-account" element={<OpenAccountPage />} />
            <Route path="/account" element={<DashboardPage />} />
            <Route path="/account/shipments" element={<CustomerShipmentsPage />} />
            <Route path="/account/address-book" element={<AddressBookPage />} />
            <Route path="/account/profile" element={<ProfilePage />} />
            <Route path="/account/email-preferences" element={<EmailPreferencesPage />} />
            <Route path="/account/billing" element={<CustomerBillingPage />} />

            {/* Company */}
            <Route path="/about" element={<AboutPage />} />
            <Route path="/careers" element={<CareersPage />} />
            <Route path="/newsroom" element={<NewsroomPage />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/blog/:slug" element={<BlogPostPage />} />
            <Route path="/investors" element={<InvestorsPage />} />
            <Route path="/corporate-responsibility" element={<CorporateResponsibilityPage />} />
            <Route path="/contact" element={<Navigate to="/support/contact" replace />} />
            <Route path="/developer" element={<DeveloperPage />} />
            <Route path="/logistics" element={<LogisticsPage />} />
            <Route path="/compatible-partners" element={<CompatiblePartnersPage />} />
            <Route path="/rewards" element={<RewardsPage />} />
            <Route path="/one-rate" element={<OneRatePage />} />
            <Route path="/sitemap" element={<SitemapPage />} />

            {/* Policy & Legal */}
            <Route path="/terms" element={<TermsPage />} />
            <Route path="/privacy" element={<PrivacyPage />} />
            <Route path="/ad-choices" element={<AdChoicesPage />} />
            <Route path="/cookie-settings" element={<CookieSettingsPage />} />

            {/* 404 Fallback in Main Layout */}
            <Route path="*" element={<NotFoundPage />} />
          </Route>

          {/* Admin Dashboard Operations Portal */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminOverviewPage />} />
            <Route path="shipments" element={<AdminShipmentsPage />} />
            <Route path="shipments/new" element={<AdminNewShipmentPage />} />
            <Route path="shipments/:id" element={<AdminShipmentDetailPage />} />
            <Route path="locations" element={<AdminLocationsPage />} />
            <Route path="customers" element={<AdminCustomersPage />} />
            <Route path="support" element={<AdminSupportPage />} />
            <Route path="settings" element={<AdminSettingsPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ToastProvider>
  );
}
