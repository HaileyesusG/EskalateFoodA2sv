const cron = require("node-cron");
const Technician = require("../Model/Technician"); // Adjust the path as needed

// Cleanup job
const startCleanupJob = () => {
  cron.schedule("* * * * *", async () => {
    try {
      console.log("Running periodic cleanup...");
      // Find and reset technicians stuck in "loading" state
      const result = await Technician.updateMany(
        { status: "free", status2: "loading" },
        { $set: { status2: "not" } }
      );
      console.log(
        `Cleanup completed. ${result.modifiedCount} technicians reset.`
      );
    } catch (error) {
      console.log("Error during cleanup:", error);
    }
  });
};

module.exports = startCleanupJob;
