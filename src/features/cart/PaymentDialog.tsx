import * as Dialog from "@radix-ui/react-dialog"

const PaymentDialog = ({ totalToPay }: { totalToPay: number }) => (
  <Dialog.Root>
    <Dialog.Trigger asChild>
      <button className="mt-4 w-full rounded-lg bg-sky-700 py-2 text-white hover:bg-sky-800">
        Pay Now
      </button>
    </Dialog.Trigger>
    <Dialog.Portal>
      <Dialog.Overlay className="fixed inset-0 bg-black/50" />
      <Dialog.Content className="fixed left-1/2 top-1/2 w-full max-w-md -translate-x-1/2 -translate-y-1/2 bg-white p-6 shadow-lg">
        <Dialog.Title className="text-lg font-medium">
          Payment Details
        </Dialog.Title>
        <form className="mt-4 space-y-4">
          <div>
            <label className="block text-sm text-gray-700">Card Number</label>
            <input
              type="text"
              className="mt-1 w-full rounded-lg border p-2"
              placeholder="1234 5678 9012 3456"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-700">Expiry Date</label>
              <input
                type="text"
                className="mt-1 w-full rounded-lg border p-2"
                placeholder="MM/YY"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-700">CVC</label>
              <input
                type="text"
                className="mt-1 w-full rounded-lg border p-2"
                placeholder="123"
              />
            </div>
          </div>
          <button
            type="submit"
            className="w-full rounded-lg bg-sky-700 py-2 text-white hover:bg-sky-800"
          >
            Pay CHF {totalToPay.toFixed(2)}
          </button>
        </form>
        <Dialog.Close asChild>
          <button
            className="absolute right-4 top-4 text-gray-400 hover:text-gray-600"
            aria-label="Close"
          >
            ✕
          </button>
        </Dialog.Close>
      </Dialog.Content>
    </Dialog.Portal>
  </Dialog.Root>
)

export default PaymentDialog
