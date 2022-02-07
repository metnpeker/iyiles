import React from 'react';

const HeaderComponent = React.lazy(() => import('./components/Header/HeaderComponent'));
const FooterComponent = React.lazy(() => import('./components/Footer/FooterComponent'));
const Login = React.lazy(() => import('./scenes/login/Login'));
const SearchPage = React.lazy(() => import('./scenes/search/SearchPage'));
const Home = React.lazy(() => import('./scenes/home/Home'));
const UserProfile = React.lazy(() => import('./scenes/UserProfile/UserProfile'));
const RegisteredPatient = React.lazy(() => import ('./scenes/registeredPatient/RegisteredPatient'));
const NotRegistered = React.lazy(() => import ('./scenes/notRegisteredPatient/NotRegistered'));
const CommentBox = React.lazy(() => import ('./scenes/UserProfile/components/CommentBox'));
const AmbulanceCompDetail = React.lazy(() => import('./scenes/AmbulanceCompDetail/AmbulanceCompDetail'));
const ReservationPending = React.lazy(() => import('./scenes/ReservationStatus/components/PendingMessage'));
const ReservationConfirmed = React.lazy(() => import('./scenes/ReservationStatus/ReservationConfirmed'));
const ReservationSelectDisplay = React.lazy(() => import('./scenes/ReservationStatus/ReservationSelectDisplay'));
const ReservationStatusPage = React.lazy(()=>import('./scenes/ReservationStatus/ReservationStatusPage'));
const CheckoutPage = React.lazy(() => import('./scenes/checkout/CheckoutPage'));
const RateComment = React.lazy(() => import('./scenes/provider/rateComment/RateComment'));
const Sidebar = React.lazy(() => import('./components/provider/Sidebar/Sidebar'));
const ResetPassword = React.lazy(() => import('./scenes/login/components/ResetPassword'));
const EmailConfirmed = React.lazy(() => import('./scenes/login/components/EmailConfirmed'));


const Main = React.lazy(() => import('./scenes/provider/home/home'));
const Header = React.lazy(()=> import('./components/provider/Header/Header'));
const ProfilePage = React.lazy(() => import('./scenes/provider/profile/ProfilePage'));
const LandingPage = React.lazy (() => import('./scenes/provider/landingPage/LandingPage'));
const ProviderRequest = React.lazy (() => import('./scenes/provider/providerRequest/ProviderRequest'));
const ServicePricing = React.lazy (() => import ('./scenes/provider/servicePricing/ServicePricing'));
const AllServices = React.lazy(() => import('./scenes/provider/allServices/AllServices'));
const FaqPage = React.lazy(() => import('./scenes/provider/FAQ/FaqPage'));
const Footer = React.lazy(() => import('./components/provider/Footer/Footer'));




const routes = [
  { userRole: 'client', private:false, path: '/', exact: false, name: 'Home Page', component: HeaderComponent },
  { userRole: 'client', private:false, path: '/', exact: true, name: 'Home Page', component: Home },
  { userRole: 'client', private:false, path: '/providers',exact: true, name: 'Providers', component: SearchPage },
  { userRole: 'client', private:false, path: '/notregistered/:provider',exact: true, name: 'Make Reservation', component: NotRegistered },
  { userRole: 'client', private:true, path: '/makereservation/:provider',exact: true, name: 'Make Reservation', component: RegisteredPatient },
  { userRole: 'client', private:false, path: '/login', exact:true, name: 'Login', component: Login },
  { userRole: 'client', private:false, path: '/login/:type', exact:false, name: 'Login', component: Login },
  { userRole: 'client', private:false, path: '/resetpassword/:email/:token', exact:false, name: 'ResetPassword', component: ResetPassword },
  { userRole: 'client', private:false, path: '/emailconfirmed', exact:false, name: 'EmailConfirmed', component: EmailConfirmed },
  { userRole: 'client', private:true, path: '/userprofile', name: 'User Profile', component: UserProfile },
  { userRole: 'client', private:true, path: '/commentbox/:provider', name: 'Comment Box', component: CommentBox },
  { userRole: 'client', private:false, path: '/companydetail/:provider', name: 'Company Detail', component: AmbulanceCompDetail },
  { userRole: 'client', private:false, path: '/reservationstatus/:app_id',exact: true, name: 'Reservation Status', component: ReservationStatusPage},
  { userRole: 'client', private:false, path: '/reservation/pending',exact: true, name: 'Reservation Pending', component: ReservationPending },
  { userRole: 'client', private:false, path: '/reservation/confirmed',exact: true, name: 'Reservation Confirmed', component: ReservationConfirmed },
  { userRole: 'client', private:false, path: '/reservation/select',exact: true, name: 'Reservation Selecting', component: ReservationSelectDisplay},
  { userRole: 'client', private:true, path: '/checkout',exact: true, name: 'Reservation Checkout', component: CheckoutPage},
  { userRole: 'client', private:false, path: '/', exact: false, name: 'Home Page', component: FooterComponent },

 /* routes for provider. each path MUST begin with /business/.. */

  { userRole: 'provider', private:true, path: '/business',exact: false, name: 'Header', component: Header},
  { userRole: 'provider', private:true, path: '/business',exact: false, name: 'Sidebar', component: Sidebar},
  { userRole: 'provider', private:true, path: '/business/ratecomment',exact: true, name: 'Rate Comment', component: RateComment},
  { userRole: 'provider', private:true, path: '/business/profile',exact: true, name: 'Business Profile', component: ProfilePage},
  { userRole: 'provider', private:true, path: '/business/home',exact: true, name: 'ShowAppointment', component: Main},
  { userRole: 'provider', private:true, path: '/landingpage',exact: true, name: 'Landing Page', component: LandingPage},
  { userRole: 'provider', private:true, path: '/business/providerrequest',exact: true, name: 'Provider Request', component: ProviderRequest},
  { userRole: 'provider', private:true, path: '/business/servicepricing',exact: true, name: 'Service Pricing ', component: ServicePricing},
  { userRole: 'provider', private:true, path: '/business/services',exact: true, name: 'Services', component: AllServices},
  { userRole: 'provider', private:true, path: '/business/faq',exact: true, name: 'FAQ', component: FaqPage},
  { userRole: 'provider', private:true, path: '/business',exact: false, name: 'Footer', component: Footer},
];

export default routes;
