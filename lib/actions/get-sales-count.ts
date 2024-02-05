import Event from "../database/models/event.model";

export const getSalesCount = async () => {
  const salesCount = await Event.countDocuments();

  return JSON.parse(JSON.stringify(salesCount));
};
