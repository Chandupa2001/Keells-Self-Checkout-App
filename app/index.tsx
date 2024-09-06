import { Text, View } from "react-native";
import Login from "./auth/sign-in/Login";
import { StripeProvider } from '@stripe/stripe-react-native';

const STRIPE_KEY = 'pk_test_51PbJbvDgue2GhCe2D73vmCcjYgLtZXPCz1nhbFIWuqkrDgmDFKwFS0inSxIOBAWrQbNlvA7539IQ6Y0yQdbHiF6S00FzuPIazE';

export default function Index() {
  return (
    <StripeProvider publishableKey={STRIPE_KEY}>
      <View>
        <Login />
      </View>
    </StripeProvider>
  );
}
