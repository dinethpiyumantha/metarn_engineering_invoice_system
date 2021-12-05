import React from 'react';
import './styles.css'

class Navigation extends React.Component {
    render () {
        return (
            <div className="row nav">
                <div className="col-3 p-3 nav-left">
                    <select className="form-select border border-0" style={{background: '#ffffff44'}}>
                        <option value="invoice" selected>Invoice</option>
                        <option value="quotation">Quotation</option>
                    </select>
                </div>
                <div className="col-5 nav-middle">2</div>
                <div className="col-4 nav-right">3</div>
            </div>
        );
    }
}

export default Navigation;