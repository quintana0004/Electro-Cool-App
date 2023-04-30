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
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
</head>
<body>
    <div style="position:relative; height: 120px; width: 520px; background-color: #000000; color: #ffffff; display: flex; justify-content: space-between; align-items: center;">
       <div style="position: relative; margin-left: 3rem;">
          <img style="position: absolute; top: -55px; left: 0;" src="http://cdn.mcauto-images-production.sendgrid.net/73d9683bbd473107/5b749620-ac65-4c89-8a48-ca2186226c6a/106x110.png"/>
           <h1 style="position: absolute; top: -35px; left: 35px; width: 50px; white-space: nowrap;">ELECTRO COOL</h1>
       </div>
        <div style="margin-right: 3rem;">
           <h1>DEPOSIT</h1>
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
