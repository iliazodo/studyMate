import Lecture from '../models/lecture.model.js';

export const createLecture = async (req,res) => {
    try{
    const { name , subject ,isPublic} = req.body;
    const newLecture = new Lecture({
        name,
        subject,
        isPublic,
        createdBy : req.user._id,
    });

    const savedLecture = await newLecture.save();
    res.status(201).json(savedLecture);

    }catch(error){
    res.status(200).json({error: error.message})
    }
};

export const getAllLectures = async (req, res)=>{
    try{
   const lectures = await Lecture.find()
   .populate('createdBy' , 'username email')
   .sort({createdAat: -1});

   res.status(200).json(lectures);

    }catch(error){
    res.status(500).json({error : error.message})
    }
};

export const getLectureById = async(req,res)=>{

    try{
   const lecture = await Lecture.findById(req.params.id)
   .populate('createdBy', 'username email')
      .populate('enrolledStudents', 'username email');

      if(!lecture){
         return res.status(404).json({ message: 'Lecture not found' });
      }
      res.status(200).json(lecture);
    }catch(error){
       res.status(500).json({ error: error.message });
    }

};

export const updateLecture = async (req,res)=>{
    try{
   const updated = await Lecture.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
   );

   if (!update){
    return res.status(404).json({ message: 'Lecture not found' });
   }
   res.status(200).json(updated);
    }catch(error){
      res.status(400).json({ error: error.message });
    }
};

export const deleteLecture = async (req,res)=>{
    try{
     const deleted = await Lecture.findByIdAndDelete(req.params.id);

     if(!deleted){
        return res.status(404).json({ message: 'Lecture not found' });
     }
      res.status(200).json({ message: 'Lecture deleted successfully' });

    }catch{
         res.status(500).json({ error: error.message });

    }
};