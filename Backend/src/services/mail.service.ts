import axios from "axios";

const FROM_ADDRESS = process.env.ELECTRO_COOL_EMAIL ?? "";
const SENGRID_API_KEY = process.env.SENDGRID_API_KEY ?? "";
const EMAIL_SEND_URL = process.env.SENDGRID_EMAIL_SEND_URL ?? "";
console.log("EMAIL API KEY: ", SENGRID_API_KEY);
console.log("EMAIL SEND URL: ", EMAIL_SEND_URL);

async function sendTemporaryPasswordEmail(
  toEmail: string,
  temporaryPassword: string | null
) {
  try {
    console.log("Email Sender: ", FROM_ADDRESS);
    const TEMPORARY_PASSWORD_TEMPLATE_ID = "d-b93007c3d5ec4969aa37328c721b183d";
    const _email = {
      from: {
        email: FROM_ADDRESS,
        name: "Electro Cool",
      },
      template_id: TEMPORARY_PASSWORD_TEMPLATE_ID,
      personalizations: [
        {
          to: [
            {
              email: toEmail,
            },
          ],
          dynamic_template_data: {
            temporaryPassword: temporaryPassword,
          },
        },
      ],
      reply_to: {
        email: FROM_ADDRESS,
        name: "Reply",
      },
    };

    return axios({
      method: "post",
      url: EMAIL_SEND_URL,
      headers: {
        Authorization: `Bearer ${SENGRID_API_KEY}`,
      },
      data: _email,
    });
  } catch (error) {
    throw error;
  }
}

export { sendTemporaryPasswordEmail };
