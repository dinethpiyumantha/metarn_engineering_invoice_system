import React from 'react';
import './styles.css'

class Navigation extends React.Component {
    render () {
        return (
            <div className="row nav">
                <div className="col-3 p-3 nav-left">
                    <img src="/logo-white.png" alt="logo" width="80px" />
                </div>
                <div className="col-5 nav-middle py-3 px-2">
                    <h4 className="m-0 p-0 text-light">METARN ENGINEERING</h4>
                    <small className="text-light">Invoice System</small>
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