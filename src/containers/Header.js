
import { connect } from 'react-redux'

import MainHeader from '../components/MainHeader/MainHeader';
import { logOut } from '../redux/home/home-actions'

let mapStateToProps = (state) => {
    return{
      authorized:state.homePage.authorized,
    }
}
let mapDispatchToProps=(dispath)=>{
    return{
      onLogOut: () => {
        dispath(logOut())
      }
    }
}
const Header = connect(mapStateToProps,mapDispatchToProps)(MainHeader);
export default Header;