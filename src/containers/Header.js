
import { connect } from 'react-redux'

import MainHeader from '../components/MainHeader/MainHeader'

let mapStateToProps = (state) => {
    return{
      authorized:state.homePage.authorized,
    }
}
let mapDispatchToProps=(dispath)=>{
    return{

    }
}
const Header=connect(mapStateToProps,mapDispatchToProps)(MainHeader);
export default Header;