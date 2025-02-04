const Accepted = require("../Model/Accepted");
const ToFinish = require("../Model/ToFinish");
const Technician = require("../Model/Technician");
const toBeFinished = async (req, res) => {
  const { id } = req.params;
  const { department, customerId } = req.body;
  const cv = await ToFinish.create({
    techId: id,
    department: department,
    customerId: customerId,
  });
  res.status(200).json(cv[0]);
};
const DeleteLatestAccept = async (req, res) => {
  const { id } = req.params;
  const df = await ToFinish.findOne({ techId: id });
  if (df) {
    const cv = await ToFinish.findByIdAndDelete(df._id);
  } else {
    return;
  }
};

//Get all(if Super Admin is Available for the future)

// Get one(if Super Admin is Available for the future)
const GetOneCustomer = async (req, res) => {
  const { id } = req.params;
  console.log("the id", id);
  const cv = await Accepted.find({ Customer_id: id }).sort({
    createdAt: -1,
  });
  res.status(200).json(cv);
};
const GetOneTech = async (req, res) => {
  const id = req.tech._id;
  const cv = await Accepted.find({ Technician_id: id }).sort({
    createdAt: -1,
  });
  res.status(200).json(cv);
};
const GetLatestAccept = async (req, res) => {
  const { id } = req.params;
  const latestCv = await ToFinish.findOne({ techId: id }).sort({
    createdAt: -1,
  });
  if (latestCv) {
    console.log("in cv lre");
    res.status(200).json(latestCv);
  } else {
    const status = "free";
    const status2 = "not";
    const minperson45 = await Technician.findByIdAndUpdate(
      { _id: id },
      { status, status2 }
    );
    res.status(200).json(minperson45);
  }
};

const DeleteCustomer = async (req, res) => {
  res.status(200).json({ message: "this is delete" });
};
// Fetch jobs by isChecked status
const jobFetch = async (req, res) => {
  try {
    const isChecked = req.params.isChecked;
    const jobs = await Accepted.find({ isChecked })
      .populate("Customer_id")
      .populate("Technician_id");
    res.status(200).json(jobs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
// Update isChecked
const jobUpdate = async (req, res) => {
  try {
    let job;
    const { id } = req.params;
    const { amount } = req.body;
    const percent = amount * 0.09;
    if (amount == 0) {
      job = await Accepted.findByIdAndUpdate(
        id,
        { isChecked: true },
        { new: true }
      );
    } else {
      job = await Accepted.findByIdAndUpdate(
        id,
        { isChecked: true, deducted: percent },
        { new: true }
      );
    }

    const techId = job.Technician_id;
    const tech = await Technician.findById(techId);
    const Deposit = tech.deposit;
    const deposit = Deposit - percent;
    const minperson45 = await Technician.findByIdAndUpdate(
      { _id: techId },
      { deposit }
    );
    res.status(200).json(job);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
module.exports = {
  GetOneCustomer,
  GetOneTech,
  DeleteCustomer,
  GetLatestAccept,
  toBeFinished,
  DeleteLatestAccept,
  jobFetch,
  jobUpdate,
};
