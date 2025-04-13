import Restaurant from '../model/Restaurant.js';
import OrderCounter from '../model/OrderCounter.js';

import cron from "node-cron";
import fs from "fs";
import path from "path";

// Load config
const configPath = path.resolve("config/resetConfig.json");
const config = JSON.parse(fs.readFileSync(configPath));

const isStartOfMonth = () => {
  const now = new Date();
  return now.getDate() === 1;
};

const resetOrderCounters = async () => {
  const currentTime = new Date();
  const currentHour = currentTime.getHours();
  const currentMinute = currentTime.getMinutes();

  // IST timezone offset
  const istTime = new Date(currentTime.getTime() + (5.5 * 60 * 60 * 1000));

  // Only execute if IST time is exactly 5:00 AM
  if (istTime.getHours() !== 5 || istTime.getMinutes() !== 0) return;

  console.log("🕔 Running scheduled reset job at 5 AM IST");

  for (const entry of config.restaurants) {
    const { name, reset_frequency } = entry;

    if (reset_frequency === "monthly" && !isStartOfMonth()) continue;

    const restaurant = await Restaurant.findOne({ name });
    if (!restaurant) {
      console.warn(`❌ Restaurant not found: ${name}`);
      continue;
    }

    const result = await OrderCounter.findOneAndUpdate(
      { restaurant_ref_id: restaurant._id },
      { $set: { last_order_number: 0 } }
    );

    if (result) {
      console.log(`✅ Reset last_order_number for: ${name}`);
    } else {
      console.warn(`⚠️ OrderCounter not found for: ${name}`);
    }
  }
};

cron.schedule("25 23 * * *", resetOrderCounters); // 4:55 AM IST
cron.schedule("30 23 * * *", resetOrderCounters); // 5:00 AM IST
