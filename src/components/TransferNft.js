import React from "react";
import { useWeb3Transfer } from "react-moralis";

export const TransferNFT = () => {
    const { fetch, error } = useWeb3Transfer({
        type: "erc721",
        receiver: "0x3014BdE9a0b9E6e0dfBE52c9f3eCa4Ca9E5bc17C",
        contractAddress: "0x757108b12b540056af2ea0810d76fea2f45fdcb5",
        tokenId: 2,
    });

    return (
        // Use your custom error component to show errors
        <div>
            {/* {error && <ErrorMessage error={error} />} */}
            <button onClick={() => fetch()} >
                Transfer
            </button>
        </div>
    );
};