import { withUser } from '../contexts/UserContext';
import HeaderView from '../components/HeaderView';

export default withUser(HeaderView);
