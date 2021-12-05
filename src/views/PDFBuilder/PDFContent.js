import * as React from "react";
import InvoiceBG from "./InvoiceBG";
import Background from "./Background";
import "./styles.css";


export class PDFContent extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = { checked: false };
  }

  componentDidMount() {}

  handleCheckboxOnChange = () =>
    this.setState({ checked: !this.state.checked });

  render() {
    const { advancePayment, totalBalance, subTotal, category, billDetails, roofInvoice, gutterInvoice, docType } = this.props.state;
    let total = 0;

    const invoice = { primary: "#ED1A3B", secondary: "#DD1F2F", dark: "#2E3B42", white: "#FFF"};
    const quotation = { primary: "#00a66c", secondary: "#007f52", dark: "#2E3B42", white: "#FFF"};
    const pdfTheme = (docType === 'invoice') ? invoice : quotation;

    return (
      <div>
        <style type="text/css" media="print">
          {"\
   @page { size: 210mm 297mm; }\
"}
        </style>
        <div>
          <div style={{position: 'absolute'}}>


          <Background 
            style={{position: 'absolute'}} 
            props={pdfTheme}
            />
          </div>
          <div className="pdf-content" style={{width: '800px', margin: '220px 0px 0px 50px'}}>
            <div className="invoice-title" style={{color: pdfTheme.primary}}>{docType}</div>
            <div className="invoice-details">
              <p className="text-white item">Invoice Number - {billDetails.no}</p>
              <p className="text-white item">Invoice Date - </p>
              <p className="text-white item">Invoice time - </p>
            </div>
            <br />
            <br />
            <br />
            <div className="row d-flex">
              <div className="col-8 client-details">
                <h5 style={{color: pdfTheme.primary}}>INVOICE TO</h5>
                <h4>{billDetails.name}</h4>
                <p>{billDetails.address}</p>
                <p>{billDetails.phone}</p>
              </div>
              <div className="col-4 client-details">
                <h5 style={{color: pdfTheme.primary}}>PRODUCT SPECS</h5>
                <p>Color - {billDetails.color}</p>
              </div>
            </div>
            <div className="row px-2 my-1">
              <table className="table-bordered invoice-table">
                <thead>
                  <tr>
                    <th className="invoice-table-heading invoice-table" style={{background: pdfTheme.primary}}>NO</th>
                    <th className="invoice-table-heading invoice-table" style={{background: pdfTheme.primary}}>Description</th>
                    <th className="invoice-table-heading invoice-table" style={{background: pdfTheme.primary}}>Total QTY.</th>
                    <th className="invoice-table-heading invoice-table" style={{background: pdfTheme.primary}}>Rate</th>
                    <th className="invoice-table-heading invoice-table" style={{background: pdfTheme.primary}}>Amount</th>
                  </tr>
                </thead>
                <tbody>
                {
                  roofInvoice.map((item, i) => {
                    total+=parseFloat(item.amount);
                    return (
                    <tr>
                      <td key={i} className="invoice-table-data invoice-table">{i+1}</td>
                      <td key={i} className="invoice-table-data invoice-table">{item.name} { item.addVal && '(' + item.addVal + ')' }</td>
                      <td key={i} className="invoice-table-data invoice-table">{item.qty}</td>
                      <td key={i} className="invoice-table-data invoice-table">{item.rate}</td>
                      <td key={i} className="invoice-table-data invoice-table">{item.amount}</td>
                    </tr>
                    )
                  })
                }

                {
                  /* This is hardcoded sample */
                  // <tr>
                  //   <td className="invoice-table-data invoice-table">001</td>
                  //   <td className="invoice-table-data invoice-table">Roofing Sheets</td>
                  //   <td className="invoice-table-data invoice-table">25</td>
                  //   <td className="invoice-table-data invoice-table">Rs. 5000.00</td>
                  //   <td className="invoice-table-data invoice-table">Rs. 125000.00</td>
                  // </tr>
                }

                  <tr>
                    <td className="invoice-table-data invoice-table" colSpan="3"></td>
                    <td className="invoice-table-data invoice-table">Total</td>
                    <td className="invoice-table-data last-td invoice-table">Rs. {total}</td>
                  </tr>
                  { (docType === 'invoice') && <tr>
                    <td className="invoice-table-data invoice-table" colSpan="3"></td>
                    <td className="invoice-table-data invoice-table">Advance Pay</td>
                    <td className="invoice-table-data last-td invoice-table">Rs. {advancePayment}</td>
                  </tr> }
                  <tr>
                    <td className="invoice-table-data invoice-table" colSpan="3"></td>
                    <td className="invoice-table-data invoice-table">Balanced Total</td>
                    <td className="invoice-table-data last-td invoice-table" style={{background: pdfTheme.primary, color: '#fff'}}>Rs. {total-parseFloat(advancePayment)}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export const FunctionalComponentToPrint = React.forwardRef((props, ref) => {
  return <PDFContent ref={ref} />;
});
