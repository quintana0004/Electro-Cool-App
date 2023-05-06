import { View } from "react-native";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { httpGetInvoice } from "../../api/invoices.api";

function InvoicePaymentPDF({ setPdfHtmlContent, invoiceId }) {
  const { isLoading } = useQuery({
    queryKey: ["InvoicePaymentPDF", invoiceId],
    queryFn: fetchInvoiceData,
    enabled: !!invoiceId,
  });

  async function fetchInvoiceData() {
    const response = await httpGetInvoice(invoiceId);
    const pdfHtmlContent = buildHtml(response.data);
    setPdfHtmlContent(pdfHtmlContent);
    return response.data;
  }

  function buildHtml(invoiceData) {
    const dateObject = new Date(invoiceData.lastModified);
    const formattedDate = format(dateObject, "MM/dd/yyyy");
    const invoiceItemsHTML = buildInvoiceItemsHtml(invoiceData.invoiceItems);

    return `
      <!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <title>Title</title>
      </head>
      <body>
      <div style="max-width: 900px; margin: auto;">
          <div style="margin: 24px; border: 1px solid rgba(0, 0, 0, 0.25); padding-bottom: 10px;">
              <div style="position:relative; height: 120px; background-color: #000000; color: #ffffff; display: flex; justify-content: space-between; align-items: center;">
                  <div style="position: relative; margin-left: 3rem;">
                      <img style="position: absolute; top: -55px; left: 0;" src="http://cdn.mcauto-images-production.sendgrid.net/73d9683bbd473107/5b749620-ac65-4c89-8a48-ca2186226c6a/106x110.png"/>
                      <h1 style="position: absolute; top: -35px; left: 35px; width: 50px; white-space: nowrap;">
                          ELECTRO COOL
                      </h1>
                  </div>
                  <div style="margin-right: 3rem;">
                      <h1>INVOICE</h1>
                  </div>
              </div>
              <div style="display: flex; justify-content: space-between; align-items: center; padding: 0 24px;">
                  <!--  Address information Electro Cool -->
                  <div style="line-height: 5px;">
                      <p>C-15 Calle Jazmin</p>
                      <p>Urb. Reparto Valencia</p>
                      <p>Bayamon, P.R.</p>
                      <p>Tel. (787)-399-1933</p>
                      <p>electrocool500@gmail.com</p>
                  </div>
                  <!-- Dynamically Generated Customer Information -->
                  <div style="line-height: 5px;">
                      <p>
                          <strong>Bill To: </strong>${invoiceData.customer.fullName}
                      </p>
                      <p>
                          <strong>Invoice Number: </strong>#${invoiceData.id}
                      </p>
                      <p>
                          <strong>Invoice Date: </strong>${formattedDate}
                      </p>
                      <p>
                          <strong>Phone Number: </strong>${invoiceData.customer.phone}
                      </p>
                      <p>
                          <strong>Email: </strong>${invoiceData.customer.email}
                      </p>
                  </div>
              </div>

              <hr style="width: 95%; margin: 15px;"/>

              <!-- Dynamically Generated Header for Car Information -->
              <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 10px; width: 90%; margin: auto;">
                  <!-- Header -->
                  <h3 style="margin-bottom: 0; text-align: center; padding: 10px;"><strong>Brand</strong></h3>
                  <h3 style="margin-bottom: 0; text-align: center; padding: 10px;"><strong>Model</strong></h3>
                  <h3 style="margin-bottom: 0; text-align: center; padding: 10px;"><strong>Year</strong></h3>
                  <h3 style="margin-bottom: 0; text-align: center; padding: 10px;"><strong>License Plate</strong></h3>

                  <!-- Body -->
                  <div style="grid-column: 1 / span 4; background-color: #E9E9E9; border-radius: 20px; padding: 10px;">
                      <!-- Row -->
                      <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 10px;">
                          <div style="grid-column: 1; text-align: center;">
                              <div style="background-color: #ffffff; border-radius: 20px; padding: 20px; margin: 5px;">${invoiceData.car.brand}</div>
                          </div>
                          <div style="grid-column: 2; text-align: center;">
                              <div style="background-color: #ffffff; border-radius: 20px; padding: 20px; margin: 5px;">${invoiceData.car.model}</div>
                          </div>
                          <div style="grid-column: 3; text-align: center;">
                              <div style="background-color: #ffffff; border-radius: 20px; padding: 20px; margin: 5px;">${invoiceData.car.year}</div>
                          </div>
                          <div style="grid-column: 4; text-align: center;">
                              <div style="background-color: #ffffff; border-radius: 20px; padding: 20px; margin: 5px;">${invoiceData.car.licensePlate}</div>
                          </div>
                      </div>
                  </div>
              </div>

              <hr style="width: 95%; margin: 15px;"/>

              <div style="display: grid; grid-template-columns: 2fr 1fr 1fr 1fr; gap: 10px;">
                  <!-- Header -->
                  <h3 style="margin-bottom: 0; text-align: center; font-size: 20px; grid-column: 1;"><strong>Description</strong></h3>
                  <h3 style="margin-bottom: 0; text-align: center; font-size: 20px; grid-column: 2;"><strong>Quantity</strong></h3>
                  <h3 style="margin-bottom: 0; text-align: center; font-size: 20px; grid-column: 3;"><strong>Price</strong></h3>
                  <h3 style="margin-bottom: 0; text-align: center; font-size: 20px; grid-column: 4;"><strong>Amount</strong></h3>

                  <!-- Body -->
                  <!-- Invoice Item Row -->
                  ${invoiceItemsHTML}
              </div>

              <hr style="width: 95%; margin: 15px;"/>

              <div style="text-align: center; line-height: 10px;">
                  <p>
                      <strong>Total: </strong> $${invoiceData.amountTotal}
                  </p>
                  <p>
                      <strong>Amount Paid: </strong> $${invoiceData.amountPaid}
                  </p>
                  <p>
                      <strong>Amount Due: </strong> $${invoiceData.amountDue}
                  </p>

                  <h3>
                      <strong>
                          Thank You For Your Business!
                      </strong>
                  </h3>
              </div>
          </div>
      </div>
      </body>
      </html>
      `;
  }

  function buildInvoiceItemsHtml(invoiceItems) {
    let invoiceItemsHTML = [];
    for (let item of invoiceItems) {
      invoiceItemsHTML.push(`
        <div style="grid-column: 1 / span 4; background-color: rgba(235, 194, 86, 0.5); border-radius: 15px; padding: 5px; width: 95%; margin: auto;">
            <div style="display: grid; grid-template-columns: 2fr 1fr 1fr 1fr; gap: 10px;">
                <div style="grid-column: 1; display: flex; justify-content: space-between; align-items: center; background-color: #ffffff; border-radius: 15px; border: 1.89px solid rgba(0, 0, 0, 0.15); padding: 3px 3px 3px 10px;">
                    <p style="margin: 0; width: 80px; text-align: center;">${item.description}</p>
                    <div style="background-color: #ffffff; border-radius: 15px; border: 1.89px solid #000000; padding: 10px 15px;">
                        <p style="margin: 0;">${item.warranty}</p>
                    </div>
                </div>
                <div style="grid-column: 2; display: flex; justify-content: center; align-items: center; background-color: #ffffff; border-radius: 15px; border: 1.89px solid rgba(0, 0, 0, 0.15); padding: 10px;">
                    <p style="margin: 0;">${item.quantity}</p>
                </div>
                <div style="grid-column: 3; display: flex; justify-content: center; align-items: center; background-color: #ffffff; border-radius: 15px; border: 1.89px solid rgba(0, 0, 0, 0.15); padding: 10px;">
                    <p style="margin: 0;">$${item.unitPrice}</p>
                </div>
                <div style="grid-column: 4; display: flex; justify-content: center; align-items: center; background-color: #ffffff; border-radius: 15px; border: 1.89px solid rgba(0, 0, 0, 0.15); padding: 10px;">
                    <p style="margin: 0;">$${item.totalPrice}</p>
                </div>
            </div>
        </div>
      `);
    }

    return invoiceItemsHTML.join(" ");
  }

  return <View style={{ display: "none" }}></View>;
}

export default InvoicePaymentPDF;
