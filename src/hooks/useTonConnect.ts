import { SenderArguments } from "@ton/core";
import { useTonConnectUI } from "@tonconnect/ui-react"

const useTonConnect = () => {
  
    const [tonConnectUI] = useTonConnectUI();

    return {
        sender: {
          send: async (args: SenderArguments) => {
            tonConnectUI.sendTransaction({
              messages: [
                {
                  address: args.to.toString(),
                  amount: args.value.toString(),
                  payload: args.body?.toBoc().toString('base64'),
                },
              ],
              validUntil: Date.now() + 5 * 60 * 1000, // 5 minutes for user to approve
            });
          },
        },
        connected: tonConnectUI.connected,
      };

}

export default useTonConnect