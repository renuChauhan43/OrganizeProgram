import programModel from "../models/programModels.js";
import signUpModel from "../models/signUpModel.js";

export const registerInProgramController = async (req, res) => {
  try {
    const { programId } = req.body;
    const parentId = req.user.userId ;

    req.body.programUsedBy = req.user.userId;

    console.log("parentId--->>>", parentId);
    console.log("programUsedBy--->>>", req.body.programUsedBy);

    const program = await programModel.findById({ _id: programId });
    if (!program) {
      return res.status(404).json({ message: "Program not found" });
    }
    const parent = await signUpModel.findById({ _id: parentId });
    if (!parent) {
      return res.status(404).json({ message: "Parent not found" });
    }

    req.body.programUsedBy = parentId;
    if (req.user.userId !== req.body.programUsedBy) {
      res
        .status(403)
        .json({ message: "Only Parent can register in  programs" });
    }
    await programModel.save();
    const registeredPrograms = await programModel.find({
    });
    res.status(200).json({
      message: "parent registr in program successfully",
      thisprogram: registeredPrograms,
    });
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
};

export const subscribedProgramsController = async (req, res) => {
  try {
    const parentId = req.user.userId;
    const parent = await signUpModel.findById({ _id: parentId });
    if (!parent) {
      return res.status(404).json({ message: "Parent not found" });
    }
    const isRegistered = await programModel.exists({ programUsedBy: parentId });
    if (!isRegistered) {
      return res
        .status(400)
        .json({ message: "Parent has not registered this  programs" });
    }
    const subscribedPrograms = await programModel.find({
      programUsedBy: parentId,
    });
    res.status(200).json({ subscribedPrograms: subscribedPrograms });
  } catch (err) {
    res.status(500).json({ message: `${err.message}` });
  }
};

export const unsubscribedProgramsController = async (req, res) => {
  try {
    const {programId } = req.body;
    const parentId = req.user.userId ;
    await programModel.findByIdAndUpdate(programId, {
      $pull: { subscribers: parentId },
    });
    res.status(200).json({ message: "Unsubscribed from program successfully" });
  } catch (err) {
    res.status(500).json({ message: `${err.message}` });
  }
};

export const allprogramsController = async (req, res) => {
  try {
    try {
      const allPrograms = await programModel.find();
      res.status(200).json({ allPrograms });
    } catch (err) {
      res.status(500).json({ message: `${err.message}` });
    }
  } catch (err) {
    res.status(500).json({ message: `${err.message}` });
  }
};

export const filterProgramsController = async (req, res) => {
  try {
    const parentId = req.user.userId;
    
    // Fetch all programs
    const allPrograms = await programModel.find();
    
    // Fetch subscribed programs for the current user
    const subscribedPrograms = await programModel.find({ programUsedBy: parentId });
    
    // Filter programs based on whether the user has opted for them or not
    const optedPrograms = allPrograms.map(program => {

      const opted = subscribedPrograms.some(subscribedProgram => subscribedProgram._id.equals(program._id));
      return {
        organizationName: program.programCreatedBy.firstname, 
        programName: program.programName,
        opted: opted
      };
    });
    
    res.status(200).json({ optedPrograms });
  } catch (err) {
    res.status(500).json({ message: `${err.message}` });
  }
};


