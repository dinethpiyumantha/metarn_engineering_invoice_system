import React from 'react';
import './styles.css'
import Logo from './logo-white.png'

class Navigation extends React.Component {
    render () {
        return (
            <div className="row nav">
                <div className="col-4 p-3 nav-left-old" style={{borderRadius: '0px 0px 40px 0px'}}>
                    <img src={Logo} alt="Logo" className="ms-3" style={{height: '45px'}} />
                </div>
                <div className="col-4 nav-middle py-3 px-2">
                    <div className="text-center">
                        <h4 className="text-uppercase lh-1 m-0 text-light">Metarn Engineering</h4>
                        <small className="text-capitalize lh-1 text-light">Invoice System 2022 - Version 1.5.0</small>
                    </div>
                </div>
                <div className="col-4 nav-right py-3 px-4">
                    <button type="button" value="Show in directory" className="btn-light-transparent me-3">
                        <i className="fa fa-folder me-3" aria-hidden="true" />
                        <span>Show in directory</span>
                    </button>
                </div>
            </div>
        );
    }
}

export default Navigation;