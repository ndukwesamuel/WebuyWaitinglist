import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useCreateOrderMutation } from "@/Redux/orderApi";
import { toast } from "react-toastify";

const PaymentModal = ({
  shippingDetails,
  deliveryFee,
  paymentMode,
  setPaymentMode,
  selectedCartItems,
}) => {
  const [createOrder, { isLoading }] = useCreateOrderMutation();

  const handlePayment = async (paymentType) => {
    const data = {
      shippingDetails,
      selectedCartItems,
      deliveryFee,
    };

    if (paymentType === "wallet") {
      data.paymentMethod = "wallet";
    } else if (paymentType === "bnpl") {
      data.paymentMethod = "bnpl";
    }

    const isConfirmed = confirm("Are you sure you want to proceed?");

    if (isConfirmed) {
      try {
        const result = await createOrder(data).unwrap();
        toast.success(result.message);
        if (result.redirect) {
          window.location.href = result.redirect;
          return;
        }
      } catch (error) {
        toast.error(error?.data?.message || "Something went wrong");
      } finally {
        setPaymentMode(false);
      }
    }
  };

  return (
    <Dialog open={paymentMode} onOpenChange={setPaymentMode}>
      <DialogContent className="sm:max-w-md bg-white">
        <DialogHeader>
          <DialogTitle className="text-center">
            Pick your payment mode
          </DialogTitle>
        </DialogHeader>

        <div className="grid gap-4 py-4 ">
          <div className="flex flex-col gap-2">
            <button
              className="w-full bg-gradient-to-b from-[#4A9D44] to-[#0D5F07] text-white py-3 rounded-lg font-medium transition-colors"
              onClick={() => handlePayment("wallet")}
              disabled={isLoading}
            >
              {isLoading ? "Processing..." : "Pay from wallet"}
            </button>
            <button
              className="w-full bg-gradient-to-b from-[#4A9D44] to-[#0D5F07] text-white py-3 rounded-lg font-medium transition-colors"
              onClick={() => handlePayment("bnpl")}
              disabled={isLoading}
            >
              {isLoading ? "Processing..." : "Buy now pay later"}
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PaymentModal;
