import programModel from "../models/programModels.js";


export const createProgramController = async (req, res, next) => {
  const { programName, time, location } = req.body;
  const image = req.file.path;
  console.log('this is a image file --->>>'  ,  image)
  req.body.programCreatedBy = req.user.userId;

  console.log("singup--->>", req.body.programCreatedBy);
  console.log("type--->>", req.user.userId);
  if (req.user.userId !== req.body.programCreatedBy) {
    res
      .status(403)
      .json({ message: "Only organization  can create programs" });
  }

  if (!programName || !image || !time || !location) {
    return res.status(400).json({ message: "All fields are required" });
  }
  const program = await programModel.create({
    programName: programName,
    image:image,
    time: time,
    location: location,
    programCreatedBy: req.user.userId,
  });

  await program.save();
  res.status(201).json({ program: program });
};

export const getAllProgramController = async (req, res) => {
  try {
    const programs = await programModel.find({
      programCreatedBy: req.user.userId,
    });

    res.status(200).json({ programs: programs });
  } catch (err) {
    console.log("this is an error", err);
  }
};

export const updateProgramController = async (req , res) => {
  try {
    const { id } = req.params;
    console.log('id-->>', id)
    const { programName, time, location } = req.body;
    const image = req.file; 
     console.log('image --->>' , image)
     console.log('body --->>' ,req.body)
    
    if (!programName  || !time || !location) {
      return res.status(400).json({
        message: "all fields are required",
      });
    }

    const program = await programModel.findById({ _id: id });
    if (!program) {
      return res.status(404).json({
        message: `no program found for this id ${id}`,
      });
    }


    let updateFields = {
      programName : programName,
      image :image,
      time : time,
      location : location
    };

    if (image) {
      updateFields.image = image.path;
    }


    const newProgram = await programModel.findByIdAndUpdate(
      id,
      updateFields,
      {
        new: true,
        runValidators: true
      }
    );

    res.status(200).json({
      message: 'Program updated successfully',
      updateProgram: newProgram,


    });
  } catch (err) {
    console.log("this is an error", err);
  }
};

export const deleteProgramController = async (req, res) => {
  try {
    const { id } = req.params;
    const program = await programModel.findOne({ _id: id });

    if (!program) {
      res.json({
        message: "program not found for this id",
      });
    }
    if (!req.user.userId === program.programCreatedBy.toString()) {
      res.json({
        message: "You are not allowed to delete this Program",
      });
      return;
    }
    await program.deleteOne();
    res.status(200).json({ message: "Program delete successfully" });
  } catch (err) {
    console.log("this is an error", err);
  }
};
