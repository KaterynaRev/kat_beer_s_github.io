import "./busketPayment.css"

export default function BusketPayment({totalPrice}) {

    return (
        <>
            <div className="divPaymentBusket">
                <div className="divTips">
                    <p id="pTips">Tips for waiters</p>
                    <div className="divBtnTips">
                        <button id="btnZero">ZERO</button>
                        <button id="btnRound">ROUND UP</button>
                        <button id="btnPercent">10%</button>
                        <button id="btnCustom">CUSTOM</button>
                    </div>
                </div>
                    <div className="divSubtotal">
                        <p id="pSubtotal">Subtotal</p>
                        <p id="pPriceSub">{totalPrice.toFixed(2)}</p>
                    </div>
                <div className="divTipsPP">
                    <p id="pTipsPP">Tips</p>
                    <p id="pTipsPPP">price</p>
                </div>
                <div className="divTotal">
                    <p id="pTotal">Total</p>
                    <p id="pTotalPrice">{totalPrice.toFixed(2)}</p>
                </div>
                <div className="divBtnConfirm">
                    <button id="btnConfirm">Confirm Payment</button>
                </div>
            </div>
        </>
    )
}
