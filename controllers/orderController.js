import Order from "../models/orderModel.js";

export const placeOrderController = async (req, res) => {
  try {
    const { cart } = req.body;
    if (!cart) {
      return res.status(400).json({ message: "Cart is empty" });
    }
    let total = 0;
    const foodIds = cart.map((i) => {
      total += i.price;
      return i.id;
    });

    const newOrder = new Order({
      foods: foodIds,
      payment: total,
      buyer: req.body._id,
    });

    await newOrder.save();

    return res
      .status(200)
      .json({ message: "Order placed successfully", newOrder });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

export const orderStatusController = async (req, res) => {
  try {
    const orderId = req.params.id;
    if(!orderId){
      return res.status(404).json({ message: "Please provide order id" });
    }
    const { status } = req.body;
    const order = await Order.findByIdAndUpdate(
      orderId,
      { status },
      { new: true }
    );

    res.status(200).json({ message: "Order Status Updated:", order });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

export default { placeOrderController, orderStatusController };
