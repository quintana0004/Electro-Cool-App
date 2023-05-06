import { StyleSheet, View } from "react-native";
import { useQuery } from "@tanstack/react-query";
import { httpGetDeposit } from "../../api/deposits.api";
import RenderHTML from "react-native-render-html";

function DepositPaymentPDF({ depositId }) {
  const { isLoading, isError, error } = useQuery({
    queryKey: ["DepositDetailData", depositId],
    queryFn: fetchDepositData,
    enabled: true,
  });

  async function fetchDepositData() {
    const response = await httpGetDeposit(depositId);
    return response.data;
  }

  // TODO HTML CONTENT:
  // * Need to define the header with Electro Cool branding - (Section Static)
  // * Need to define flex box with 2 divs - (Section Dynamic)
  //  - One for the Address Information
  //  - One for the Deposit Information
  // * Need to define header for car information - (Section Static)
  // * Need to define table row for the car information - (Sub Section Dynamic)
  // * Need to define Description Header - (Section Static)
  // * Need to define the Description Text Area - (Section Dynamic)
  // * Need to define the Totals of the invoice footer - (Section Dynamic)

  const source = {
    html: `
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
            <!--  Address information dynamically generated -->
            
                <p>C-15 Calle Jazmin</p>
                <p>Urb. Reparto Valencia</p>
                <p>Bayamon, P.R.</p>
                <p>Tel. (787)-399-1933</p>
                <p>electrocool500@gmail.com</p>
            </div>
            <!-- Dynamically Generated Customer Information -->
            <div style="line-height: 5px;">
                <p>
                    <strong>Bill To: </strong>Jessica Nicole Quintana Rivera
                </p>
                <p>
                    <strong>Invoice Number: </strong>#0004
                </p>
                <p>
                    <strong>Invoice Date: </strong>11/13/2022
                </p>
                <p>
                    <strong>Phone Number: </strong>(787) 702-7103
                </p>
                <p>
                    <strong>Email: </strong>jessynquintana@gmail.com
                </p>
            </div>
        </div>

        <hr style="width: 95%; margin: 15px;"/>

        <!-- Dynamically Generated Header for Car Information -->
        <div style="line-height: 3px;">
            <table style="border-collapse: collapse; width: 90%; margin: 30px auto;">
                <thead>
                <tr>
                    <th style="text-align: center; padding: 10px;">Brand</th>
                    <th style="text-align: center; padding: 10px;">Model</th>
                    <th style="text-align: center; padding: 10px;">Year</th>
                    <th style="text-align: center; padding: 10px;">License Plate</th>
                </tr>
                </thead>
                <tbody>
                <tr style="background-color: #E9E9E9;border-radius: 20px; overflow: hidden; ">
                    <td style="text-align: center; padding: 10px;">
                        <div style="background-color: #ffffff; border-radius: 20px; padding: 20px; margin: 5px;">Toyota</div>
                    </td>
                    <td style="text-align: center; padding: 10px;">
                        <div style="background-color: #ffffff; border-radius: 20px; padding: 20px; margin: 5px;">Corolla</div>
                    </td>
                    <td style="text-align: center; padding: 10px;">
                        <div style="background-color: #ffffff; border-radius: 20px; padding: 20px; margin: 5px;">2021</div>
                    </td>
                    <td style="text-align: center; padding: 10px;">
                        <div style="background-color: #ffffff; border-radius: 20px; padding: 20px; margin: 5px;">GRP 982</div>
                    </td>
                </tr>
                </tbody>
            </table>
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
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
        </div>

        <hr style="width: 95%; margin: 15px;"/>

        <div style="text-align: center; line-height: 10px;">
            <p>
                <strong>Total: </strong> $504.32
            </p>
            <p>
                <strong>Amount Paid: </strong> $504.32
            </p>
            <p>
                <strong>Amount Due: </strong> $504.32
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
      `,
  };

  return <RenderHTML source={source} contentWidth={520} />;
}

export default DepositPaymentPDF;

const styles = StyleSheet.create({
  pdfContainer: {
    height: 550,
    width: 520,
    backgroundColor: "red",
  },
});
