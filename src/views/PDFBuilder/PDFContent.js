import * as React from "react";
import InvoiceBG from "./InvoiceBG";
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
    const { text, items, clientDetails, subTotal, advance, totalAmount } = this.props;
    console.log(items)

    if(clientDetails.length!==0) {
    return (
      <div>
        <style type="text/css" media="print">
          {"\
   @page { size: 210mm 297mm; }\
"}
        </style>
        <div>
          <div style={{position: 'absolute'}}>
          <InvoiceBG style={{position: 'absolute'}}/>
          </div>
          <div className="pdf-content" style={{width: '800px', margin: '220px 0px 0px 50px'}}>
            <div className="invoice-details">
              <p className="text-dark item">Invoice Number - {clientDetails.no}</p>
              <p className="text-dark item">Invoice Date - </p>
              <p className="text-dark item">Invoice time - </p>
            </div>
            <br />
            <br />
            <br />
            <div className="row d-flex">
              <div className="col-8 client-details">
                <h5>INVOICE TO</h5>
                <h4>{clientDetails.name}</h4>
                <p>{clientDetails.address}</p>
                <p>{clientDetails.phone}</p>
              </div>
              <div className="col-4 client-details">
                <h5>PRODUCT SPECS</h5>
                <p>Color - {clientDetails.color}</p>
              </div>
            </div>
            <div className="row px-2 my-1">
              <table className="table-bordered invoice-table">
                <thead>
                  <tr>
                    <th className="invoice-table-heading invoice-table">NO</th>
                    <th className="invoice-table-heading invoice-table">Description</th>
                    <th className="invoice-table-heading invoice-table">Total QTY.</th>
                    <th className="invoice-table-heading invoice-table">Rate</th>
                    <th className="invoice-table-heading invoice-table">Amount</th>
                  </tr>
                </thead>
                <tbody>
                {
                  items.map((item, i) => {
                    return (
                    <tr>
                      <td key={i} className="invoice-table-data invoice-table">{item.no}</td>
                      <td key={i} className="invoice-table-data invoice-table">{item.itemName}</td>
                      <td key={i} className="invoice-table-data invoice-table">{item.quantityitam}</td>
                      <td key={i} className="invoice-table-data invoice-table">{item.unitPrice}</td>
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
                    <td className="invoice-table-data last-td invoice-table">Rs. 125000.00</td>
                  </tr>
                  <tr>
                    <td className="invoice-table-data invoice-table" colSpan="3"></td>
                    <td className="invoice-table-data invoice-table">Advance Pay</td>
                    <td className="invoice-table-data last-td invoice-table">Rs. 0.00</td>
                  </tr>
                  <tr>
                    <td className="invoice-table-data invoice-table" colSpan="3"></td>
                    <td className="invoice-table-data invoice-table">Balanced Total</td>
                    <td className="invoice-table-data last-td invoice-table" style={{background: '#dd1e2f', color: '#fff'}}>Rs. 125000.00</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
        return (
        <div>
        </div>
        );
    }
  }
}

export const FunctionalComponentToPrint = React.forwardRef((props, ref) => {
  return <PDFContent ref={ref} text={props.text} />;
});
