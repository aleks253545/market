
import { connect } from 'react-redux'

import MainHeader from '../components/MainHeader/MainHeader';
import { logOutAC } from '../redux/home/home-actions'

let mapStateToProps = (state) => {
    return{
      authorized:state.homePage.authorized,
      cartPdouctsLength: state.cartPage.cartProducts.length
    }
}
let mapDispatchToProps=(dispath)=>{
    return{
      onLogOut: () => {
        dispath(logOutAC())
      }
    }
}
const Header = connect(mapStateToProps,mapDispatchToProps)(MainHeader);
export default Header;