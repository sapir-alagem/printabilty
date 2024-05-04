import { useCreatePaymentIntentMutation } from "../components/apiStripePayment";

const [createPaymentIntent] = useCreatePaymentIntentMutation();

const onCheckout = async () => {
    // 1. Create a payment intent
    const response = await createPaymentIntent({
        amount: Math.floor(total * 100),
      });
      console.log(response);
	if (response.error) {
		  Alert.alert('Something went wrong', response.error);
		  return;
		}

    // 2. Initialize the Payment sheet
		const { error: paymentSheetError } = await initPaymentSheet({
            merchantDisplayName: 'PrintAbility',
            paymentIntentClientSecret: response.data.paymentIntent,
          });
          if (paymentSheetError) {
            Alert.alert('Something went wrong', paymentSheetError.message);
            return;
          }
    // 3. Present the Payment Sheet from Stripe
    const { error: paymentError } = await presentPaymentSheet();
    if (paymentError) {
    Alert.alert(`Error code: ${paymentError.code}`, paymentError.message);
    return;
  }
    // 4. If payment ok -> create the order
    onCreateOrder();
  };

  function generateHTMLWithCheckoutButton() {
    return `
      <!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Checkout Page</title>
      </head>
      <body>
          <button id="checkoutButton">Checkout</button>
  
          <script src="https://unpkg.com/@popperjs/core@2"></script>
          <script src="https://unpkg.com/tippy.js@6"></script>
          <script src="https://js.stripe.com/v3/"></script>
          <script>
              // Your JavaScript logic here
              // Add your import statements and checkout function
  
              // Example import statement
              // import { useCreatePaymentIntentMutation } from "../components/apiStripePayment";
  
              // Example checkout function
              // const [createPaymentIntent] = useCreatePaymentIntentMutation();
              // const onCheckout = async () => {
              //     // Your checkout logic here
              // };
  
              // Add event listener to the checkout button
              document.getElementById("checkoutButton").addEventListener("click", onCheckout);
          </script>
      </body>
      </html>
    `;
  }
  
  // Usage:
  // To insert this HTML content into the DOM, you can use:
document.body.innerHTML = generateHTMLWithCheckoutButton();
  