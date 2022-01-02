import mongoose from "mongoose";

const CourseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Please add a course title"],
    unique: true,
    trim: true,
    maxlength: [50, "Title can not be more than 50 characters"],
  },
  description: {
    type: String,
    required: [true, "Please add a description"],
    maxlength: [500, "Description can not be more than 500 characters"],
  },
  weeks: {
    type: String,
    required: [true, "Please add a nomber of weeks"],
  },
  tuition: {
    type: Number,
    required: [true, "Please add a tuition cost"],
  },
  minimumSkill: {
    type: [String],
    required: [true, "Please add a minimum of skill"],
    enum: ["beginner", "intermediate", "advanced"],
  },
  scholarshipsAvailable: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  bootcamp: {
    type: mongoose.Schema.ObjectId,
    ref: "Bootcamp",
    required: true,
  },
});

export default mongoose.model("Course", CourseSchema);
