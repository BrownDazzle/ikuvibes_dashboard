import Event from "../database/models/event.model";

export const getStockCount = async () => {
  const stockCount = await Event.countDocuments();


  return JSON.parse(JSON.stringify(stockCount));
};
