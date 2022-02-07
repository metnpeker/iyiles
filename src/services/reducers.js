import { combineReducers } from 'redux';
import AuthReducer from './Login/AuthReducer';
import ProviderReducer from './Providers/ProviderReducer';
import UserReducer from './UserProfile/UserReducer';
import MakeReservationReducer from './MakeReservation/MakeReservationReducer';
import CommentReducer from './CommentBox/CommentReducer';
import AmbulanceCompReducer from './AmbulanceComp/AmbulanceCompReducer';
import HomeReducer from './homeComments/HomeReducer';
import ReservationStatusReducer from './reservationStatus/ReservationStatusReducer';
import SidebarReducer from './provider/sidebar/SidebarReducer';
import StationReducer from './provider/Stations/StationReducer';
import ProfilePageReducer from './provider/ProfilePage/ProfilePageReducer';
import CommentRateReducer from './provider/commentRate/CommentRateReducer';
import RegisterReducer from './Register/registerReducer';
import ChangePasswordReducer from './ChangePassword/ChangePasswordReducer';
import showAppointmentReducer from './provider/showAppointment/showAppointmentReducer';

export default combineReducers({
   auth: AuthReducer,
   provider: ProviderReducer,
   makeReservation : MakeReservationReducer,
   member: UserReducer,
   providerData: CommentReducer,
   companyDetail: AmbulanceCompReducer,
   comments: HomeReducer,
   reservation: ReservationStatusReducer,
   stationInfo : StationReducer,
   registerCode: RegisterReducer,
   changePassword: ChangePasswordReducer,
   business: combineReducers({
      appointments: SidebarReducer,
      providerProfile : ProfilePageReducer,
      commentRateData : CommentRateReducer,
      showAppointment : showAppointmentReducer
   })
});
