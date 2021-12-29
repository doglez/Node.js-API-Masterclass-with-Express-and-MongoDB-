import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    msg: "Show all bootcamps",
  });
});

router.get("/:id", (req, res) => {
  res.status(200).json({
    success: true,
    msg: `Show one bootcamp ${req.params.id}`,
  });
});

router.post("/", (req, res) => {
  res.status(200).json({
    success: true,
    msg: "Create one bootcamp",
  });
});

router.put("/:id", (req, res) => {
  res.status(200).json({
    success: true,
    msg: `Update one bootcamp ${req.params.id}`,
  });
});

router.delete("/:id", (req, res) => {
  res.status(200).json({
    success: true,
    msg: `Delete one bootcamp ${req.params.id}`,
  });
});

export default router;
