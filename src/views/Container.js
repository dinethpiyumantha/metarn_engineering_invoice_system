import React from 'react';
import './styles.css';
import PDFBuilder from './PDFBuilder/PDFBuilder';

class Container extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            advancePayment: 0,
            totalBalance: 0,
            subTotal: 0,
            category: 'Roof',
            billDetails: {
                name: '',
                address: '',
                phone: '',
                date: '',
                no: '',
                color: '',
                type: '',
            },
            roofInvoice: [
                {name: 'Roofing Sheets', add: true, qty: 0, rate: 0, amount: 0},
                {name: 'Bol Nos Cov Roofing', add: true, qty: 0, rate: 0, amount: 0},
                {name: 'Full Cov Roofing', add: true, qty: 0, rate: 0, amount: 0},
                {name: 'Tile Roofing', add: true, qty: 0, rate: 0, amount: 0},
                {name: 'Cladding Sheets', add: true, qty: 0, rate: 0, amount: 0},
                {name: 'R Cap', add: true, qty: 0, rate: 0, amount: 0},
                {name: 'Gutter', add: true, qty: 0, rate: 0, amount: 0},
                {name: 'Cap Flashing', add: true, qty: 0, rate: 0, amount: 0},
                {name: 'D/Pipe', add: true, qty: 0, rate: 0, amount: 0},
            ],
            gutterInvoice: [
                {name: 'Gutter', add: true, qty: 0, rate: 0, amount: 0},
                {name: 'Barge Flashing', add: true, qty: 0, rate: 0, amount: 0},
                {name: 'Down Pipe', add: true, qty: 0, rate: 0, amount: 0},
                {name: 'Down Pipe (12)', add: false, qty: 0, rate: 0, amount: 0},
                {name: 'Wall Flashing (12)', add: false, qty: 0, rate: 0, amount: 0},
                {name: 'Wall Flashing (18)', add: false, qty: 0, rate: 0, amount: 0},
                {name: 'Valance Board (12)', add: false, qty: 0, rate: 0, amount: 0},
                {name: 'Valance Board (09)', add: false, qty: 0, rate: 0, amount: 0},
                {name: 'L-Flashing', add: true, qty: 0, rate: 0, amount: 0},
                {name: 'Cup Flashing', add: true, qty: 0, rate: 0, amount: 0},
                {name: 'Valley Gutters', add: true, qty: 0, rate: 0, amount: 0},
                {name: 'U-Gutters', add: true, qty: 0, rate: 0, amount: 0},
                {name: 'Nozzies', add: false, qty: 0, rate: 0, amount: 0},
                {name: 'End Caps', add: false, qty: 0, rate: 0, amount: 0},
                {name: 'Gutter Brackets', add: false, qty: 0, rate: 0, amount: 0},
                {name: 'Transport', add: false, qty: 0, rate: 0, amount: 0},
                {name: 'R Cap', add: true, qty: 0, rate: 0, amount: 0},
            ]
        }
    }

    componentDidMount() {
        const { category, advancePayment, roofInvoice, gutterInvoice} = this.state;
        const isRoof = (category === 'Gutter') ? false : true ;
        var tempTotal = 0;
        if (isRoof) {
            roofInvoice.map((item, i) => {
                tempTotal = tempTotal + item.amount;
            })
        } else {
            gutterInvoice.map((item, i) => {
                tempTotal= tempTotal + item.amount;
            })
        }
        tempTotal = tempTotal - advancePayment;
        console.log(tempTotal)
    }

    componentDidUpdate() {
        const { category, advancePayment, roofInvoice, gutterInvoice} = this.state;
        const isRoof = (category === 'Gutter') ? false : true ;
        var tempTotal = 0;
        if (isRoof) {
            roofInvoice.map((item, i) => {
                tempTotal = tempTotal + item.amount;
            })
        } else {
            gutterInvoice.map((item, i) => {
                tempTotal= tempTotal + item.amount;
            })
        }
        tempTotal = tempTotal - advancePayment;
        console.log(tempTotal)
    }

    handleChangeBill = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    handleChange = (e, i, item) => {
        const { category } = this.state;
        const isRoof = (category === 'Gutter') ? false : true ;
        if (i === -1) {
            console.log("Invalid Index");
        }
        else {
            console.log(item)
            if (isRoof) {
                console.log(i)
                this.setState({
                    roofInvoice: [
                        ...this.state.roofInvoice.slice(0,i),
                        Object.assign({}, this.state.roofInvoice[i], {[e.target.name] : e.target.value}),
                        ...this.state.roofInvoice.slice(i+1)
                    ]
                });

                this.setState({
                    roofInvoice: [
                        ...this.state.roofInvoice.slice(0,i),
                        Object.assign({}, this.state.roofInvoice[i], {[e.target.name] : e.target.value, 'amount' : (this.state.roofInvoice[i].qty * this.state.roofInvoice[i].rate)}),
                        ...this.state.roofInvoice.slice(i+1)
                    ]
                });
            } else {
                console.log(i)
                this.setState({
                    gutterInvoice: [
                        ...this.state.gutterInvoice.slice(0,i),
                        Object.assign({}, this.state.gutterInvoice[i], {[e.target.name] : e.target.value}),
                        ...this.state.gutterInvoice.slice(i+1)
                    ]
                });

                this.setState({
                    gutterInvoice: [
                        ...this.state.gutterInvoice.slice(0,i),
                        Object.assign({}, this.state.gutterInvoice[i], {[e.target.name] : e.target.value, 'amount' : (this.state.gutterInvoice[i].qty * this.state.gutterInvoice[i].rate)}),
                        ...this.state.gutterInvoice.slice(i+1)
                    ]
                });
            }
        }
        console.log((isRoof) ? this.state.roofInvoice : this.state.gutterInvoice)
    }

    render() {
        const { category, roofInvoice, gutterInvoice, billDetails, totalBalance, advancePayment, subTotal } = this.state;
        const isRoof = (category === 'Gutter') ? false : true ;
        const invoiceArray = (isRoof) ? roofInvoice : gutterInvoice ;
        return (
            <div className="row m-0 p-0">
                {/* Content Display         ---------------------------------------------------------------------------- */}
                <div className="col-md-8 m-0 py-3 px-3 bg-white overflow-auto">

                    {/* Client's/Invoice Details */}
                    <div className="bg-light rounded p-3 m-3 border row">
                        <h5>DOCUMENT DETAILS</h5>
                        <div className="col-md-6">
                            {/* Name */}
                            <label className="form-label mt-3">Name (Mr/Ms)</label>
                            <input type="text" className="form-control" placeholder="Client Name" name="name" value={this.state.billDetails.name} onChange={this.handleChangeBill} />
                            {/* Address */}
                            <label className="form-label mt-3">Address</label>
                            <input type="text" className="form-control" placeholder="Client Address" name="address" value={this.state.billDetails.address} onChange={this.handleChangeBill} />
                            {/* Phone */}
                            <label className="form-label mt-3">Phone</label>
                            <input type="text" className="form-control" placeholder="Client Phone" name="phone" value={this.state.billDetails.phone} onChange={this.handleChangeBill} />
                        </div>
                        <div className="col-md-6">
                            {/* Bill No */}
                            <label className="form-label mt-3">Serial Number</label>
                            <input type="text" className="form-control" placeholder="For Invoice or Quotation" name="no" value={this.state.billDetails.no} onChange={this.handleChangeBill} />
                            {/* Color */}
                            <label className="form-label mt-3">Color</label>
                            <input type="text" className="form-control" placeholder="Product Color" name="color" value={this.state.billDetails.color} onChange={this.handleChangeBill} />
                            {/* Date */}
                            <label className="form-label mt-3">Date</label>
                            <input type="date" className="form-control" name="date" value={this.state.billDetails.date} onChange={this.handleChangeBill} />
                        </div>
                    </div>

                    {/* Category Selection */}
                    <div className="my-5">
                        <h5 className="text-center">BILL CATEGORY</h5>
                        <div className="d-flex justify-content-center">
                            <button className="btn btn-gradiant-yellow text-light m-2" onClick={() => {this.setState({ category: 'Gutter' })}} >Gutter</button>
                            <button className="btn btn-gradiant-yellow text-light m-2" onClick={() => {this.setState({ category: 'Roof' })}} >Roof</button>
                        </div>
                    </div>

                    {/* Product Item Inputs */}
                    <div className="bg-light border rounded p-3 m-3 row">
                        <h5 style={{textTransform: 'uppercase'}}>{this.state.category} ITEM DETAILS</h5>
                        <div className="p-3 w-100">
                            <table width="100%"  class="table table-striped">
                                <thead>
                                    <tr>
                                        <th>No</th>
                                        <th>Name</th>
                                        <th>QTY</th>
                                        <th>Rate (Rs.)</th>
                                        <th>Amount</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        invoiceArray.map((item, i) => {
                                            return(
                                                <tr key={i}>
                                                    <td>{i+1}</td>
                                                    <td className={item.add ? 'd-flex' : ''}>{item.name} { item.add && <input type="text" className="form-control ms-3 w-25" name="name" onChange={(e) => {this.handleChange(e, i, item)}} />}</td>
                                                    <td style={{width: '15%'}} ><input type="text" className="form-control" placeholder="Quantity" name="qty" onChange={(e) => {this.handleChange(e, i, item)}} /></td>
                                                    <td style={{width: '20%'}} ><input type="text" className="form-control" placeholder="Unit Price" name="rate"  onChange={(e) => {this.handleChange(e, i, item)}} /></td>
                                                    <td style={{width: '20%'}} ><input type="text" className="form-control" placeholder="Amount" name="amount" value={(isRoof) ? roofInvoice[i].amount : gutterInvoice[i].amount} disabled /></td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </table>

                            <div>
                            {
                                invoiceArray.map((item, i) => {
                                    return(
                                        <div key={i}>
                                            {item.name} , {item.qty}, {item.rate}, {item.amount}
                                        </div>
                                    )
                                })
                            }
                            </div>
                        </div>
                    </div>

                    {/* Preview */}
                    <div className="bg-light border rounded p-3 m-3 mt-5 row">
                        <h5 style={{textTransform: 'capitalize'}}>Invoice Preview</h5>
                        <PDFBuilder  
                            items={roofInvoice} 
                            clientDetails={billDetails} 
                            subTotal={subTotal} 
                            advance={advancePayment} 
                            totalAmount={totalBalance}
                        />
                    </div>
                </div>

                {/* Calculation Priview     ---------------------------------------------------------------------------- */}
                <div className="col-md-4 p-3 view-calculation">

                    {/* Bill Type */}
                    <h3 className="p-3 my-2 text-secondary bg-light rounded">Invoice</h3>

                    {/* Advance Input */}
                    <h5 className="mt-5">ADVANCE</h5>
                    <h2 className="d-flex pt-2">
                        <div>LKR.</div>
                        <input
                        className="form-control ms-3"
                        type="text"
                        placeholder="Enter Advance"
                        value={ this.state.advancePayment }
                        />
                    </h2>

                    {/* payment Disclaimer */}
                    <small className="my-2 lh-sm">If getting an advance payment please put value 0 as in above input field.</small>
                    
                    {/* Total Price Preview */}
                    <div className="w-100 my-3 p-3 text-light view-total-price">
                        <h5 className="lh-1">TOTAL BALANCE</h5>
                        <h1 className="lh-1">LKR. {this.state.totalBalance}</h1>
                    </div>

                    {/* Buttons */}
                    <div className="border-top mt-4 gap-3 d-grid ">
                        <button type="button" className="btn btn-dark">Export</button>
                        <button type="button" className="btn btn-dark">Print</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default Container;