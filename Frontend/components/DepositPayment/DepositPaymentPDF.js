import { View } from "react-native";
import { useQuery } from "@tanstack/react-query";
import { httpGetDeposit } from "../../api/deposits.api";
import { format } from "date-fns";

function DepositPaymentPDF({ setPdfHtmlContent, depositId }) {
  const { isLoading } = useQuery({
    queryKey: ["DepositPDFData", depositId],
    queryFn: fetchDepositData,
    enabled: true,
  });

  async function fetchDepositData() {
    const response = await httpGetDeposit(depositId);
    const pdfHtmlContent = buildHtml(response.data);
    setPdfHtmlContent(pdfHtmlContent);
    return response.data;
  }

  function buildHtml(depositData) {
    const dateObject = new Date(depositData.lastModified);
    const formattedDate = format(dateObject, "MM/dd/yyyy");

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
                      <h1>DEPOSIT</h1>
                  </div>
              </div>
              <div style="display: flex; justify-content: space-between; align-items: center; padding: 0 24px;">
                  <!--  Address information from Electro Cool -->
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
                          <strong>Bill To: </strong>${depositData.customer.fullName}
                      </p>
                      <p>
                          <strong>Deposit Number: </strong>#${depositData.id}
                      </p>
                      <p>
                          <strong>Deposit Date: </strong>${formattedDate}
                      </p>
                      <p>
                          <strong>Phone Number: </strong>${depositData.customer.phone}
                      </p>
                      <p>
                          <strong>Email: </strong>${depositData.customer.email}
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
                              <div style="background-color: #ffffff; border-radius: 20px; padding: 20px; margin: 5px;">${depositData.car.brand}</div>
                          </div>
                          <div style="grid-column: 2; text-align: center;">
                              <div style="background-color: #ffffff; border-radius: 20px; padding: 20px; margin: 5px;">${depositData.car.model}</div>
                          </div>
                          <div style="grid-column: 3; text-align: center;">
                              <div style="background-color: #ffffff; border-radius: 20px; padding: 20px; margin: 5px;">${depositData.car.year}</div>
                          </div>
                          <div style="grid-column: 4; text-align: center;">
                              <div style="background-color: #ffffff; border-radius: 20px; padding: 20px; margin: 5px;">${depositData.car.licensePlate}</div>
                          </div>
                      </div>
                  </div>
              </div>

              <hr style="width: 95%; margin: 15px;"/>

              <div style="background-color: #F5E1AB; border-radius: 10px; text-align: center; width: 90%; margin: auto;">
                  <h2 style="padding-top: 10px; padding-bottom: 10px;">
                      <strong>
                          Description
                      </strong>
                  </h2>
              </div>
              <div style="border: 1.89px solid rgba(0, 0, 0, 0.3); border-radius: 15px; width: 90%; margin: auto;">
                  <p style="padding-left: 10px; padding-right: 10px;">
                      ${depositData.description}
                  </p>
              </div>

              <hr style="width: 95%; margin: 15px;"/>

              <div style="text-align: center; line-height: 10px;">
                  <p>
                      <strong>Total: </strong> $${depositData.amountTotal}
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

  return <View style={{ display: "none" }}></View>;
}

export default DepositPaymentPDF;
