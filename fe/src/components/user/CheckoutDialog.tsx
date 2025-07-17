import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { useCart } from "../../hooks/useCart";
import userAPI from "../../api/user";
import { useToast } from "../../hooks/useToast";

interface CheckoutDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  total: number;
}

export const CheckoutDialog = ({ open, onOpenChange, total, }: CheckoutDialogProps) => {
  const { setCart } = useCart();
  const {addToast} = useToast();

  const formatCurrency = (value: number) =>
    `Rp ${value.toLocaleString("id-ID")}`;

  const handleConfirm = () => {
    userAPI.post('/cart/checkout')
    .then(async (r) => {
      const data = await r.data;

      if(data.status === 'success') addToast({type: 'success', title: 'Success!', description: 'Transaction success.'});
    })
      .finally(() => {
        setCart([]);
        
        onOpenChange(false);
      })
      .catch(e => console.log(e));
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-sm">
        <DialogHeader>
          <DialogTitle>Confirm Checkout</DialogTitle>
        </DialogHeader>
        <div className="text-sm text-gray-600">
          Are you sure you want to proceed with the payment of{" "}
          <strong>{formatCurrency(total)}</strong>?
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleConfirm}>Confirm</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
