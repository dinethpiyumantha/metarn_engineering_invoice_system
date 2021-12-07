import React from 'react';
import './styles.css';
import PDFBuilder from './PDFBuilder/PDFBuilder';

class Container extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            docType: 'quotation',
            testamount:0,
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
                {name: 'Roofing Sheets', add: true, addVal: '', qty: 0, rate: 0, amount: 0},
                {name: 'Bol Nos Cov Roofing', add: true, addVal: '', qty: 0, rate: 0, amount: 0},
                {name: 'Full Cov Roofing', add: true, addVal: '', qty: 0, rate: 0, amount: 0},
                {name: 'Tile Roofing', add: true, addVal: '', qty: 0, rate: 0, amount: 0},
                {name: 'Cladding Sheets', add: true, addVal: '', qty: 0, rate: 0, amount: 0},
                {name: 'R Cap', add: true, addVal: '', qty: 0, rate: 0, amount: 0},
                {name: 'Gutter', add: true, addVal: '', qty: 0, rate: 0, amount: 0},
                {name: 'Cap Flashing', add: true, addVal: '', qty: 0, rate: 0, amount: 0},
                {name: 'D/Pipe', add: true, addVal: '', qty: 0, rate: 0, amount: 0},
            ],
            gutterInvoice: [
                {name: 'Gutter', add: true, addVal: '', qty: 0, rate: 0, amount: 0},
                {name: 'Barge Flashing', add: true, addVal: '', qty: 0, rate: 0, amount: 0},
                {name: 'Down Pipe', add: true, addVal: '', qty: 0, rate: 0, amount: 0},
                {name: 'Down Pipe (12)', add: false, addVal: '', qty: 0, rate: 0, amount: 0},
                {name: 'Wall Flashing (12)', add: false, addVal: '', qty: 0, rate: 0, amount: 0},
                {name: 'Wall Flashing (18)', add: false, addVal: '', qty: 0, rate: 0, amount: 0},
                {name: 'Valance Board (12)', add: false, addVal: '', qty: 0, rate: 0, amount: 0},
                {name: 'Valance Board (09)', add: false, addVal: '', qty: 0, rate: 0, amount: 0},
                {name: 'L-Flashing', add: true, addVal: '', qty: 0, rate: 0, amount: 0},
                {name: 'Cup Flashing', add: true, addVal: '', qty: 0, rate: 0, amount: 0},
                {name: 'Valley Gutters', add: true, addVal: '', qty: 0, rate: 0, amount: 0},
                {name: 'U-Gutters', add: true, addVal: '', qty: 0, rate: 0, amount: 0},
                {name: 'Nozzies', add: false, addVal: '', qty: 0, rate: 0, amount: 0},
                {name: 'End Caps', add: false, addVal: '', qty: 0, rate: 0, amount: 0},
                {name: 'Gutter Brackets', add: false, addVal: '', qty: 0, rate: 0, amount: 0},
                {name: 'Transport', add: false, addVal: '', qty: 0, rate: 0, amount: 0},
                {name: 'R Cap', add: true, addVal: '', qty: 0, rate: 0, amount: 0},
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
 

    

    handleChange = (e, i) => {
        console.log(e)
        const { category } = this.state;
        const isRoof = (category === 'Gutter') ? false : true ;
        if (i === -1) {
            console.log("Invalid Index");
        }
        else {
            // console.log(item)
            if (isRoof) {
                console.log(i)
                this.setState({
                    roofInvoice: [
                        ...this.state.roofInvoice.slice(0,i),
                        Object.assign({}, this.state.roofInvoice[i], {[e.target.name] : e.target.value}),
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
            }
        }
        console.log((isRoof) ? this.state.roofInvoice : this.state.gutterInvoice)
    }

    render() {
        const { category, roofInvoice, gutterInvoice, billDetails, totalBalance, advancePayment, subTotal } = this.state;
        const isRoof = (category === 'Gutter') ? false : true ;
        const invoiceArray = (isRoof) ? roofInvoice : gutterInvoice ;
        const details = {...this.state.billDetails};

        // calculate total
        let balancedTotalAmount = 0
        if (isRoof) {
            roofInvoice.map((item, i) => {
                balancedTotalAmount+=parseFloat(item.amount)
            })
        } else {
            gutterInvoice.map((item, i) => {
                balancedTotalAmount+=parseFloat(item.amount)
            })
        }

        return (
            <div className="row m-0 p-0">
                {/* Content Display         ---------------------------------------------------------------------------- */}
                <div className="col-md-8 m-0 py-3 px-3 bg-white overflow-auto">

                    {/* Category Selection */}
                    <div className="my-5">
                        <h5 className="text-center">CHANGE BILL TYPE</h5>
                        <div className="d-flex justify-content-center">
                            <button className="btn btn-lg btn-gradiant-yellow-new text-dark m-2 text-capitalize" 
                                onClick={() => {
                                    this.setState({ docType: (this.state.docType === 'invoice') ? 'quotation' : 'invoice' })
                                }} 
                            >
                                <small style={{fontSize: '10px'}}>Change document type</small>
                                <div>{this.state.docType}</div>
                            </button>
                        </div>
                    </div>

                    {/* Client's/Invoice Details */}
                    <div className="bg-light rounded p-3 m-3 border row">
                        <h5>DOCUMENT DETAILS</h5>
                        <div className="col-md-6">
                            {/* Name */}
                            <label className="form-label mt-3">Name (Mr/Ms)</label>
                            <input type="text" className="form-control" placeholder="Client Name" name="name" onChange={(e) => this.setState({billDetails: {...this.state.billDetails, name: e.target.value}})} />
                            {/* Address */}
                            <label className="form-label mt-3">Address</label>
                            <input type="text" className="form-control" placeholder="Client Address" name="address" onChange={(e) => this.setState({billDetails: {...this.state.billDetails, address: e.target.value}})} />
                            {/* Phone */}
                            <label className="form-label mt-3">Phone</label>
                            <input type="text" className="form-control" placeholder="Client Phone" name="phone" onChange={(e) => this.setState({billDetails: {...this.state.billDetails, phone: e.target.value}})} />
                        </div>
                        <div className="col-md-6">
                            {/* Bill No */}
                            <label className="form-label mt-3">Serial Number</label>
                            <input type="text" className="form-control" placeholder="For Invoice or Quotation" name="no" onChange={(e) => this.setState({billDetails: {...this.state.billDetails, no: e.target.value}})} />
                            {/* Color */}
                            <label className="form-label mt-3">Color</label>
                            <input type="text" className="form-control" placeholder="Product Color" name="color" onChange={(e) => this.setState({billDetails: {...this.state.billDetails, color: e.target.value}})} />
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
                                                    <td className={item.add ? 'd-flex' : ''}>{item.name} { item.add && <input type="text" className="form-control ms-3 w-25" name="addVal" onChange={(e) => {this.handleChange(e, i)}} />}</td>
                                                    <td style={{width: '15%'}} ><input type="text" className="form-control" placeholder="Quantity" name="qty" onChange={(e) => {this.handleChange(e, i)}} onKeyPress={event => {
                                                        if (event.key === 'Tab') {
                                                            const nextfield = document.querySelector(
                                                                `input[name=rate]`
                                                              );
                                                              nextfield.focus();

                                                        }
                                                      }} /></td>
                                                    <td style={{width: '20%'}} ><input type="text" className="form-control" placeholder="Unit Price" name="rate"  onChange={(e) => {this.handleChange(e, i)}} onKeyPress={event => {
                                                        if (event.key === 'Tab') {
                                                            const nextfield = document.querySelector(
                                                                `input[name=amount]`
                                                              );
                                                              nextfield.focus();

                                                        }
                                                      }}/></td>
                                                    <td style={{width: '20%'}} ><input type="text" className="form-control" placeholder="Amount" name="amount" value={item.qty*item.rate} onFocus={(e) => {this.handleChange(e, i)}}/></td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </table>

                            <div>
                            {
                                // invoiceArray.map((item, i) => {
                                //     return(
                                //         <div key={i}>
                                //             {item.name} , {item.qty}, {item.rate}, {item.amount}
                                //         </div>
                                //     )
                                // })
                            }
                            </div>
                        </div>
                    </div>

                    {/* Preview */}
                    <div className="p-3 m-3 mt-5 row">
                        <h5 style={{textTransform: 'capitalize'}}>Invoice Preview</h5>
                        <PDFBuilder  
                            state={this.state}
                        />
                    </div>
                </div>

                {/* Calculation Priview     ---------------------------------------------------------------------------- */}
                <div className="col-md-4 p-3 mt-10 view-calculation">

                    {/* Bill Type */}
                    <h3 className="p-3 my-2 text-secondary bg-light rounded text-capitalize" >{this.state.docType}</h3>

                    
                    <div className="text-dark mt-4">
                        <h5 className="m-0">SUB TOTAL</h5>
                        <h2>LKR. {balancedTotalAmount}</h2>
                    </div>

                    {/* Advance Input */}
                    {(this.state.docType === 'invoice') && <span><h5 className="mt-5">ADVANCE</h5>
                    <h2 className="d-flex pt-2">
                        <div>LKR.</div>
                        <input
                            className="form-control ms-3"
                            type="text"
                            placeholder="Enter Advance"
                            onChange={(e) => this.setState({advancePayment: e.target.value})}
                            disabled={(this.state.docType === 'invoice') ? false : true}
                        />
                    </h2> 

                    {/* payment Disclaimer */}
                    <small className="my-2 lh-sm">If getting an advance payment please put value 0 as in above input field.</small>
                    </span> }

                    {/* Total Price Preview */}
                    <div className="w-100 my-3 p-3 text-light view-total-price">
                        <h5 className="lh-1">TOTAL BALANCE</h5>
                        <h1 className="lh-1">LKR. {balancedTotalAmount - parseFloat(advancePayment)}</h1>
                    </div>

                    {/* Buttons */}
                    <div className="border-top mt-4 gap-3 d-grid ">
                        <button type="button" className="btn btn-dark">Export</button>
                        <button type="button" className="btn btn-dark" style={{display: 'none'}}>Print</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default Container;